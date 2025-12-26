/**
 * DESIGN VALIDATION AGENT
 * 
 * Purpose: Verify that custom text, names, and critical design elements
 * are correctly captured and will appear in generated images.
 * 
 * This prevents common AI mistakes like:
 * - Omitting requested names/engravings
 * - Changing text spelling
 * - Missing custom details
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  extractedElements: {
    customText: string[];
    numbers: string[];
    specialRequests: string[];
  };
}

export interface DesignElements {
  customText: string[];
  names: string[];
  engravings: string[];
  numbers: string[];
  specialInstructions: string[];
}

/**
 * Extract all custom text, names, and special requests from user vision
 */
export function extractCustomElements(userVision: string): DesignElements {
  const elements: DesignElements = {
    customText: [],
    names: [],
    engravings: [],
    numbers: [],
    specialInstructions: []
  };

  // Extract quoted text (most explicit custom text)
  const quotedTextPattern = /["'"'`]([^"'"'`]+)["'"'`]/g;
  let match;
  while ((match = quotedTextPattern.exec(userVision)) !== null) {
    elements.customText.push(match[1]);
  }

  // Extract name patterns
  const namePatterns = [
    /\b(?:name|named|called)\s+["'"'`]?([A-Z][a-z]+)["'"'`]?/gi,
    /\bengraved?\s+(?:with\s+)?["'"'`]?([A-Z][a-z]+)["'"'`]?/gi,
    /\bwith\s+["'"'`]?([A-Z][a-z]+)["'"'`]?\s+engraved/gi
  ];

  namePatterns.forEach(pattern => {
    const matches = userVision.matchAll(pattern);
    for (const m of matches) {
      if (m[1] && !elements.names.includes(m[1])) {
        elements.names.push(m[1]);
      }
    }
  });

  // Extract engraving instructions
  const engravingPatterns = [
    /\bengraved?\s+(?:with\s+)?["'"'`]([^"'"'`]+)["'"'`]/gi,
    /\binscription\s+["'"'`]([^"'"'`]+)["'"'`]/gi,
    /\btext\s+["'"'`]([^"'"'`]+)["'"'`]/gi
  ];

  engravingPatterns.forEach(pattern => {
    const matches = userVision.matchAll(pattern);
    for (const m of matches) {
      if (m[1] && !elements.engravings.includes(m[1])) {
        elements.engravings.push(m[1]);
      }
    }
  });

  // Extract numbers (dates, initials with numbers, etc.)
  const numberPattern = /\b(\d{1,4}(?:[/-]\d{1,2}(?:[/-]\d{1,4})?)?)\b/g;
  const numberMatches = userVision.matchAll(numberPattern);
  for (const m of numberMatches) {
    if (m[1]) {
      elements.numbers.push(m[1]);
    }
  }

  // Extract special instructions
  const specialPatterns = [
    /\b(initials)\b/gi,
    /\b(monogram)\b/gi,
    /\b(signature)\b/gi,
    /\b(message)\b/gi,
    /\b(coordinates)\b/gi,
    /\b(date)\b/gi
  ];

  specialPatterns.forEach(pattern => {
    if (pattern.test(userVision)) {
      const match = userVision.match(pattern);
      if (match && !elements.specialInstructions.includes(match[1].toLowerCase())) {
        elements.specialInstructions.push(match[1].toLowerCase());
      }
    }
  });

  return elements;
}

/**
 * Validate that extracted elements are included in the final prompt
 */
export function validatePromptInclusion(
  userVision: string,
  finalPrompt: string,
  designFingerprint: any
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const elements = extractCustomElements(userVision);

  const lowerPrompt = finalPrompt.toLowerCase();

  // Check custom text is included
  elements.customText.forEach(text => {
    if (!finalPrompt.includes(text)) {
      errors.push(`Custom text "${text}" not found in generation prompt`);
    }
  });

  // Check names are included
  elements.names.forEach(name => {
    if (!finalPrompt.includes(name)) {
      errors.push(`Name "${name}" not found in generation prompt - CRITICAL for personalization`);
    }
  });

  // Check engravings are in distinctive features
  elements.engravings.forEach(engraving => {
    const isInFeatures = designFingerprint.distinctiveFeatures.some(
      (f: string) => f.toLowerCase().includes(engraving.toLowerCase())
    );
    if (!isInFeatures) {
      warnings.push(`Engraving "${engraving}" should be in distinctive features for consistency`);
    }
  });

  // Check numbers are preserved
  elements.numbers.forEach(number => {
    if (!finalPrompt.includes(number)) {
      warnings.push(`Number "${number}" not explicitly mentioned in prompt`);
    }
  });

  // Special instructions check
  elements.specialInstructions.forEach(instruction => {
    if (!lowerPrompt.includes(instruction)) {
      warnings.push(`Special instruction "${instruction}" may not be clear in prompt`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    extractedElements: {
      customText: elements.customText,
      numbers: elements.numbers,
      specialRequests: elements.specialInstructions
    }
  };
}

/**
 * Validate DALL-E's revised prompt to see if it understood custom elements
 */
export function validateRevisedPrompt(
  userVision: string,
  revisedPrompt: string | null
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const elements = extractCustomElements(userVision);

  if (!revisedPrompt) {
    warnings.push('No revised prompt from DALL-E to validate');
    return {
      isValid: true,
      errors,
      warnings,
      extractedElements: {
        customText: elements.customText,
        numbers: elements.numbers,
        specialRequests: elements.specialInstructions
      }
    };
  }

  const lowerRevised = revisedPrompt.toLowerCase();

  // CRITICAL: Check if names/custom text appear in DALL-E's interpretation
  elements.customText.forEach(text => {
    if (!revisedPrompt.includes(text) && !lowerRevised.includes(text.toLowerCase())) {
      errors.push(`⚠️ DALL-E did NOT include custom text "${text}" - may not appear in image!`);
    }
  });

  elements.names.forEach(name => {
    if (!revisedPrompt.includes(name) && !lowerRevised.includes(name.toLowerCase())) {
      errors.push(`⚠️ CRITICAL: DALL-E did NOT include name "${name}" - will likely be missing from image!`);
    }
  });

  // Check if DALL-E changed or interpreted the text differently
  if (elements.customText.length > 0 || elements.names.length > 0) {
    const hasTextMention = lowerRevised.includes('text') || 
                          lowerRevised.includes('engraved') || 
                          lowerRevised.includes('inscription') ||
                          lowerRevised.includes('name');
    
    if (!hasTextMention) {
      warnings.push('DALL-E may not have understood that text/engraving is required');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    extractedElements: {
      customText: elements.customText,
      numbers: elements.numbers,
      specialRequests: elements.specialInstructions
    }
  };
}

/**
 * Generate a validation report for logging
 */
export function generateValidationReport(
  userVision: string,
  finalPrompt: string,
  revisedPrompts: (string | null)[],
  designFingerprint: any
): string {
  const elements = extractCustomElements(userVision);
  const promptValidation = validatePromptInclusion(userVision, finalPrompt, designFingerprint);
  
  let report = '\n' + '='.repeat(70) + '\n';
  report += '🔍 CUSTOM TEXT VALIDATION REPORT\n';
  report += '='.repeat(70) + '\n\n';

  // Extracted elements
  report += '📋 EXTRACTED CUSTOM ELEMENTS:\n';
  if (elements.customText.length > 0) {
    report += `   Custom Text: ${elements.customText.map(t => `"${t}"`).join(', ')}\n`;
  }
  if (elements.names.length > 0) {
    report += `   Names: ${elements.names.map(n => `"${n}"`).join(', ')}\n`;
  }
  if (elements.engravings.length > 0) {
    report += `   Engravings: ${elements.engravings.map(e => `"${e}"`).join(', ')}\n`;
  }
  if (elements.numbers.length > 0) {
    report += `   Numbers: ${elements.numbers.join(', ')}\n`;
  }
  if (elements.specialInstructions.length > 0) {
    report += `   Special Instructions: ${elements.specialInstructions.join(', ')}\n`;
  }
  
  if (elements.customText.length === 0 && elements.names.length === 0 && 
      elements.engravings.length === 0 && elements.numbers.length === 0) {
    report += '   ℹ️ No custom text or names detected\n';
  }
  
  report += '\n';

  // Prompt inclusion validation
  report += '✅ PROMPT INCLUSION CHECK:\n';
  if (promptValidation.isValid) {
    report += '   ✓ All custom elements included in generation prompt\n';
  } else {
    promptValidation.errors.forEach(err => {
      report += `   ❌ ${err}\n`;
    });
  }
  
  if (promptValidation.warnings.length > 0) {
    report += '\n⚠️  WARNINGS:\n';
    promptValidation.warnings.forEach(warn => {
      report += `   • ${warn}\n`;
    });
  }

  // DALL-E revised prompt validation
  report += '\n🤖 DALL-E UNDERSTANDING CHECK:\n';
  revisedPrompts.forEach((revised, idx) => {
    const revisedValidation = validateRevisedPrompt(userVision, revised);
    report += `   View ${idx + 1}:\n`;
    
    if (revisedValidation.isValid) {
      report += '   ✓ DALL-E correctly understood custom text requirements\n';
    } else {
      revisedValidation.errors.forEach(err => {
        report += `   ${err}\n`;
      });
    }
  });

  report += '\n' + '='.repeat(70) + '\n';

  return report;
}

/**
 * Helper: Suggest improvements to user prompt for better text rendering
 */
export function suggestPromptImprovements(userVision: string): string[] {
  const suggestions: string[] = [];
  const elements = extractCustomElements(userVision);

  // If has custom text but not in quotes
  if (elements.names.length > 0 && elements.customText.length === 0) {
    suggestions.push('Put custom names in quotes for clarity, e.g., "Mirja" instead of just Mirja');
  }

  // If mentions engraving but text is unclear
  if (userVision.toLowerCase().includes('engrav') && elements.customText.length === 0) {
    suggestions.push('Specify exactly what text to engrave in quotes, e.g., engraved "Forever"');
  }

  // If has multiple names without context
  if (elements.names.length > 1) {
    suggestions.push('Clarify where each name should appear, e.g., "Sarah" on left pendant, "Michael" on right');
  }

  // Font/style specification
  if (elements.customText.length > 0 && !userVision.match(/\b(script|serif|sans-serif|cursive|block)\b/i)) {
    suggestions.push('Consider specifying text style, e.g., "in elegant script font" or "in modern sans-serif"');
  }

  return suggestions;
}

