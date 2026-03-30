# Syndicate Lane

Simple directory MVP for comparing syndication sponsors through historical track records without publicly displaying live deals.

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
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
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
- sponsor profile browse flow
- sponsor intro request form
- sponsor profile submission flow
- admin moderation view

## Deployment

This app now supports two AWS paths:

- Amplify Hosting if you want the fastest managed web deploy
- ECS Fargate if you want a managed container deployment

Recommended for this repo: Terraform-managed ECS Fargate.

### Required environment variables

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

If you leave both variables empty, the app runs in demo mode.

### Option 1: Amplify Hosting

1. Create an Amplify app and connect the repository.
2. Point Amplify at the branch you want to deploy.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Amplify if you want live mode.
4. Let Amplify build with `amplify.yml`.
5. Attach a custom domain after the deployment is healthy.

### Option 2: Terraform-managed ECS Fargate deploy

The repo includes:

- `Dockerfile` for a production Next.js container
- `.dockerignore` to keep the image build small
- `infra/terraform` for infrastructure as code

1. Copy the Terraform variables file:

```bash
cp infra/terraform/terraform.tfvars.example infra/terraform/terraform.tfvars
```

2. Edit `infra/terraform/terraform.tfvars`.

For demo mode, you can leave `container_secrets` empty.
For live mode, put Supabase values in SSM Parameter Store or Secrets Manager and reference their ARNs.

3. Create the infrastructure:

cd infra/terraform
terraform init
terraform apply
```

4. Get the ECR repository URL from Terraform output and push the image:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <ecr-repository-url-prefix>
docker build -t syndicate-lane .
docker tag syndicate-lane:latest <ecr-repository-url>:latest
docker push <ecr-repository-url>:latest
```

5. Force a fresh ECS deployment:

```bash
aws ecs update-service \
  --cluster <ecs-cluster-name> \
  --service <ecs-service-name> \
  --force-new-deployment
```

Notes:

- The container listens on port `3000`.
- The current app can run entirely in demo mode with no Supabase values.
- Runtime secrets should live in AWS SSM Parameter Store or AWS Secrets Manager, not in GitHub.
- If you later add CI/CD, use GitHub OIDC to assume an AWS role instead of storing AWS keys in GitHub.

## Current MVP surface

- Public sponsor directory with filters
- Profile detail page with historical performance and intro request form
- Sponsor track record submission flow
- Admin review queue for profiles and intro requests
- Supabase schema starter at `supabase/schema.sql`

## Simplified release scope

- Investor experience: browse sponsor profiles and request introductions
- Sponsor experience: upload a sponsor track record PDF publicly and view mocked parsed output
- Admin experience: review pending profiles and recent intro requests
- Deferred: payments, subscriptions, commitments, full CRM, analytics, and investor-facing account complexity

## Notes

- Without Supabase env vars, the app runs in demo mode using local mock data.
- Auth actions currently route into demo dashboards; connect them to Supabase Auth for production login/signup.
- Codex Playwright MCP was added to `~/.codex/config.toml` as `mcp_servers.playwright`.
