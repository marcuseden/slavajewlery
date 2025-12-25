# Create User Account: m_lowegren@mac.com

## Current Supabase Status

⚠️ **Supabase instance not accessible**: `achoqdsoocifovdvkbdf.supabase.co`

This means you need to either:
1. Set up a new Supabase project, OR
2. Use the signup form on the site

---

## Option 1: Use the Live Site Signup (EASIEST)

1. Go to: https://makeit-git-main-marcus-eden.vercel.app/
2. Click "Sign In" in header
3. Click "Sign Up" tab
4. Enter:
   - **Email**: m_lowegren@mac.com
   - **Password**: ABC123
   - **Name**: M Lowegren
5. Click "Create Account"

✅ Account created and you're logged in!

---

## Option 2: Set Up Supabase Project (If Needed)

If Supabase needs to be configured:

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create new project (free tier)
3. Copy your project URL and keys

### Step 2: Update .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 3: Run Migrations

```bash
cd "/Users/marlow/Documents/Cursor-projects/slava jewlery"
node run-migrations.js
```

### Step 4: Create User

```bash
node create-user-direct.js
```

---

## Option 3: Manual Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Enter:
   - Email: m_lowegren@mac.com
   - Password: ABC123
   - Auto-confirm email: ✅ Yes
5. Click **Create User**

---

## Recommended: Option 1 (Use Live Site)

The signup form on your live site works and will create the account properly. This is the easiest method.

**URL**: https://makeit-git-main-marcus-eden.vercel.app/

Click "Sign In" → "Sign Up" tab → Enter credentials → Done! ✅

---

## Account Details

Once created (via any method):

**Email**: m_lowegren@mac.com  
**Password**: ABC123  
**Name**: M Lowegren

You'll have access to:
- Dashboard (/dashboard)
- Design tool (/design)
- Order history
- Saved designs

---

## Troubleshooting

**If signup doesn't work**:
- Check that Supabase project exists and is active
- Verify .env.local has correct Supabase credentials
- Check Vercel environment variables match .env.local
- Ensure email confirmation is disabled (or handle confirmation emails)

**Email Confirmation**:
If you need to disable email confirmation in Supabase:
1. Go to Authentication → Settings
2. Disable "Enable email confirmations"
3. Save

This allows immediate login without email verification.

