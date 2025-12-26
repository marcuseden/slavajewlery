/**
 * CONSISTENCY VALIDATION AGENT
 * 
 * Purpose: Verify that View 1 and View 2 show the EXACT SAME jewelry piece
 * from different angles, not two different designs.
 * 
 * This catches common AI mistakes like:
 * - Different number of gemstones between views
 * - Different metal colors
 * - Missing/changed custom text
 * - Different chain counts
 * - Inconsistent design elements
 */

export interface ConsistencyCheck {
  element: string;
  view1: string | number;
  view2: string | number;
  matches: boolean;
  severity: 'critical' | 'warning' | 'minor';
}

export interface ConsistencyValidation {
  isConsistent: boolean;
  consistencyScore: number; // 0-100%
  checks: ConsistencyCheck[];
  criticalIssues: string[];
  warnings: string[];
  summary: string;
}

/**
 * Extract design elements from DALL-E's revised prompt
 */
function extractElementsFromPrompt(revisedPrompt: string | null): {
  metalColor: string[];
  metalType: string[];
  gemstones: string[];
  gemstoneCount: number[];
  customText: string[];
  chains: number[];
  numbers: number[];
  colors: string[];
  quantities: string[];
} {
  if (!revisedPrompt) {
    return {
      metalColor: [],
      metalType: [],
      gemstones: [],
      gemstoneCount: [],
      customText: [],
      chains: [],
      numbers: [],
      colors: [],
      quantities: []
    };
  }

  const lower = revisedPrompt.toLowerCase();

  // Extract metal colors
  const metalColorPatterns = ['rose gold', 'white gold', 'yellow gold', 'platinum', 'silver'];
  const metalColor = metalColorPatterns.filter(color => lower.includes(color));

  // Extract metal types
  const metalTypePatterns = ['gold', 'platinum', 'silver'];
  const metalType = metalTypePatterns.filter(type => lower.includes(type));

  // Extract gemstone types
  const gemstonePatterns = ['diamond', 'ruby', 'sapphire', 'emerald', 'pearl', 'topaz', 'amethyst', 'opal'];
  const gemstones = gemstonePatterns.filter(gem => lower.includes(gem));

  // Extract numbers (for chain counts, gemstone counts, etc.)
  const numberMatches = revisedPrompt.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b/gi);
  const numbers = numberMatches ? numberMatches.map(n => {
    const wordToNum: Record<string, number> = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
    };
    return wordToNum[n.toLowerCase()] || parseInt(n);
  }) : [];

  // Extract chain mentions
  const chainMatches = revisedPrompt.match(/\b(one|two|three|four|five|\d+)\s+(?:delicate\s+)?chains?\b/gi);
  const chains = chainMatches ? chainMatches.map(m => {
    const num = m.match(/\b(one|two|three|four|five|\d+)\b/i);
    if (!num) return 0;
    const wordToNum: Record<string, number> = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5
    };
    return wordToNum[num[1].toLowerCase()] || parseInt(num[1]);
  }) : [];

  // Extract quoted text (custom engravings)
  const quotedTextPattern = /["'"'`]([^"'"'`]+)["'"'`]/g;
  const customText: string[] = [];
  let match;
  while ((match = quotedTextPattern.exec(revisedPrompt)) !== null) {
    customText.push(match[1]);
  }

  // Extract color adjectives
  const colorPatterns = ['pink', 'pinkish', 'white', 'yellow', 'golden', 'silver', 'rose', 'red', 'blue', 'green'];
  const colors = colorPatterns.filter(color => lower.includes(color));

  // Extract quantity words
  const quantityPatterns = ['single', 'pair', 'multiple', 'several'];
  const quantities = quantityPatterns.filter(q => lower.includes(q));

  return {
    metalColor,
    metalType,
    gemstones,
    gemstoneCount: numbers,
    customText,
    chains,
    numbers,
    colors,
    quantities
  };
}

/**
 * Compare two elements and create a consistency check
 */
function compareElements(
  element: string,
  view1Value: any,
  view2Value: any,
  severity: 'critical' | 'warning' | 'minor'
): ConsistencyCheck {
  const view1Str = Array.isArray(view1Value) ? view1Value.join(', ') : String(view1Value);
  const view2Str = Array.isArray(view2Value) ? view2Value.join(', ') : String(view2Value);
  
  // For arrays, check if they have same elements (order doesn't matter for some things)
  let matches: boolean;
  if (Array.isArray(view1Value) && Array.isArray(view2Value)) {
    if (element === 'Custom Text' || element === 'Chain Count') {
      // Order and exact match matters
      matches = JSON.stringify(view1Value.sort()) === JSON.stringify(view2Value.sort());
    } else {
      // Check if sets are similar
      const set1 = new Set(view1Value.map(v => String(v).toLowerCase()));
      const set2 = new Set(view2Value.map(v => String(v).toLowerCase()));
      matches = set1.size === set2.size && [...set1].every(v => set2.has(v));
    }
  } else {
    matches = String(view1Value).toLowerCase() === String(view2Value).toLowerCase();
  }

  return {
    element,
    view1: view1Str || '(none)',
    view2: view2Str || '(none)',
    matches,
    severity
  };
}

/**
 * Main consistency validation function
 */
export function validateConsistency(
  designFingerprint: any,
  revisedPrompt1: string | null,
  revisedPrompt2: string | null,
  userVision: string
): ConsistencyValidation {
  const checks: ConsistencyCheck[] = [];
  const criticalIssues: string[] = [];
  const warnings: string[] = [];

  if (!revisedPrompt1 || !revisedPrompt2) {
    return {
      isConsistent: false,
      consistencyScore: 0,
      checks: [],
      criticalIssues: ['Missing DALL-E revised prompts - cannot validate consistency'],
      warnings: [],
      summary: 'Unable to validate - no revised prompts available'
    };
  }

  // Extract elements from both revised prompts
  const elements1 = extractElementsFromPrompt(revisedPrompt1);
  const elements2 = extractElementsFromPrompt(revisedPrompt2);

  // CRITICAL CHECKS - These MUST match

  // 1. Metal Color (CRITICAL)
  const metalColorCheck = compareElements(
    'Metal Color',
    elements1.metalColor,
    elements2.metalColor,
    'critical'
  );
  checks.push(metalColorCheck);
  if (!metalColorCheck.matches) {
    criticalIssues.push(
      `❌ CRITICAL: Metal color differs between views (View 1: ${metalColorCheck.view1}, View 2: ${metalColorCheck.view2})`
    );
  }

  // 2. Custom Text / Names (CRITICAL if present)
  if (elements1.customText.length > 0 || elements2.customText.length > 0) {
    const customTextCheck = compareElements(
      'Custom Text',
      elements1.customText,
      elements2.customText,
      'critical'
    );
    checks.push(customTextCheck);
    if (!customTextCheck.matches) {
      criticalIssues.push(
        `❌ CRITICAL: Custom text/names differ (View 1: "${customTextCheck.view1}", View 2: "${customTextCheck.view2}")`
      );
    }
  }

  // 3. Chain Count (CRITICAL for multi-chain designs)
  if (elements1.chains.length > 0 || elements2.chains.length > 0) {
    const chainCheck = compareElements(
      'Chain Count',
      elements1.chains,
      elements2.chains,
      'critical'
    );
    checks.push(chainCheck);
    if (!chainCheck.matches) {
      criticalIssues.push(
        `❌ CRITICAL: Different number of chains (View 1: ${chainCheck.view1}, View 2: ${chainCheck.view2})`
      );
    }
  }

  // 4. Gemstone Types (CRITICAL)
  const gemstoneCheck = compareElements(
    'Gemstone Types',
    elements1.gemstones,
    elements2.gemstones,
    'critical'
  );
  checks.push(gemstoneCheck);
  if (!gemstoneCheck.matches && (elements1.gemstones.length > 0 || elements2.gemstones.length > 0)) {
    criticalIssues.push(
      `❌ CRITICAL: Different gemstones (View 1: ${gemstoneCheck.view1}, View 2: ${gemstoneCheck.view2})`
    );
  }

  // WARNING CHECKS - Should match but not deal-breakers

  // 5. Metal Type (should match)
  const metalTypeCheck = compareElements(
    'Metal Type',
    elements1.metalType,
    elements2.metalType,
    'warning'
  );
  checks.push(metalTypeCheck);
  if (!metalTypeCheck.matches) {
    warnings.push(
      `⚠️ Metal type may differ (View 1: ${metalTypeCheck.view1}, View 2: ${metalTypeCheck.view2})`
    );
  }

  // 6. Color descriptions (should be similar)
  const colorCheck = compareElements(
    'Color Descriptions',
    elements1.colors,
    elements2.colors,
    'warning'
  );
  checks.push(colorCheck);
  if (!colorCheck.matches) {
    warnings.push(
      `⚠️ Color descriptions differ slightly (View 1: ${colorCheck.view1}, View 2: ${colorCheck.view2})`
    );
  }

  // Calculate consistency score
  const totalChecks = checks.length;
  const passedChecks = checks.filter(c => c.matches).length;
  const criticalChecks = checks.filter(c => c.severity === 'critical').length;
  const passedCriticalChecks = checks.filter(c => c.severity === 'critical' && c.matches).length;
  
  // Consistency score: 70% weight on critical, 30% on all checks
  const criticalScore = criticalChecks > 0 ? (passedCriticalChecks / criticalChecks) * 100 : 100;
  const overallScore = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 100;
  const consistencyScore = Math.round((criticalScore * 0.7) + (overallScore * 0.3));

  // Determine if consistent (all critical checks must pass)
  const isConsistent = criticalIssues.length === 0;

  // Generate summary
  let summary = '';
  if (isConsistent) {
    summary = `✅ CONSISTENT: Both views show the same jewelry (${consistencyScore}% match)`;
    if (warnings.length > 0) {
      summary += ` with ${warnings.length} minor variation(s)`;
    }
  } else {
    summary = `❌ INCONSISTENT: Views show different designs (${criticalIssues.length} critical issue(s))`;
  }

  return {
    isConsistent,
    consistencyScore,
    checks,
    criticalIssues,
    warnings,
    summary
  };
}

/**
 * Generate a detailed consistency report
 */
export function generateConsistencyReport(
  validation: ConsistencyValidation,
  designId: string
): string {
  let report = '\n' + '='.repeat(70) + '\n';
  report += '🔄 CONSISTENCY VALIDATION REPORT\n';
  report += '='.repeat(70) + '\n\n';

  report += `Design ID: ${designId}\n`;
  report += `Consistency Score: ${validation.consistencyScore}%\n`;
  report += `Overall Status: ${validation.isConsistent ? '✅ CONSISTENT' : '❌ INCONSISTENT'}\n\n`;

  // Critical issues
  if (validation.criticalIssues.length > 0) {
    report += '🚨 CRITICAL ISSUES:\n';
    validation.criticalIssues.forEach(issue => {
      report += `   ${issue}\n`;
    });
    report += '\n';
  }

  // Warnings
  if (validation.warnings.length > 0) {
    report += '⚠️  WARNINGS:\n';
    validation.warnings.forEach(warning => {
      report += `   ${warning}\n`;
    });
    report += '\n';
  }

  // Detailed checks
  report += '📋 DETAILED COMPARISON:\n';
  validation.checks.forEach(check => {
    const icon = check.matches ? '✓' : '✗';
    const status = check.matches ? 'MATCH' : 'DIFFER';
    report += `   ${icon} ${check.element}: ${status}\n`;
    if (!check.matches) {
      report += `      View 1: ${check.view1}\n`;
      report += `      View 2: ${check.view2}\n`;
    }
  });
  report += '\n';

  // Summary
  report += `📊 SUMMARY: ${validation.summary}\n`;
  
  if (!validation.isConsistent) {
    report += '\n⚠️  ACTION REQUIRED: Images may show different jewelry pieces.\n';
    report += '   Consider regenerating to ensure both views show the same design.\n';
  }

  report += '\n' + '='.repeat(70) + '\n';

  return report;
}

/**
 * Quick consistency check - returns boolean and brief message
 */
export function quickConsistencyCheck(
  revisedPrompt1: string | null,
  revisedPrompt2: string | null
): { consistent: boolean; message: string } {
  if (!revisedPrompt1 || !revisedPrompt2) {
    return { consistent: false, message: 'Missing revised prompts' };
  }

  const elements1 = extractElementsFromPrompt(revisedPrompt1);
  const elements2 = extractElementsFromPrompt(revisedPrompt2);

  // Check critical elements only
  const metalMatch = JSON.stringify(elements1.metalColor.sort()) === JSON.stringify(elements2.metalColor.sort());
  const textMatch = JSON.stringify(elements1.customText.sort()) === JSON.stringify(elements2.customText.sort());
  const chainMatch = elements1.chains.length === 0 || elements2.chains.length === 0 || 
                    JSON.stringify(elements1.chains) === JSON.stringify(elements2.chains);

  if (metalMatch && textMatch && chainMatch) {
    return { consistent: true, message: 'Both views appear to show the same jewelry' };
  } else {
    const issues = [];
    if (!metalMatch) issues.push('different metal');
    if (!textMatch) issues.push('different text');
    if (!chainMatch) issues.push('different chain count');
    return { consistent: false, message: `Views differ: ${issues.join(', ')}` };
  }
}

