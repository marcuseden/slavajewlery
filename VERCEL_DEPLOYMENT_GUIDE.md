# 🚀 Vercel Deployment Guide - Slava Jewelry Studio

## ✅ Prerequisites Checklist

Before deploying to Vercel, ensure you have:

- ✅ **Git Repository**: Pushed to GitHub (https://github.com/marcuseden/slavajewlery)
- ✅ **Supabase Project**: Database configured and running
- ✅ **OpenAI API Key**: For AI design generation
- ⚠️ **Stripe Account**: Set up for payments (currently using placeholders)
- ✅ **Vercel Account**: Free tier works perfectly

---

## 📊 Tech Stack Summary

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 16.0.4 | React framework with App Router |
| **Language** | TypeScript 5.x | Type-safe development |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **Database** | Supabase | PostgreSQL + Auth + Storage |
| **AI** | OpenAI | GPT-4o + DALL-E 3 for design generation |
| **Payments** | Stripe | Payment processing |
| **Deployment** | Vercel | Serverless hosting |

---

## 🔐 Required Environment Variables

### Currently Configured (from .env.local):

✅ **Supabase Variables** - **CONFIGURED**
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

✅ **OpenAI Variable** - **CONFIGURED**
```
OPENAI_API_KEY=<your-openai-key>
```

⚠️ **Stripe Variables** - **USING PLACEHOLDERS (ACTION REQUIRED)**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
```

❌ **App URL** - **NOT SET (REQUIRED FOR PRODUCTION)**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## 📝 Step-by-Step Vercel Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your repository: `marcuseden/slavajewlery`

### Step 2: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

### Step 3: Add Environment Variables

In the Vercel dashboard, add these environment variables:

#### Production Environment Variables:

**IMPORTANT:** Copy the actual values from your local `.env.local` file. Do NOT use the placeholder values below.

```bash
# Supabase Configuration (COPY FROM YOUR .env.local)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI Configuration (COPY FROM YOUR .env.local)
OPENAI_API_KEY=your-openai-api-key

# Stripe Configuration (GET FROM STRIPE DASHBOARD)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_real_key_here
STRIPE_SECRET_KEY=sk_test_your_real_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_real_key_here

# App URL (will be provided by Vercel after first deployment)
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**To get your values:**
1. Open your local `.env.local` file
2. Copy the Supabase and OpenAI values
3. Paste them into Vercel environment variables
4. For Stripe, get keys from your Stripe Dashboard

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Once deployed, copy your production URL
4. Go back to Environment Variables and update `NEXT_PUBLIC_APP_URL` with your actual URL
5. Redeploy to apply the change

---

## ⚙️ Vercel Configuration (vercel.json)

Your project already has a `vercel.json` file configured:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "outputDirectory": ".next",
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  }
}
```

This configuration:
- ✅ Recognizes Next.js framework
- ✅ Sets API timeout to 30 seconds (needed for AI generation)
- ✅ Configures CORS headers for API routes
- ✅ Sets up Stripe webhook routing

---

## 🔧 Post-Deployment Configuration

### 1. Update Supabase URL Allowlist

In your Supabase project dashboard:
1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to allowed redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/**`

### 2. Configure Stripe Webhooks

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
4. Copy the webhook secret and update `STRIPE_WEBHOOK_SECRET` in Vercel

### 3. Configure Supabase Storage CORS

In Supabase dashboard, go to **Storage** → **Policies**:
- Ensure the `design-images` bucket exists
- Set appropriate CORS policy to allow your Vercel domain

---

## 🚨 Action Items Before Production

### Critical (Must Fix):

1. **Stripe Integration**
   - [ ] Get real Stripe API keys (test mode)
   - [ ] Update environment variables in Vercel
   - [ ] Configure webhook endpoint
   - [ ] Test payment flow

2. **Environment Variables**
   - [ ] Set `NEXT_PUBLIC_APP_URL` after first deployment
   - [ ] Update Supabase allowed URLs
   - [ ] Verify all API keys work in production

### Recommended (Should Fix):

3. **Security**
   - [ ] Review Supabase RLS policies
   - [ ] Rotate API keys if they were exposed
   - [ ] Set up Vercel environment-specific secrets

4. **Performance**
   - [ ] Enable Vercel Analytics
   - [ ] Configure Image Optimization
   - [ ] Set up CDN caching

---

## 🧪 Testing Deployment

After deployment, test these critical paths:

1. **Homepage** → Should load with design wizard
2. **Authentication** → Sign up/sign in should work
3. **Design Creation** → Complete wizard, generate design
4. **AI Generation** → Verify OpenAI integration works
5. **Image Display** → Check Supabase storage images load
6. **Payment Flow** → Test Stripe checkout (once configured)

---

## 📊 Monitoring & Analytics

### Vercel Dashboard Provides:

- **Real-time logs**: View API errors and requests
- **Analytics**: Page views, Core Web Vitals
- **Functions**: Monitor serverless function execution
- **Deployments**: Git history and rollback options

### Supabase Dashboard Provides:

- **Database**: Query editor and table browser
- **Auth**: User management and sessions
- **Storage**: File browser and usage stats
- **API**: Real-time logs and metrics

---

## 🆘 Troubleshooting Common Issues

### Build Fails

**Error:** `Module not found` or `Cannot find package`
- **Solution:** Run `npm install` locally, commit `package-lock.json`

### API Routes Timeout

**Error:** Function exceeded time limit
- **Solution:** Already configured to 30s in `vercel.json`, but complex AI generations might need optimization

### Environment Variables Not Working

**Error:** `undefined` values in production
- **Solution:** Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- **Solution:** Redeploy after adding environment variables

### Supabase Connection Issues

**Error:** `Invalid API key` or CORS errors
- **Solution:** Check Supabase project status and API key validity
- **Solution:** Add Vercel URL to Supabase allowed domains

---

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [Stripe Integration Guide](https://stripe.com/docs/payments/checkout)

---

## ✅ Deployment Checklist

Use this checklist to ensure everything is ready:

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] `NEXT_PUBLIC_APP_URL` updated
- [ ] Supabase redirect URLs updated
- [ ] Stripe webhooks configured (if using Stripe)
- [ ] Test all critical user flows
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)

---

**Need help?** Check the project documentation in `README.md` and `SETUP_GUIDE.md`.

Built with ❤️ using Next.js and Vercel
