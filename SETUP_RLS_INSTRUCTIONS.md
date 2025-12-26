# Image Storage RLS Setup Instructions

## 🎯 What This Does

Sets up Row Level Security (RLS) so:
- ✅ Users can only see their own images
- ✅ Users can share designs via public links
- ✅ Shared links expire after 30 days
- ✅ No one else can access your images without a share link

---

## 🚀 Quick Setup (Choose ONE method)

### Method 1: Supabase Dashboard (Easiest)

1. **Go to your Supabase Project Dashboard**
   - Navigate to SQL Editor in the left menu

2. **Copy and paste this SQL:**
   ```sql
   -- Run the migration file located at:
   -- supabase/migrations/006_image_storage_rls.sql
   ```

3. **Open the file:** `supabase/migrations/006_image_storage_rls.sql`

4. **Copy ALL the SQL from that file**

5. **Paste it into the Supabase SQL Editor**

6. **Click "RUN"**

7. **Done!** ✅

---

### Method 2: Using psql (If you have database access)

```bash
# Replace YOUR_PASSWORD with your actual Supabase database password
psql "postgresql://postgres:YOUR_PASSWORD@db.achoqdsoocifovdvkbdf.supabase.co:5432/postgres" \
  -f supabase/migrations/006_image_storage_rls.sql
```

---

### Method 3: Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project (get ref from dashboard URL)
npx supabase link --project-ref YOUR_PROJECT_REF

# Push the migration
npx supabase db push
```

---

## ✅ Verify It Worked

After running the SQL, check:

1. **Go to Supabase Dashboard > Database > Tables**
   - You should see a new table: `shared_images`

2. **Go to Storage > images bucket**
   - Click the settings icon
   - "Public bucket" should be OFF (false)
   - RLS policies should be visible

3. **Test it:**
   ```bash
   # Generate a design (logged in)
   # Try sharing it
   # Access the share link
   ```

---

## 🔐 What Security Policies Were Created

### Storage Policies (images bucket):

1. **"Users can upload own images"**
   - Users can only upload to their own folder

2. **"Users can view own images"**
   - Users can only see images in their folder

3. **"Public can view shared images"**
   - Anyone with a valid share token can view
   - Only works if share hasn't expired

4. **"Users can delete own images"**
   - Users can only delete their own images

### Database Policies (shared_images table):

1. **"Users can view own shared images"**
   - See your own share links

2. **"Users can create shares"**
   - Create new share links

3. **"Public can view valid shared images"**
   - Anyone can see non-expired shares

---

## 📊 How Sharing Works

### Creating a Share Link:

```typescript
POST /api/images/share
{
  "designId": "00L8X92V",
  "imagePaths": [
    "userId/designId/view_1.png",
    "userId/designId/view_2.png"
  ]
}

Response:
{
  "shareUrl": "https://yoursite.com/shared/abc123...",
  "expiresAt": "2026-01-25T...",
  "expiresInDays": 30
}
```

### Accessing Shared Images:

```
Visit: /shared/abc123...

The system will:
1. Check if token is valid
2. Check if not expired (< 30 days old)
3. Show the images
4. Track view count
```

### After 30 Days:

- Share link automatically expires
- Images remain in your storage
- You can create a new share link anytime

---

## 🗂️ Folder Structure

```
images/
├── anonymous/           # Logged-out users
│   └── {designId}/
│       ├── view_1.png
│       └── view_2.png
└── {userId}/            # Logged-in users (RLS protected)
    └── {designId}/
        ├── view_1.png
        └── view_2.png
```

---

## 🧹 Cleanup

Expired shares are automatically tracked. To manually cleanup:

```sql
SELECT cleanup_expired_shares();
```

This function is available after running the migration.

---

## ❓ Troubleshooting

### "Access denied" when viewing own images
- Make sure you're logged in
- Check that RLS policies were created
- Verify bucket is set to private (not public)

### "Share link not found"
- Link may have expired (> 30 days)
- Check the `shared_images` table for the token
- Verify expires_at timestamp

### Images not uploading
- Check RLS policy allows uploads to user folder
- Verify user is authenticated
- Check bucket file size limits (10MB max)

---

## 📝 Summary

**Before RLS:**
- ❌ All images public
- ❌ Anyone can see any image
- ❌ No sharing control

**After RLS:**
- ✅ Images private by default
- ✅ Only owner can see their images
- ✅ Controlled sharing with expiration
- ✅ 30-day share links
- ✅ View tracking

---

**Need help?** Check the migration file: `supabase/migrations/006_image_storage_rls.sql`

