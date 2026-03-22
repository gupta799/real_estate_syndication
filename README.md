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

## Testing

1. Install the Playwright browser once:

```bash
npx playwright install chromium
```

2. Run smoke tests:

```bash
npm run test:e2e
```

The smoke suite covers the simplified MVP paths:

- home page messaging
- listings browse flow
- listing access request form
- sponsor submission flow
- admin moderation view

## Current MVP surface

- Public listing marketplace with filters
- Listing detail page with trust signals and inquiry form
- Sponsor listing submission flow
- Admin review queue for listings and inquiries
- Supabase schema starter at `supabase/schema.sql`

## Simplified release scope

- Investor experience: browse listings and request access
- Sponsor experience: submit listings and view moderation state
- Admin experience: review pending listings and recent inquiries
- Deferred: payments, subscriptions, commitments, full CRM, analytics, and complex investor dashboards

## Notes

- Without Supabase env vars, the app runs in demo mode using local mock data.
- Auth actions currently route into demo dashboards; connect them to Supabase Auth for production login/signup.
- Codex Playwright MCP was added to `~/.codex/config.toml` as `mcp_servers.playwright`.
