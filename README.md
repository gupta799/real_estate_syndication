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

## Deployment

This app can deploy cleanly to AWS.

- Recommended AWS path: Amplify Hosting for the first release
- Why: it supports Next.js 15 SSR apps and connects directly to GitHub branches for deployment
- CI in this repo: GitHub Actions workflow at `.github/workflows/ci.yml`
- CD path: connect the GitHub repo to AWS Amplify and let branch pushes deploy automatically

### Required environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### AWS rollout

1. Create an Amplify app and connect `gupta799/real_estate_syndication`
2. Point Amplify at the `main` branch
3. Add the two Supabase environment variables in Amplify
4. Let Amplify build with `amplify.yml`
5. Attach a custom domain when the branch deploy is healthy

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
- Deferred: payments, subscriptions, commitments, full CRM, analytics, and investor-facing account complexity

## Notes

- Without Supabase env vars, the app runs in demo mode using local mock data.
- Auth actions currently route into demo dashboards; connect them to Supabase Auth for production login/signup.
- Codex Playwright MCP was added to `~/.codex/config.toml` as `mcp_servers.playwright`.
