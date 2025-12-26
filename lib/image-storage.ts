/**
 * IMAGE STORAGE SERVICE
 * 
 * Purpose: Download generated images from OpenAI and store permanently
 * in Supabase Storage bucket for long-term access.
 * 
 * Benefits:
 * - Permanent URLs (OpenAI URLs expire after 2 hours)
 * - Full control over images
 * - CDN delivery via Supabase
 * - Backup of all generated designs
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key for storage operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'images';

/**
 * Download image from URL
 */
async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImageToStorage(
  imageUrl: string,
  designId: string,
  viewNumber: number,
  userId?: string
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    console.log(`📥 Downloading image from OpenAI (View ${viewNumber})...`);
    const imageBuffer = await downloadImage(imageUrl);
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = userId 
      ? `${userId}/${designId}/view_${viewNumber}_${timestamp}.png`
      : `anonymous/${designId}/view_${viewNumber}_${timestamp}.png`;
    
    console.log(`📤 Uploading to Supabase Storage: ${filename}...`);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '31536000', // Cache for 1 year
        upsert: false
      });

    if (error) {
      console.error('❌ Upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    console.log(`✅ Image uploaded successfully: ${publicUrl}`);

    return { success: true, publicUrl };
  } catch (error) {
    console.error('❌ Image storage error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Store multiple images (for all views of a design)
 */
export async function storeDesignImages(
  images: Array<{ url: string; viewNumber: number }>,
  designId: string,
  userId?: string
): Promise<Array<{ viewNumber: number; originalUrl: string; storageUrl?: string; error?: string }>> {
  const results = [];

  for (const image of images) {
    const result = await uploadImageToStorage(
      image.url,
      designId,
      image.viewNumber,
      userId
    );

    results.push({
      viewNumber: image.viewNumber,
      originalUrl: image.url,
      storageUrl: result.publicUrl,
      error: result.error
    });
  }

  return results;
}

/**
 * Initialize storage bucket (run once during setup)
 */
export async function initializeStorageBucket(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

    if (bucketExists) {
      return { success: true, message: `Bucket '${BUCKET_NAME}' already exists` };
    }

    // Create bucket
    const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true, // Make images publicly accessible
      fileSizeLimit: 10485760, // 10MB limit per file
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });

    if (error) {
      return { success: false, message: `Failed to create bucket: ${error.message}` };
    }

    console.log(`✅ Storage bucket '${BUCKET_NAME}' created successfully`);
    return { success: true, message: `Bucket '${BUCKET_NAME}' created successfully` };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Delete old images for a design (when regenerating)
 */
export async function deleteDesignImages(
  designId: string,
  userId?: string
): Promise<{ success: boolean; deletedCount: number }> {
  try {
    const prefix = userId 
      ? `${userId}/${designId}/`
      : `anonymous/${designId}/`;

    // List all files for this design
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(prefix);

    if (listError || !files || files.length === 0) {
      return { success: true, deletedCount: 0 };
    }

    // Delete all files
    const filePaths = files.map(file => `${prefix}${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths);

    if (deleteError) {
      console.error('Error deleting old images:', deleteError);
      return { success: false, deletedCount: 0 };
    }

    console.log(`✅ Deleted ${filePaths.length} old images for design ${designId}`);
    return { success: true, deletedCount: filePaths.length };
  } catch (error) {
    console.error('Error in deleteDesignImages:', error);
    return { success: false, deletedCount: 0 };
  }
}

