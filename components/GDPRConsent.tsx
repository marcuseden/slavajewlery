'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, Shield, FileText } from 'lucide-react';

/**
 * GDPR Consent Component
 * Collects user consent for data processing in compliance with GDPR
 * 
 * REQUIRED for:
 * - Account creation
 * - Checkout process
 * - Newsletter signup
 */

interface GDPRConsentProps {
  onConsentChange?: (consents: GDPRConsents) => void;
  required?: boolean;
  showMarketing?: boolean;
  context: 'signup' | 'checkout' | 'settings';
}

export interface GDPRConsents {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  dataRetentionAccepted: boolean;
  marketingConsent: boolean;
  consentVersion: string;
  consentTimestamp: Date;
}

const CURRENT_POLICY_VERSION = '1.0.0';

export function GDPRConsent({ 
  onConsentChange, 
  required = true,
  showMarketing = false,
  context 
}: GDPRConsentProps) {
  const [consents, setConsents] = useState<Partial<GDPRConsents>>({
    termsAccepted: false,
    privacyAccepted: false,
    dataRetentionAccepted: false,
    marketingConsent: false,
    consentVersion: CURRENT_POLICY_VERSION
  });

  const [showDetails, setShowDetails] = useState(false);

  const handleConsentChange = (field: keyof GDPRConsents, value: boolean) => {
    const newConsents = {
      ...consents,
      [field]: value,
      consentTimestamp: new Date()
    };
    
    setConsents(newConsents);
    
    if (onConsentChange && areRequiredConsentsGiven(newConsents)) {
      onConsentChange(newConsents as GDPRConsents);
    }
  };

  const areRequiredConsentsGiven = (cons: Partial<GDPRConsents>): boolean => {
    return !!(cons.termsAccepted && cons.privacyAccepted && cons.dataRetentionAccepted);
  };

  const allRequiredConsentsGiven = areRequiredConsentsGiven(consents);

  return (
    <div className="bg-blue-900/10 border border-blue-700/30 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Data Protection & Privacy
          </h3>
          <p className="text-sm text-gray-300">
            GDPR Compliant - Your data is protected and you control how it's used
          </p>
        </div>
      </div>

      {/* Data Classification Notice */}
      <div className="bg-gray-800/50 border border-gray-700 rounded p-4 mb-4">
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Data We Collect ({context})
        </h4>
        <ul className="text-xs text-gray-300 space-y-1">
          {context === 'signup' && (
            <>
              <li>• <strong>Personal Data:</strong> Email, name (for your account)</li>
              <li>• <strong>Authentication:</strong> OAuth provider (Google/Apple) or password (encrypted)</li>
              <li>• <strong>Usage Data:</strong> Login times, features used (anonymized)</li>
            </>
          )}
          {context === 'checkout' && (
            <>
              <li>• <strong>Personal Data:</strong> Name, email, phone, shipping address</li>
              <li>• <strong>Order Data:</strong> Design specifications, pricing</li>
              <li>• <strong>Payment Data:</strong> Processed by Stripe (we never see card details)</li>
            </>
          )}
          {context === 'settings' && (
            <>
              <li>• <strong>Account Changes:</strong> Updated preferences and settings</li>
              <li>• <strong>Consent Updates:</strong> Changes to your privacy preferences</li>
            </>
          )}
        </ul>
      </div>

      {/* Required Consents */}
      <div className="space-y-3 mb-4">
        {/* Terms of Service */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            required={required}
            checked={consents.termsAccepted}
            onChange={(e) => handleConsentChange('termsAccepted', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300 group-hover:text-gray-200">
            I accept the{' '}
            <Link href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </Link>
            {required && <span className="text-red-400 ml-1">*</span>}
          </span>
        </label>

        {/* Privacy Policy */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            required={required}
            checked={consents.privacyAccepted}
            onChange={(e) => handleConsentChange('privacyAccepted', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300 group-hover:text-gray-200">
            I have read and accept the{' '}
            <Link href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
              Privacy Policy
            </Link>
            {required && <span className="text-red-400 ml-1">*</span>}
          </span>
        </label>

        {/* Data Retention Notice */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            required={required}
            checked={consents.dataRetentionAccepted}
            onChange={(e) => handleConsentChange('dataRetentionAccepted', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300 group-hover:text-gray-200">
            I understand that my data will be stored according to the{' '}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              data retention policy
            </button>
            {required && <span className="text-red-400 ml-1">*</span>}
          </span>
        </label>
      </div>

      {/* Data Retention Details (Collapsible) */}
      {showDetails && (
        <div className="bg-gray-800/50 border border-gray-700 rounded p-4 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Data Retention Policy</h4>
          <div className="text-xs text-gray-300 space-y-2">
            <p><strong>Account Data:</strong> Until deletion requested or 3 years of inactivity</p>
            <p><strong>Order Data:</strong> 7 years (legal/accounting requirement)</p>
            <p><strong>Design Drafts:</strong> 1 year of inactivity, then auto-deleted</p>
            <p><strong>Consent Records:</strong> 10 years (compliance requirement)</p>
            <p className="mt-3 pt-3 border-t border-gray-700">
              You can request deletion of your data at any time from your account settings.
              Some data may be retained for legal/accounting purposes (anonymized).
            </p>
          </div>
        </div>
      )}

      {/* Optional Marketing Consent */}
      {showMarketing && (
        <div className="border-t border-gray-700 pt-4 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Optional Permissions</h4>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consents.marketingConsent}
              onChange={(e) => handleConsentChange('marketingConsent', e.target.checked)}
              className="mt-1 w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-300 group-hover:text-gray-200">
              I want to receive marketing emails about new designs, special offers, and jewelry tips
              <span className="block text-xs text-gray-400 mt-1">
                (You can unsubscribe anytime)
              </span>
            </span>
          </label>
        </div>
      )}

      {/* Your Rights Notice */}
      <div className="bg-green-900/10 border border-green-700/30 rounded p-4 mt-4">
        <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Your GDPR Rights
        </h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>✓ <strong>Access:</strong> Download all your data anytime</li>
          <li>✓ <strong>Rectify:</strong> Correct inaccurate information</li>
          <li>✓ <strong>Erase:</strong> Delete your account and data (Right to be Forgotten)</li>
          <li>✓ <strong>Port:</strong> Export your data in JSON format</li>
          <li>✓ <strong>Withdraw:</strong> Change consent preferences anytime</li>
        </ul>
        <p className="text-xs text-gray-400 mt-2">
          Access these rights from your account settings or email privacy@makeitjewelry.com
        </p>
      </div>

      {/* Validation Warning */}
      {required && !allRequiredConsentsGiven && (
        <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded">
          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <p className="text-xs text-yellow-300">
            Please accept all required consents to continue
          </p>
        </div>
      )}

      {/* Lawful Basis Notice */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          <strong>Lawful Basis:</strong> We process your data based on{' '}
          {context === 'checkout' ? (
            <>
              <strong>contract fulfillment</strong> (to deliver your order)
            </>
          ) : (
            <>
              <strong>your consent</strong> (given above) and our <strong>legitimate interest</strong> (to provide and improve services)
            </>
          )}
          . Policy version: <code className="text-gray-300">{CURRENT_POLICY_VERSION}</code>
        </p>
      </div>
    </div>
  );
}

/**
 * Hook to validate GDPR consents
 */
export function useGDPRValidation() {
  const validateConsents = (consents: Partial<GDPRConsents>): boolean => {
    return !!(
      consents.termsAccepted &&
      consents.privacyAccepted &&
      consents.dataRetentionAccepted &&
      consents.consentVersion === CURRENT_POLICY_VERSION
    );
  };

  return { validateConsents, CURRENT_POLICY_VERSION };
}

