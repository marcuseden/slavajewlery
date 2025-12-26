/**
 * ELITE PROMPT ENGINEERING SYSTEM
 * 
 * Purpose: Generate world-class jewelry photography prompts that exceed
 * ChatGPT/DALL-E 3 standard quality through professional photography 
 * terminology, material physics, and multi-view consistency.
 * 
 * Key Innovation: "Design Fingerprint" system ensures perfect consistency
 * across multiple camera angles of the exact same jewelry piece.
 */

import { validateDesignForProduction, sanitizePromptForProduction } from './manufacturing-rules';

// ============================================================================
// TYPES
// ============================================================================

export interface DesignFingerprint {
  id: string; // 8-char unique hash
  metal: MetalSpec;
  gemstones: GemstoneSpec[];
  dimensions: DimensionSpec;
  distinctiveFeatures: string[];
  jewelryType: string;
  styleNotes: string[];
}

export interface MetalSpec {
  type: string; // "18-karat white gold"
  composition: string; // "Au 75%, Pd 15%, Ag 10%"
  karat?: number;
  finish: string; // "mirror polish", "brushed", "hammered"
  reflectivity: number; // percentage
  weight: string; // "3.2g"
  thickness: string; // "1.8mm"
}

export interface GemstoneSpec {
  type: string; // "diamond", "sapphire"
  count: number;
  role: 'primary' | 'accent' | 'halo';
  cut: string; // "round brilliant", "emerald cut"
  size: string; // "1.2ct" or "5mm"
  clarity?: string; // "VS1", "eye-clean"
  color?: string; // "F", "deep blue"
  setting: string; // "6-prong platinum basket"
  placement: string; // "center", "split shank sides"
  prongCount?: number;
}

export interface DimensionSpec {
  length: string; // "18mm"
  width: string; // "6mm"
  height: string; // "7.5mm"
  weight: string; // "4.8g total"
  ringSize?: string; // "6.5 US"
}

export interface ViewSpec {
  type: 'HERO' | 'TECHNICAL';
  viewNumber: 1 | 2;
  cameraAngle: string;
  lighting: string;
  background: string;
  purpose: string;
  aesthetic: string;
}

// ============================================================================
// FINGERPRINT GENERATION
// ============================================================================

/**
 * Generate a unique 8-character hash for design identification
 */
function generateDesignHash(prompt: string): string {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    const char = prompt.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(8, '0').slice(0, 8);
}

/**
 * Extract design elements from user prompt
 */
export function analyzeDesignElements(prompt: string): {
  metals: string[];
  gemstones: string[];
  styles: string[];
  finishes: string[];
  types: string[];
  sizes: string[];
  settings: string[];
} {
  const lower = prompt.toLowerCase();
  
  return {
    metals: (prompt.match(/\b(rose gold|white gold|yellow gold|platinum|palladium|sterling silver|18k|14k|22k|24k)\b/gi) || []),
    gemstones: (prompt.match(/\b(diamond|ruby|sapphire|emerald|pearl|aquamarine|amethyst|topaz|garnet|opal|tanzanite|morganite|turquoise|onyx)\b/gi) || []),
    styles: (prompt.match(/\b(vintage|modern|classic|art deco|minimalist|bohemian|contemporary|romantic|glamorous|retro|victorian|edwardian|georgian)\b/gi) || []),
    finishes: (prompt.match(/\b(polished|mirror|matte|brushed|hammered|textured|satin|florentine|sandblasted)\b/gi) || []),
    types: (prompt.match(/\b(ring|engagement ring|wedding band|eternity band|necklace|pendant|earring|earrings|stud|hoop|bracelet|bangle|cuff|anklet|brooch)\b/gi) || []),
    sizes: (prompt.match(/\b(delicate|bold|chunky|thin|thick|statement|dainty|substantial|petite|oversized)\b/gi) || []),
    settings: (prompt.match(/\b(prong|bezel|channel|pave|pavé|tension|halo|cathedral|cluster|flush|invisible)\b/gi) || [])
  };
}

/**
 * Create comprehensive design fingerprint
 */
export function createDesignFingerprint(
  userVision: string,
  sanitizedVision: string
): DesignFingerprint {
  const elements = analyzeDesignElements(sanitizedVision);
  const lower = sanitizedVision.toLowerCase();
  
  // Determine jewelry type
  let jewelryType = 'ring';
  if (lower.includes('necklace') || lower.includes('pendant')) jewelryType = 'necklace';
  else if (lower.includes('earring')) jewelryType = 'earring';
  else if (lower.includes('bracelet') || lower.includes('bangle') || lower.includes('cuff')) jewelryType = 'bracelet';
  
  // Metal specification
  const metalType = elements.metals[0] || '14-karat yellow gold';
  const finish = elements.finishes[0] || 'mirror polish';
  
  const metal: MetalSpec = {
    type: metalType,
    composition: getMetalComposition(metalType),
    karat: extractKarat(metalType),
    finish: finish,
    reflectivity: getReflectivity(finish),
    weight: estimateWeight(jewelryType, elements.sizes[0]),
    thickness: estimateThickness(jewelryType)
  };
  
  // Gemstone specification
  const gemstones: GemstoneSpec[] = [];
  if (elements.gemstones.length > 0) {
    // Primary stone
    gemstones.push({
      type: elements.gemstones[0],
      count: 1,
      role: 'primary',
      cut: inferCut(elements.gemstones[0]),
      size: inferSize(elements.gemstones[0], jewelryType),
      clarity: inferClarity(elements.gemstones[0]),
      color: inferColor(elements.gemstones[0]),
      setting: elements.settings[0] || 'prong',
      placement: 'center',
      prongCount: 6
    });
    
    // Accent stones if halo or pave mentioned
    if (lower.includes('halo') || lower.includes('pave') || lower.includes('pavé')) {
      gemstones.push({
        type: 'diamond',
        count: lower.includes('halo') ? 20 : 30,
        role: lower.includes('halo') ? 'halo' : 'accent',
        cut: 'round brilliant',
        size: '1.5mm',
        setting: 'micro-pave',
        placement: lower.includes('halo') ? 'surrounding center stone' : 'band sides'
      });
    }
  }
  
  // Dimensions
  const dimensions: DimensionSpec = {
    length: estimateDimension(jewelryType, 'length'),
    width: estimateDimension(jewelryType, 'width'),
    height: estimateDimension(jewelryType, 'height'),
    weight: metal.weight,
    ...(jewelryType === 'ring' && { ringSize: '6.5 US' })
  };
  
  // Distinctive features
  const distinctiveFeatures = generateDistinctiveFeatures(
    jewelryType,
    elements.styles,
    gemstones,
    sanitizedVision
  );
  
  return {
    id: generateDesignHash(sanitizedVision),
    metal,
    gemstones,
    dimensions,
    distinctiveFeatures,
    jewelryType,
    styleNotes: elements.styles
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getMetalComposition(metalType: string): string {
  const lower = metalType.toLowerCase();
  if (lower.includes('18') && lower.includes('gold')) return 'Au 75%, alloy 25%';
  if (lower.includes('14') && lower.includes('gold')) return 'Au 58.3%, alloy 41.7%';
  if (lower.includes('platinum')) return 'Pt 95%, Ru 5%';
  if (lower.includes('silver')) return 'Ag 92.5%, Cu 7.5%';
  return 'Au 58.3%, alloy 41.7%';
}

function extractKarat(metalType: string): number | undefined {
  const match = metalType.match(/(\d+)k/i);
  return match ? parseInt(match[1]) : undefined;
}

function getReflectivity(finish: string): number {
  const lower = finish.toLowerCase();
  if (lower.includes('mirror') || lower.includes('polish')) return 85;
  if (lower.includes('brushed') || lower.includes('satin')) return 45;
  if (lower.includes('matte') || lower.includes('hammered')) return 25;
  return 70;
}

function estimateWeight(type: string, size?: string): string {
  const isDelicate = size?.toLowerCase().includes('delicate') || size?.toLowerCase().includes('dainty');
  const isBold = size?.toLowerCase().includes('bold') || size?.toLowerCase().includes('chunky');
  
  const weights: Record<string, string> = {
    ring: isDelicate ? '2.5g' : isBold ? '6.5g' : '3.8g',
    necklace: isDelicate ? '4.2g' : isBold ? '12g' : '7.5g',
    earring: isDelicate ? '1.8g' : isBold ? '5.2g' : '3.2g',
    bracelet: isDelicate ? '5.5g' : isBold ? '15g' : '9.2g'
  };
  
  return weights[type] || '4.0g';
}

function estimateThickness(type: string): string {
  const thickness: Record<string, string> = {
    ring: '1.8mm',
    necklace: '1.2mm chain',
    earring: '1.5mm',
    bracelet: '2.2mm'
  };
  
  return thickness[type] || '1.5mm';
}

function estimateDimension(type: string, dimension: 'length' | 'width' | 'height'): string {
  const dims: Record<string, Record<string, string>> = {
    ring: { length: '18mm', width: '6mm', height: '7.5mm' },
    necklace: { length: '450mm', width: '8mm', height: '12mm' },
    earring: { length: '25mm', width: '8mm', height: '6mm' },
    bracelet: { length: '180mm', width: '12mm', height: '8mm' }
  };
  
  return dims[type]?.[dimension] || '10mm';
}

function inferCut(gemstone: string): string {
  const lower = gemstone.toLowerCase();
  if (lower.includes('diamond')) return 'round brilliant';
  if (lower.includes('emerald')) return 'emerald cut';
  if (lower.includes('sapphire')) return 'cushion cut';
  if (lower.includes('ruby')) return 'oval cut';
  return 'round brilliant';
}

function inferSize(gemstone: string, type: string): string {
  if (type === 'ring') return '1.2ct';
  if (type === 'necklace') return '0.8ct';
  if (type === 'earring') return '0.6ct';
  return '1.0ct';
}

function inferClarity(gemstone: string): string {
  return gemstone.toLowerCase().includes('diamond') ? 'VS1' : 'eye-clean';
}

function inferColor(gemstone: string): string {
  const lower = gemstone.toLowerCase();
  if (lower.includes('diamond')) return 'F (colorless)';
  if (lower.includes('sapphire')) return 'deep royal blue';
  if (lower.includes('ruby')) return 'pigeon blood red';
  if (lower.includes('emerald')) return 'vivid green';
  return 'natural color';
}

function generateDistinctiveFeatures(
  type: string,
  styles: string[],
  gemstones: GemstoneSpec[],
  vision: string
): string[] {
  const features: string[] = [];
  
  // Add style-specific features
  if (styles.some(s => s.toLowerCase().includes('vintage') || s.toLowerCase().includes('art deco'))) {
    features.push('Milgrain beading along edges');
    features.push('Hand-engraved filigree patterns');
  }
  
  if (styles.some(s => s.toLowerCase().includes('modern') || s.toLowerCase().includes('contemporary'))) {
    features.push('Knife-edge profile with clean lines');
    features.push('Architectural geometric elements');
  }
  
  // Add type-specific features
  if (type === 'ring') {
    features.push('Cathedral shoulders with delicate arches');
    if (gemstones.length > 0) {
      features.push('Hidden surprise diamond beneath center stone');
    }
  }
  
  if (type === 'necklace') {
    features.push('Adjustable length with spring ring clasp');
    features.push('Delicate cable chain construction');
  }
  
  // Extract any mentioned engravings or names - improved detection
  // Try quoted names first (most explicit)
  let nameMatch = vision.match(/["'"'`]([A-Za-z]+)["'"'`]/);
  
  // If no quoted name, try common patterns
  if (!nameMatch) {
    // Patterns: "name Mirja", "engraved Mirja", "with Mirja", "called Mirja"
    nameMatch = vision.match(/\b(?:name|engraved|with|called|reads|says)\s+([A-Z][a-z]+)\b/i);
  }
  
  if (nameMatch) {
    const extractedName = nameMatch[1];
    features.push(`Engraved "${extractedName}" inscription`);
    console.log(`✓ Name extracted: "${extractedName}"`);
  }
  
  // Add gemstone-specific features
  if (gemstones.some(g => g.role === 'halo')) {
    features.push('Halo creates 30% larger visual appearance');
  }
  
  // Ensure we have at least 3 features
  while (features.length < 3) {
    features.push('Hand-finished with jeweler\'s precision');
  }
  
  return features.slice(0, 5); // Max 5 features
}

// ============================================================================
// VIEW SPECIFICATIONS
// ============================================================================

export function getViewSpec(viewNumber: 1 | 2): ViewSpec {
  if (viewNumber === 1) {
    return {
      type: 'HERO',
      viewNumber: 1,
      cameraAngle: '45° angle showing front and side, slight elevation for depth',
      lighting: 'Bright even studio lighting, soft shadows, all details visible',
      background: 'Clean white background, professional product photography',
      purpose: 'Clear product view showing exact appearance and details',
      aesthetic: 'Professional e-commerce product photography - clean, clear, accurate'
    };
  } else {
    return {
      type: 'TECHNICAL',
      viewNumber: 2,
      cameraAngle: 'Straight-on front view at eye level, centered',
      lighting: 'Bright even front lighting, no shadows, maximum clarity',
      background: 'Pure white seamless background',
      purpose: 'Show exact front appearance as customer will see it',
      aesthetic: 'Amazon/Blue Nile product photography - crystal clear, accurate colors'
    };
  }
}

// ============================================================================
// MASTER PROMPT BUILDER
// ============================================================================

export function buildElitePrompt(
  userVision: string,
  fingerprint: DesignFingerprint,
  viewSpec: ViewSpec
): string {
  const { metal, gemstones, dimensions, distinctiveFeatures, jewelryType, id } = fingerprint;
  
  // Build gemstone inventory text
  const gemstoneInventory = gemstones.length > 0 
    ? gemstones.map(g => `
  • ${g.count}× ${g.type}${g.count > 1 ? 's' : ''}
    Cut: ${g.cut} | Size: ${g.size}${g.clarity ? ` | Clarity: ${g.clarity}` : ''}${g.color ? ` | Color: ${g.color}` : ''}
    Setting: ${g.setting}${g.prongCount ? ` with ${g.prongCount} prongs` : ''}
    Position: ${g.placement}`).join('\n')
    : '  No gemstones - metal only design';
  
  // View-specific photography details (COMPACT for 4000 char limit)
  const photographySpec = viewSpec.type === 'HERO' ? `
CAMERA: Professional product camera, 100mm macro, f/8 for sharp focus, ${viewSpec.cameraAngle}
LIGHTING: Bright even studio softbox lighting from front and sides, soft shadows showing dimension, all details clearly visible
BACKGROUND: ${viewSpec.background}, jewelry clearly stands out
STYLE: ${viewSpec.purpose} | Clean, clear, accurate representation | ${viewSpec.aesthetic}` 
  : `
CAMERA: Professional product camera, 100mm macro, f/11 for maximum sharpness, ${viewSpec.cameraAngle}
LIGHTING: Bright even frontal lighting, soft fill from all sides, no harsh shadows, true color reproduction
BACKGROUND: ${viewSpec.background}, professional e-commerce standard
STYLE: ${viewSpec.purpose} | ${viewSpec.aesthetic}`;

  // Build consistency verification for view 2 (COMPACT)
  const consistencyReminder = viewSpec.viewNumber === 2 ? `

⚠️ CRITICAL: EXACT SAME piece from View 1 - only camera angle changed
VERIFY: ${metal.type} ${metal.finish} | ${gemstones.map(g => `${g.count}× ${g.type}`).join(', ') || 'no stones'} | ${dimensions.length}×${dimensions.width}×${dimensions.height} | ${distinctiveFeatures.join('; ')}
Cannot alter jewelry - only photographing from different angle.` 
  : '';

  // Build compact elite prompt (MUST be under 4000 chars for DALL-E 3)
  let prompt = `
LUXURY JEWELRY SPEC | ID: ${id} | View ${viewSpec.viewNumber}/2

DESIGN: ${userVision}

EXACT SPECIFICATIONS (same in both views):
Metal: ${metal.type}, ${metal.finish} (${metal.reflectivity}% reflectivity), ${metal.weight}
${gemstoneInventory}
Dimensions: ${dimensions.length}×${dimensions.width}×${dimensions.height}${dimensions.ringSize ? `, size ${dimensions.ringSize}` : ''}
Features: ${distinctiveFeatures.join('; ')}

${photographySpec}

RENDERING REQUIREMENTS:
✓ CLEAR PRODUCT PHOTOGRAPHY - customer must see exactly what they will receive
✓ ALL DETAILS VISIBLE - every gemstone, engraving, chain link, surface clearly shown
✓ ACCURATE COLORS - true metal tones (rose gold = pinkish, white gold = silver-white, yellow gold = golden)
✓ REALISTIC MATERIALS - proper metal reflectivity, gemstone sparkle, but not exaggerated
✓ SHARP FOCUS - entire piece in focus, no artistic blur
✓ PROFESSIONAL E-COMMERCE - like Blue Nile, James Allen, Brilliant Earth product photos
✗ NO artistic effects, hands, people, models, dramatic shadows, impossible geometry, cartoon sparkles, text
${consistencyReminder}

Create clear professional product photo of ${jewelryType} showing exact appearance for online jewelry shopping.
`.trim();

  // CRITICAL: Enforce DALL-E 3's 4000 character limit
  const MAX_LENGTH = 3950; // Buffer for safety
  
  if (prompt.length > MAX_LENGTH) {
    console.warn(`⚠️ Prompt too long (${prompt.length} chars), truncating to ${MAX_LENGTH}...`);
    
    // Intelligent truncation: Keep critical parts, shorten user vision
    const userVisionMaxLength = 200;
    const truncatedVision = userVision.length > userVisionMaxLength
      ? userVision.substring(0, userVisionMaxLength) + '...'
      : userVision;
    
    // Rebuild with truncated vision
    prompt = `
LUXURY JEWELRY SPEC | ID: ${id} | View ${viewSpec.viewNumber}/2

DESIGN: ${truncatedVision}

EXACT SPECIFICATIONS (same in both views):
Metal: ${metal.type}, ${metal.finish} (${metal.reflectivity}% reflectivity), ${metal.weight}
${gemstoneInventory}
Dimensions: ${dimensions.length}×${dimensions.width}×${dimensions.height}${dimensions.ringSize ? `, size ${dimensions.ringSize}` : ''}
Features: ${distinctiveFeatures.join('; ')}

${photographySpec}

RENDERING REQUIREMENTS:
✓ CLEAR PRODUCT PHOTOGRAPHY - customer must see exactly what they will receive
✓ ALL DETAILS VISIBLE - every gemstone, engraving, chain link, surface clearly shown
✓ ACCURATE COLORS - true metal tones (rose gold = pinkish, white gold = silver-white, yellow gold = golden)
✓ REALISTIC MATERIALS - proper metal reflectivity, gemstone sparkle, but not exaggerated
✓ SHARP FOCUS - entire piece in focus, no artistic blur
✓ PROFESSIONAL E-COMMERCE - like Blue Nile, James Allen, Brilliant Earth product photos
✗ NO artistic effects, hands, people, models, dramatic shadows, impossible geometry, cartoon sparkles, text
${consistencyReminder}

Create clear professional product photo of ${jewelryType} showing exact appearance for online jewelry shopping.
`.trim();
  }
  
  // Final safety check
  if (prompt.length > MAX_LENGTH) {
    prompt = prompt.substring(0, MAX_LENGTH);
    console.warn(`⚠️ Hard truncation applied at ${MAX_LENGTH} characters`);
  }
  
  console.log(`✓ Final prompt length: ${prompt.length} characters`);

  return prompt;
}

