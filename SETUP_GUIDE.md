# 🚀 Complete Setup Guide - Slava Jewelry Studio

## Current Status ✅
- Git repository initialized and committed
- All dependencies installed (386 packages)
- Environment template created
- Project structure ready

## Next Steps - Service Configuration

### 1. Supabase Setup (Database & Auth)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New project"
   - Choose organization and name: "slava-jewelry-studio"
   - Choose region closest to your users
   - Generate a strong password
   - Wait for provisioning (~2 minutes)

2. **Get API Keys**
   - Go to Settings → API in your Supabase dashboard
   - Copy these values to `.env.local`:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

3. **Run Database Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy entire contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and click "Run"
   - Should create 6 tables with proper RLS policies

4. **Create Storage Bucket**
   - Go to Storage in Supabase dashboard
   - Create new bucket: `design-images`
   - Make it **public**
   - Add upload policy for authenticated users

### 2. OpenAI Setup (AI Generation)

1. **Get API Key**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Navigate to API Keys
   - Create new secret key
   - Copy to `.env.local` as `OPENAI_API_KEY`

2. **Set Usage Limits**
   - Recommended: $50/month limit for development
   - Each design generation costs ~$0.50-$2.00
   - Image generation: $0.040 per image (5 images per design)

### 3. Stripe Setup (Payments)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Create account for jewelry business
   - Complete business verification

2. **Get API Keys** 
   - Go to Developers → API Keys
   - Copy test keys to `.env.local`:
     - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `Secret key` → `STRIPE_SECRET_KEY`

3. **Set up Webhooks** (for production)
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 4. Test the Setup

```bash
# Start development server
npm run dev

# Should open at http://localhost:3000
```

## Database Schema Overview

The migration creates these tables:
- **users**: User profiles linked to Supabase Auth
- **celebrity_collections**: Featured collections for inspiration
- **designs**: User designs with AI-generated specs
- **design_images**: 5 AI-generated images per design
- **orders**: Order tracking with Stripe integration
- **production_stages**: Production progress tracking

## Key Features Ready

✅ **Dark Mode UI**: Professional jewelry showcase aesthetic
✅ **Type Safety**: Full TypeScript with strict mode
✅ **Database Security**: RLS policies protect all data
✅ **Mobile First**: Responsive design throughout
✅ **AI Pipeline**: OpenAI integration for design generation
✅ **Payment Flow**: Stripe checkout with deposit system

## What's Next?

Once services are configured, you can:

1. **Design Wizard**: 6-step jewelry design flow
2. **AI Generation**: GPT-4 + DALL-E 3 for specs and images
3. **Admin Panel**: Jeweler approval and production tracking
4. **User Dashboard**: Order tracking and design history

## Environment Variables Reference

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server-side only)

# OpenAI
OPENAI_API_KEY=sk-xxx... (server-side only)

# Stripe  
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
STRIPE_SECRET_KEY=sk_test_xxx... (server-side only)
STRIPE_WEBHOOK_SECRET=whsec_xxx... (server-side only)

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Security Notes

- Never commit `.env.local` (already in .gitignore)
- Service role keys and secret keys are server-side only
- All database access protected by Row Level Security
- Stripe webhooks verify signatures for security

Ready to configure your services? Start with Supabase, then OpenAI, then Stripe!
