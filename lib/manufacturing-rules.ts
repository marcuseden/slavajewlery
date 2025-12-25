/**
 * MANUFACTURING RULES FOR AI-GENERATED JEWELRY
 * 
 * Purpose: Ensure 100% of AI-generated designs are physically manufacturable
 * by NYC master jewelers using standard jewelry fabrication techniques.
 * 
 * Critical Success Factors:
 * 1. Structural integrity - pieces must be wearable and durable
 * 2. Material feasibility - only real metals and gemstones
 * 3. Technical feasibility - achievable with standard jeweler tools
 * 4. Quality standards - meets luxury jewelry expectations
 * 5. Safety standards - no sharp edges, secure stone settings
 */

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
  structural: {
    minMetalThickness: number; // mm
    minProngDiameter: number; // mm
    minDetailSize: number; // mm
    minStoneSettingDepth: number; // ratio
    maxAspectRatio: number; // length:width ratio
    minWallThickness: number; // mm
  };
  quality: {
    surfaceFinishStandards: string[];
    stoneQualityMinimum: string;
    metalPurityStandards: {
      platinum: number[];
      gold: number[];
      silver: number[];
    };
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
      'laser engraving',
      'satin finish',
      'mirror polish',
      'antiquing/oxidation',
      'wire wrapping',
      'bezel setting',
      'prong setting',
      'channel setting',
      'pave setting'
    ],
    forbidden: [
      'impossible geometry',
      'floating elements',
      'anti-gravity',
      'liquid metal',
      'holographic',
      'levitating',
      'impossible interlocking',
      'microscopic detail beyond 0.3mm',
      'unsupported overhangs',
      'physics-defying structures',
      'invisible settings',
      'magical properties',
      'self-assembling',
      'transparent metal',
      'flexible diamonds',
      'color-changing without treatment',
      'perpetual motion',
      'defying material properties'
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
    maxProductionDays: 14 // Increased for complex pieces
  },
  
  structural: {
    minMetalThickness: 1.5, // mm - for wearability
    minProngDiameter: 0.8, // mm - for stone security
    minDetailSize: 0.3, // mm - practical manufacturing limit
    minStoneSettingDepth: 0.6, // ratio of stone height
    maxAspectRatio: 5, // length:width ratio for structural integrity
    minWallThickness: 1.2 // mm - for hollow forms
  },
  
  quality: {
    surfaceFinishStandards: ['mirror polish', 'satin finish', 'brushed', 'matte', 'hammered'],
    stoneQualityMinimum: 'SI clarity for diamonds, eye-clean for colored stones',
    metalPurityStandards: {
      platinum: [900, 950, 999],
      gold: [10, 14, 18, 22], // karats
      silver: [925, 950, 999] // parts per thousand
    }
  }
};

/**
 * Validate if a design prompt follows manufacturing rules
 * Returns validation results with actionable issues and warnings
 */
export function validateDesignForProduction(prompt: string): {
  isValid: boolean;
  issues: string[];
  warnings: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];
  const lowerPrompt = prompt.toLowerCase();

  // Check for forbidden techniques (CRITICAL - blocks generation)
  MANUFACTURING_RULES.techniques.forbidden.forEach(forbidden => {
    if (lowerPrompt.includes(forbidden.toLowerCase())) {
      issues.push(`Cannot manufacture: "${forbidden}" - not physically possible with real materials`);
    }
  });

  // Check for structural issues
  const structuralKeywords = {
    'ultra thin': 'May not meet minimum thickness requirements (1.5mm)',
    'paper thin': 'Not structurally sound for jewelry',
    'hair thin': 'Below manufacturing capabilities',
    'microscopic': 'Details must be minimum 0.3mm',
    'invisible': 'All elements must have physical presence',
    'extremely delicate': 'May not be durable for daily wear'
  };

  Object.entries(structuralKeywords).forEach(([keyword, warning]) => {
    if (lowerPrompt.includes(keyword)) {
      warnings.push(warning);
    }
  });

  // Warn about complex techniques (adds time/cost)
  const complexTechniques = {
    'filigree': 3,
    'granulation': 3,
    'repoussé': 2,
    'enamel': 4,
    'hand engraving': 2,
    'pave setting': 3,
    'micro pave': 4
  };
  
  Object.entries(complexTechniques).forEach(([technique, days]) => {
    if (lowerPrompt.includes(technique)) {
      warnings.push(`${technique} adds ${days}+ days to production timeline (high skill required)`);
    }
  });

  // Check for unrealistic gemstone sizes
  Object.entries(MANUFACTURING_RULES.gemstones.maxCaratForType).forEach(([stone, maxCarat]) => {
    const regex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:carat|ct)\\s*${stone}`, 'i');
    const match = lowerPrompt.match(regex);
    if (match && parseFloat(match[1]) > maxCarat) {
      issues.push(`${stone} ${match[1]}ct exceeds practical maximum (${maxCarat}ct for custom work) - extremely rare and expensive`);
    }
  });

  // Check for gemstone setting feasibility
  const unsecureSettings = ['floating', 'suspended', 'unsupported', 'hovering'];
  unsecureSettings.forEach(term => {
    if (lowerPrompt.includes(term)) {
      issues.push(`"${term}" stones require physical support - suggest prong, bezel, or tension setting`);
    }
  });

  // Warn about expensive materials
  if (lowerPrompt.includes('platinum') || lowerPrompt.includes('950')) {
    warnings.push('Platinum requires specialized equipment and significantly higher material cost');
  }

  // Check for color-specific requirements
  if (lowerPrompt.match(/\b(rainbow|multicolor|shifting|iridescent)\b/i)) {
    warnings.push('Color effects require specific gemstones or treatments - clarify if using opals, labradorite, or surface treatments');
  }

  return {
    isValid: issues.length === 0,
    issues,
    warnings
  };
}

/**
 * Generate a production-safe prompt from user input
 * Replaces impossible requests with realistic alternatives
 */
export function sanitizePromptForProduction(prompt: string): string {
  let sanitized = prompt;

  // Replace forbidden techniques with allowed manufacturing alternatives
  const replacements: Record<string, string> = {
    'floating': 'delicately suspended with minimal wire support',
    'levitating': 'elevated with fine metal support',
    'hovering': 'raised on thin posts',
    'impossible': 'intricate and complex',
    'holographic': 'iridescent labradorite or opal',
    'liquid metal': 'flowing organic curved design',
    'anti-gravity': 'asymmetrical balanced',
    'invisible setting': 'minimal bezel setting',
    'paper thin': 'delicate 1.5mm thickness',
    'microscopic': 'fine detailed 0.3mm',
    'magical': 'exceptional craftsmanship',
    'perfect': 'high quality SI clarity',
    'flawless': 'VS clarity grade',
    'weightless': 'lightweight hollow construction',
    'transparent metal': 'polished reflective finish'
  };

  Object.entries(replacements).forEach(([forbidden, allowed]) => {
    const regex = new RegExp(`\\b${forbidden}\\b`, 'gi');
    sanitized = sanitized.replace(regex, allowed);
  });

  // Add manufacturing context if not present
  if (!sanitized.match(/\b(cast|forged|fabricated|hand[- ]made|crafted)\b/i)) {
    sanitized = sanitized + ', expertly handcrafted using traditional jewelry techniques';
  }

  // Ensure gemstone setting is specified
  if (sanitized.match(/\b(diamond|gemstone|stone|ruby|sapphire|emerald)\b/i) && 
      !sanitized.match(/\b(prong|bezel|channel|pave|halo|tension|setting)\b/i)) {
    sanitized = sanitized + ', set in secure professional setting';
  }

  return sanitized.trim();
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




