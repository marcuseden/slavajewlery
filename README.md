# Slava Jewelry Studio

A production-ready, AI-powered custom jewelry design platform. Users design one-of-a-kind pieces through an intuitive wizard, AI generates manufacturable specs and photorealistic images, and master jewelers in NYC handcraft each piece.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (dark mode first)
- **Database**: Supabase (Postgres + Auth + Storage + RLS)
- **AI**: OpenAI GPT-4o + DALL·E 3
- **Payments**: Stripe
- **State**: TanStack Query (React Query)
- **Validation**: Zod + React Hook Form

## Project Structure

```
slava-jewelry-studio/
├── app/
│   ├── design/              # Design wizard
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Jeweler admin panel
│   ├── api/
│   │   ├── design/generate/ # AI generation endpoint
│   │   └── webhooks/stripe/ # Stripe webhooks
│   ├── layout.tsx
│   ├── page.tsx             # Landing page
│   └── globals.css
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── design-wizard/       # Design wizard components
│   └── admin/               # Admin components
├── lib/
│   ├── supabase.ts          # Supabase client utils
│   └── utils.ts             # cn() utility
├── ai/                      # AI pipeline modules
├── types/
│   └── database.ts          # Supabase types
├── hooks/                   # Custom React hooks
└── supabase/
    └── migrations/          # Database migrations
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

#### Create a new Supabase project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning

#### Run the migration
1. Copy the SQL from `supabase/migrations/001_initial_schema.sql`
2. Go to Supabase Dashboard → SQL Editor
3. Paste and run the SQL

#### Create storage bucket
In Supabase Dashboard → Storage:
1. Create a new bucket named `design-images`
2. Set it to **public**
3. Add policy to allow authenticated uploads

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the values from your Supabase project settings and API keys.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Next Steps

**Ready for Design Wizard Step 1?**

The foundation is complete:
- ✅ Next.js 15 + TypeScript + Tailwind CSS v4
- ✅ Dark mode configured
- ✅ Supabase client utilities
- ✅ Database schema + types
- ✅ Landing page with navigation
- ✅ Button component (shadcn/ui)

## License

Proprietary - © 2024 Slava Jewelry Studio
