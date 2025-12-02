// Jewelry pricing calculator with real-time spot prices
export interface JewelrySpecs {
  type: 'ring' | 'necklace' | 'bracelet' | 'earrings' | 'pendant' | 'brooch';
  material: 'gold' | 'platinum' | 'silver' | 'white-gold' | 'rose-gold';
  karat?: number; // For gold (14k, 18k, etc.)
  hasGemstones: boolean;
  gemstoneCarat?: number;
  gemstoneType?: 'diamond' | 'ruby' | 'emerald' | 'sapphire' | 'pearl';
  complexity: 'simple' | 'moderate' | 'complex' | 'intricate';
  size: 'small' | 'medium' | 'large';
}

export interface PricingBreakdown {
  materialCost: number;
  laborCost: number;
  gemstoneCost: number;
  subtotal: number;
  margin: number;
  finalPrice: number;
  breakdown: {
    materialWeight: number;
    materialPricePerGram: number;
    laborHours: number;
    laborRate: number;
  };
}

// Get spot prices (in production, use real API like metals-api.com)
export async function getSpotPrices() {
  try {
    // In production, replace with real API call
    // const response = await fetch('https://metals-api.com/api/latest?access_key=YOUR_KEY&base=USD&symbols=XAU,XAG,XPT');
    
    // Mock spot prices (USD per troy ounce) - replace with real API
    return {
      gold: 2040, // Gold per troy ounce
      silver: 24.50, // Silver per troy ounce  
      platinum: 950, // Platinum per troy ounce
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error fetching spot prices:', error);
    // Fallback prices
    return {
      gold: 2000,
      silver: 25,
      platinum: 950,
      lastUpdated: new Date()
    };
  }
}

// Convert troy ounce to grams (1 troy ounce = 31.1035 grams)
const TROY_OUNCE_TO_GRAMS = 31.1035;

// Estimate material weight based on jewelry type and size
function estimateMaterialWeight(specs: JewelrySpecs): number {
  const baseWeights = {
    ring: { small: 2.5, medium: 4.0, large: 6.5 }, // grams
    necklace: { small: 8.0, medium: 15.0, large: 25.0 },
    bracelet: { small: 6.0, medium: 12.0, large: 20.0 },
    earrings: { small: 2.0, medium: 4.0, large: 8.0 }, // pair
    pendant: { small: 3.0, medium: 6.0, large: 12.0 },
    brooch: { small: 4.0, medium: 8.0, large: 15.0 }
  };

  let baseWeight = baseWeights[specs.type][specs.size];
  
  // Adjust for complexity
  const complexityMultiplier = {
    simple: 1.0,
    moderate: 1.3,
    complex: 1.6,
    intricate: 2.0
  };
  
  return baseWeight * complexityMultiplier[specs.complexity];
}

// Estimate labor hours based on jewelry type and complexity
function estimateLaborHours(specs: JewelrySpecs): number {
  const baseLaborHours = {
    ring: { simple: 3, moderate: 6, complex: 12, intricate: 20 },
    necklace: { simple: 4, moderate: 8, complex: 16, intricate: 30 },
    bracelet: { simple: 3, moderate: 6, complex: 12, intricate: 25 },
    earrings: { simple: 2, moderate: 4, complex: 8, intricate: 15 },
    pendant: { simple: 2, moderate: 4, complex: 8, intricate: 15 },
    brooch: { simple: 3, moderate: 6, complex: 12, intricate: 20 }
  };

  let baseHours = baseLaborHours[specs.type][specs.complexity];
  
  // Adjust for size
  const sizeMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.4
  };
  
  return baseHours * sizeMultiplier[specs.size];
}

// Calculate gemstone cost
function calculateGemstoneCost(specs: JewelrySpecs): number {
  if (!specs.hasGemstones || !specs.gemstoneCarat || !specs.gemstoneType) {
    return 0;
  }

  // Approximate price per carat (USD) - in production, use gemstone price APIs
  const pricePerCarat = {
    diamond: 5000, // Varies widely by quality
    ruby: 1500,
    emerald: 2000,
    sapphire: 1200,
    pearl: 300
  };

  return specs.gemstoneCarat * pricePerCarat[specs.gemstoneType];
}

// Main pricing calculation function
export async function calculateJewelryPrice(specs: JewelrySpecs): Promise<PricingBreakdown> {
  const spotPrices = await getSpotPrices();
  
  // Calculate material cost
  const materialWeight = estimateMaterialWeight(specs);
  let materialPricePerGram: number;
  
  if (specs.material === 'gold' || specs.material === 'white-gold' || specs.material === 'rose-gold') {
    const karat = specs.karat || 14;
    const goldPurity = karat / 24; // 14k = 58.3% gold, 18k = 75% gold
    materialPricePerGram = (spotPrices.gold / TROY_OUNCE_TO_GRAMS) * goldPurity;
  } else if (specs.material === 'platinum') {
    materialPricePerGram = spotPrices.platinum / TROY_OUNCE_TO_GRAMS;
  } else if (specs.material === 'silver') {
    materialPricePerGram = spotPrices.silver / TROY_OUNCE_TO_GRAMS;
  } else {
    materialPricePerGram = spotPrices.silver / TROY_OUNCE_TO_GRAMS; // fallback
  }
  
  const materialCost = materialWeight * materialPricePerGram;
  
  // Calculate labor cost
  const laborHours = estimateLaborHours(specs);
  const laborRate = 85; // USD per hour for skilled jeweler
  const laborCost = laborHours * laborRate;
  
  // Calculate gemstone cost
  const gemstoneCost = calculateGemstoneCost(specs);
  
  // Calculate subtotal and apply 60% margin
  const subtotal = materialCost + laborCost + gemstoneCost;
  const margin = subtotal * 0.60; // 60% margin
  const finalPrice = subtotal + margin;
  
  return {
    materialCost: Math.round(materialCost),
    laborCost: Math.round(laborCost),
    gemstoneCost: Math.round(gemstoneCost),
    subtotal: Math.round(subtotal),
    margin: Math.round(margin),
    finalPrice: Math.round(finalPrice),
    breakdown: {
      materialWeight: Math.round(materialWeight * 100) / 100,
      materialPricePerGram: Math.round(materialPricePerGram * 100) / 100,
      laborHours: Math.round(laborHours * 100) / 100,
      laborRate
    }
  };
}

// Parse jewelry specifications from AI-generated prompt
export function parseJewelrySpecs(prompt: string): JewelrySpecs {
  const lowerPrompt = prompt.toLowerCase();
  
  // Determine jewelry type
  let type: JewelrySpecs['type'] = 'ring'; // default
  if (lowerPrompt.includes('necklace')) type = 'necklace';
  else if (lowerPrompt.includes('bracelet')) type = 'bracelet';
  else if (lowerPrompt.includes('earring')) type = 'earrings';
  else if (lowerPrompt.includes('pendant')) type = 'pendant';
  else if (lowerPrompt.includes('brooch')) type = 'brooch';
  
  // Determine material
  let material: JewelrySpecs['material'] = 'gold'; // default
  let karat = 14; // default
  
  if (lowerPrompt.includes('platinum')) {
    material = 'platinum';
  } else if (lowerPrompt.includes('silver') || lowerPrompt.includes('sterling')) {
    material = 'silver';
  } else if (lowerPrompt.includes('white gold')) {
    material = 'white-gold';
  } else if (lowerPrompt.includes('rose gold') || lowerPrompt.includes('pink gold')) {
    material = 'rose-gold';
  }
  
  // Extract karat if mentioned
  if (lowerPrompt.includes('18k') || lowerPrompt.includes('18 karat')) karat = 18;
  else if (lowerPrompt.includes('14k') || lowerPrompt.includes('14 karat')) karat = 14;
  else if (lowerPrompt.includes('10k') || lowerPrompt.includes('10 karat')) karat = 10;
  
  // Determine if it has gemstones
  const hasGemstones = lowerPrompt.includes('diamond') || lowerPrompt.includes('ruby') || 
                      lowerPrompt.includes('emerald') || lowerPrompt.includes('sapphire') || 
                      lowerPrompt.includes('pearl') || lowerPrompt.includes('stone') ||
                      lowerPrompt.includes('gem');
  
  // Determine gemstone type and size
  let gemstoneType: JewelrySpecs['gemstoneType'];
  let gemstoneCarat = 0;
  
  if (hasGemstones) {
    if (lowerPrompt.includes('diamond')) gemstoneType = 'diamond';
    else if (lowerPrompt.includes('ruby')) gemstoneType = 'ruby';
    else if (lowerPrompt.includes('emerald')) gemstoneType = 'emerald';
    else if (lowerPrompt.includes('sapphire')) gemstoneType = 'sapphire';
    else if (lowerPrompt.includes('pearl')) gemstoneType = 'pearl';
    
    // Estimate carat size based on keywords
    if (lowerPrompt.includes('large') || lowerPrompt.includes('statement')) {
      gemstoneCarat = type === 'ring' ? 2.0 : 1.5;
    } else if (lowerPrompt.includes('small') || lowerPrompt.includes('delicate')) {
      gemstoneCarat = 0.5;
    } else {
      gemstoneCarat = 1.0; // default
    }
  }
  
  // Determine complexity
  let complexity: JewelrySpecs['complexity'] = 'moderate'; // default
  if (lowerPrompt.includes('simple') || lowerPrompt.includes('minimalist') || lowerPrompt.includes('clean')) {
    complexity = 'simple';
  } else if (lowerPrompt.includes('intricate') || lowerPrompt.includes('ornate') || lowerPrompt.includes('detailed')) {
    complexity = 'intricate';
  } else if (lowerPrompt.includes('complex') || lowerPrompt.includes('elaborate')) {
    complexity = 'complex';
  }
  
  // Determine size
  let size: JewelrySpecs['size'] = 'medium'; // default
  if (lowerPrompt.includes('delicate') || lowerPrompt.includes('small') || lowerPrompt.includes('petite')) {
    size = 'small';
  } else if (lowerPrompt.includes('large') || lowerPrompt.includes('statement') || lowerPrompt.includes('chunky')) {
    size = 'large';
  }
  
  return {
    type,
    material,
    karat: material.includes('gold') ? karat : undefined,
    hasGemstones,
    gemstoneCarat: hasGemstones ? gemstoneCarat : undefined,
    gemstoneType,
    complexity,
    size
  };
}
