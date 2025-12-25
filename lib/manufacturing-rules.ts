// Manufacturing constraints for jewelry production
// Ensures all generated designs are actually producible

export interface ManufacturingConstraints {
  materials: {
    allowed: string[];
    karats: number[];
    platinumPurity: number[];
  };
  gemstones: {
    types: string[];
    maxCaratForType: Record<string, number>;
    settingStyles: string[];
  };
  techniques: {
    allowed: string[];
    forbidden: string[];
  };
  sizes: {
    ringMinMax: [number, number]; // US sizes
    chainLengthMinMax: [number, number]; // inches
    braceletLengthMinMax: [number, number]; // inches
  };
  production: {
    maxComplexityScore: number;
    minProductionDays: number;
    maxProductionDays: number;
  };
}

export const MANUFACTURING_RULES: ManufacturingConstraints = {
  materials: {
    allowed: [
      'platinum',
      '14k gold',
      '18k gold',
      '22k gold',
      'white gold',
      'rose gold',
      'yellow gold',
      'sterling silver',
      '925 silver'
    ],
    karats: [10, 14, 18, 22],
    platinumPurity: [900, 950, 999]
  },
  
  gemstones: {
    types: [
      'diamond',
      'ruby',
      'sapphire',
      'emerald',
      'pearl',
      'aquamarine',
      'amethyst',
      'topaz',
      'garnet',
      'opal',
      'tanzanite',
      'morganite',
      'peridot',
      'citrine',
      'onyx',
      'turquoise'
    ],
    maxCaratForType: {
      diamond: 5.0, // Max reasonable for custom work
      ruby: 3.0,
      sapphire: 4.0,
      emerald: 3.0,
      pearl: 15.0, // mm
      aquamarine: 5.0,
      amethyst: 8.0,
      topaz: 8.0,
      garnet: 5.0,
      opal: 4.0,
      tanzanite: 3.0,
      morganite: 4.0,
      peridot: 5.0,
      citrine: 8.0,
      onyx: 10.0,
      turquoise: 10.0
    },
    settingStyles: [
      'prong setting',
      'bezel setting',
      'channel setting',
      'pave setting',
      'tension setting',
      'halo setting',
      'cathedral setting',
      'flush setting',
      'cluster setting'
    ]
  },
  
  techniques: {
    allowed: [
      'hand forging',
      'lost wax casting',
      'engraving',
      'filigree',
      'granulation',
      'repoussé',
      'chasing',
      'enameling',
      'stone setting',
      'polishing',
      'rhodium plating',
      'brushed finish',
      'hammered texture',
      'milgrain detailing',
      'hand engraving',
      'laser engraving'
    ],
    forbidden: [
      'impossible geometry',
      'floating elements',
      'anti-gravity',
      'liquid metal',
      'holographic',
      'levitating',
      'impossible interlocking',
      'microscopic detail beyond 0.1mm'
    ]
  },
  
  sizes: {
    ringMinMax: [3, 15], // US ring sizes
    chainLengthMinMax: [14, 36], // inches
    braceletLengthMinMax: [6, 9] // inches
  },
  
  production: {
    maxComplexityScore: 8, // Out of 10
    minProductionDays: 3,
    maxProductionDays: 7
  }
};

// Validate if a design prompt follows manufacturing rules
export function validateDesignForProduction(prompt: string): {
  isValid: boolean;
  issues: string[];
  warnings: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];
  const lowerPrompt = prompt.toLowerCase();

  // Check for forbidden techniques
  MANUFACTURING_RULES.techniques.forbidden.forEach(forbidden => {
    if (lowerPrompt.includes(forbidden.toLowerCase())) {
      issues.push(`Cannot manufacture: ${forbidden} - not physically possible`);
    }
  });

  // Warn about complex techniques
  const complexTechniques = ['filigree', 'granulation', 'repoussé', 'enamel'];
  complexTechniques.forEach(technique => {
    if (lowerPrompt.includes(technique)) {
      warnings.push(`${technique} adds 2-3 days to production time`);
    }
  });

  // Check for unrealistic gemstone sizes
  Object.entries(MANUFACTURING_RULES.gemstones.maxCaratForType).forEach(([stone, maxCarat]) => {
    const regex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*carat\\s*${stone}`, 'i');
    const match = lowerPrompt.match(regex);
    if (match && parseFloat(match[1]) > maxCarat) {
      issues.push(`${stone} size ${match[1]} carat exceeds maximum ${maxCarat} carat for custom work`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    warnings
  };
}

// Generate a production-safe prompt from user input
export function sanitizePromptForProduction(prompt: string): string {
  let sanitized = prompt;

  // Replace forbidden techniques with allowed alternatives
  const replacements: Record<string, string> = {
    'floating': 'suspended with thin wire',
    'levitating': 'elevated with minimal support',
    'impossible': 'intricate',
    'holographic': 'iridescent finish',
    'liquid metal': 'flowing curved design'
  };

  Object.entries(replacements).forEach(([forbidden, allowed]) => {
    const regex = new RegExp(forbidden, 'gi');
    sanitized = sanitized.replace(regex, allowed);
  });

  return sanitized;
}

// Calculate complexity score for production planning
export function calculateComplexity(prompt: string): number {
  let score = 1; // Base complexity
  const lowerPrompt = prompt.toLowerCase();

  // Complexity factors
  if (lowerPrompt.includes('intricate') || lowerPrompt.includes('detailed')) score += 2;
  if (lowerPrompt.includes('pave') || lowerPrompt.includes('micro pave')) score += 2;
  if (lowerPrompt.includes('engraving') || lowerPrompt.includes('filigree')) score += 1;
  if (lowerPrompt.includes('enamel')) score += 2;
  if (lowerPrompt.includes('multiple') || lowerPrompt.includes('many')) score += 1;

  // Gemstone complexity
  const gemstoneCount = (lowerPrompt.match(/stone|diamond|ruby|sapphire|emerald/g) || []).length;
  score += Math.min(gemstoneCount, 3);

  return Math.min(score, MANUFACTURING_RULES.production.maxComplexityScore);
}

// Estimate production time based on complexity
export function estimateProductionDays(complexityScore: number): number {
  const days = Math.ceil(
    MANUFACTURING_RULES.production.minProductionDays + 
    (complexityScore / MANUFACTURING_RULES.production.maxComplexityScore) * 
    (MANUFACTURING_RULES.production.maxProductionDays - MANUFACTURING_RULES.production.minProductionDays)
  );
  
  return Math.min(days, MANUFACTURING_RULES.production.maxProductionDays);
}




