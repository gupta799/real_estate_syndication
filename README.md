# Syndicate Lane

Simple Zillow-style marketplace MVP for multifamily real estate syndication deals.

## Stack

- Next.js App Router
- TypeScript
- Supabase Auth / Database / Storage
- Demo fallback data when Supabase env vars are not present

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3. Run the app:

```bash
npm run dev
```

## Current MVP surface

- Public listing marketplace with filters
- Listing detail page with trust signals and inquiry form
- Investor, sponsor, and admin dashboards
- Sponsor listing submission flow
- Manual moderation-oriented admin view
- Supabase schema starter at `supabase/schema.sql`

## Notes

- Without Supabase env vars, the app runs in demo mode using local mock data.
- Auth actions currently route into demo dashboards; connect them to Supabase Auth for production login/signup.
