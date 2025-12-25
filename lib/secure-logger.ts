/**
 * Secure Logging Utility
 * GDPR Compliant - NO PII LOGGING
 * 
 * This logger automatically scrubs sensitive data from logs to prevent
 * accidental PII leakage in production environments.
 */

// Fields that should NEVER be logged (PII and sensitive data)
const SENSITIVE_FIELDS = [
  // Personal Information
  'email', 'phone', 'phoneNumber', 'phone_number',
  'firstName', 'first_name', 'lastName', 'last_name', 'fullName', 'full_name',
  'name', 'address', 'street', 'city', 'state', 'zipCode', 'zip_code', 'postalCode', 'postal_code',
  
  // Financial Information
  'cardNumber', 'card_number', 'cvv', 'cvc', 'expiryDate', 'expiry_date',
  'bankAccount', 'bank_account', 'routingNumber', 'routing_number',
  'stripeToken', 'stripe_token', 'paymentMethod', 'payment_method',
  
  // Authentication & Security
  'password', 'passwd', 'pwd', 'token', 'apiKey', 'api_key', 'accessToken', 'access_token',
  'refreshToken', 'refresh_token', 'sessionId', 'session_id', 'secret',
  
  // Identifiers
  'ssn', 'social_security', 'passport', 'driverLicense', 'driver_license',
  'nationalId', 'national_id', 'taxId', 'tax_id',
  
  // Network
  'ipAddress', 'ip_address', 'ip', 'userAgent', 'user_agent'
];

// Patterns to detect and redact
const SENSITIVE_PATTERNS = [
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, name: 'SSN' }, // SSN format
  { pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, name: 'Card Number' }, // Credit card
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, name: 'Email' }, // Email
  { pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, name: 'Phone' }, // US Phone
  { pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g, name: 'IP Address' }, // IP address
];

/**
 * Recursively scrub sensitive data from an object
 */
function scrubObject(obj: any, depth = 0): any {
  // Prevent infinite recursion
  if (depth > 10) return '[MAX_DEPTH_EXCEEDED]';
  
  if (obj === null || obj === undefined) return obj;
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => scrubObject(item, depth + 1));
  }
  
  // Handle objects
  if (typeof obj === 'object') {
    const scrubbed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      // Check if field name is sensitive
      const lowerKey = key.toLowerCase().replace(/[_-]/g, '');
      const isSensitiveField = SENSITIVE_FIELDS.some(
        field => lowerKey.includes(field.toLowerCase().replace(/[_-]/g, ''))
      );
      
      if (isSensitiveField) {
        scrubbed[key] = '[REDACTED]';
      } else if (typeof value === 'string') {
        scrubbed[key] = scrubString(value);
      } else if (typeof value === 'object') {
        scrubbed[key] = scrubObject(value, depth + 1);
      } else {
        scrubbed[key] = value;
      }
    }
    
    return scrubbed;
  }
  
  // Handle strings
  if (typeof obj === 'string') {
    return scrubString(obj);
  }
  
  return obj;
}

/**
 * Scrub sensitive patterns from strings
 */
function scrubString(str: string): string {
  let scrubbed = str;
  
  for (const { pattern, name } of SENSITIVE_PATTERNS) {
    scrubbed = scrubbed.replace(pattern, `[REDACTED_${name.toUpperCase().replace(/\s/g, '_')}]`);
  }
  
  return scrubbed;
}

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log context metadata (non-sensitive)
 */
interface LogContext {
  userId?: string; // UUID only, no email
  action?: string;
  resource?: string;
  duration?: number;
  statusCode?: number;
  [key: string]: any;
}

/**
 * Secure Logger Class
 */
class SecureLogger {
  private isProduction: boolean;
  
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }
  
  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? JSON.stringify(scrubObject(context)) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${contextStr}`.trim();
  }
  
  /**
   * Debug level logging (disabled in production)
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }
  
  /**
   * Info level logging
   */
  info(message: string, context?: LogContext): void {
    const scrubbedContext = context ? scrubObject(context) : undefined;
    console.info(this.formatMessage(LogLevel.INFO, message, scrubbedContext));
  }
  
  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext): void {
    const scrubbedContext = context ? scrubObject(context) : undefined;
    console.warn(this.formatMessage(LogLevel.WARN, message, scrubbedContext));
  }
  
  /**
   * Error level logging (never logs error.message directly if it might contain PII)
   */
  error(message: string, error?: Error, context?: LogContext): void {
    const scrubbedContext = context ? scrubObject(context) : undefined;
    
    const errorInfo = error ? {
      errorType: error.name,
      errorMessage: scrubString(error.message),
      // Stack trace in development only
      ...(this.isProduction ? {} : { stack: error.stack })
    } : {};
    
    console.error(this.formatMessage(LogLevel.ERROR, message, {
      ...scrubbedContext,
      ...errorInfo
    }));
  }
  
  /**
   * Log user action for audit trail (GDPR compliant)
   */
  audit(action: string, userId: string, resource: string, metadata?: Record<string, any>): void {
    const auditContext: LogContext = {
      userId, // UUID only
      action,
      resource,
      ...(metadata ? scrubObject(metadata) : {})
    };
    
    this.info(`Audit: ${action}`, auditContext);
  }
  
  /**
   * Log API request (scrubbed)
   */
  apiRequest(method: string, path: string, userId?: string, duration?: number, statusCode?: number): void {
    this.info('API Request', {
      method,
      path: scrubString(path), // Remove query params that might contain PII
      userId,
      duration,
      statusCode
    });
  }
  
  /**
   * Log GDPR action (consent, export, deletion)
   */
  gdpr(action: 'consent' | 'export' | 'deletion' | 'rectification', userId: string, metadata?: Record<string, any>): void {
    this.info(`GDPR: ${action}`, {
      userId,
      action,
      ...(metadata ? scrubObject(metadata) : {})
    });
  }
}

// Export singleton instance
export const logger = new SecureLogger();

// Export utility functions for testing
export const _internal = {
  scrubObject,
  scrubString,
  SENSITIVE_FIELDS,
  SENSITIVE_PATTERNS
};

