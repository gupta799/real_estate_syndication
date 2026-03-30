# Terraform AWS Deployment

This stack creates a simple AWS deployment for the app:

- ECR repository
- VPC with two public subnets
- Application Load Balancer
- ECS cluster and Fargate service
- CloudWatch log group
- IAM roles for ECS task execution

## Why this shape

This keeps the setup small and easy to manage for a demo or MVP deployment.
It avoids GitHub secrets by keeping runtime values in AWS Systems Manager Parameter Store
or AWS Secrets Manager and injecting them into the ECS task.

## Current app behavior

The current app can run in demo mode with no Supabase configuration.
For the current codebase, ECS runtime env vars are enough because server-side code now
reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` directly.

## Usage

1. Copy the example vars file:

```bash
cp infra/terraform/terraform.tfvars.example infra/terraform/terraform.tfvars
```

2. Edit `terraform.tfvars` as needed.

3. Optional for live mode: create SSM parameters or Secrets Manager secrets and place their
ARNs in `container_secrets`.

4. Initialize Terraform:

```bash
cd infra/terraform
terraform init
```

5. Review the plan:

```bash
terraform plan
```

6. Apply:

```bash
terraform apply
```

7. Build and push the app image to the ECR URL output by Terraform:

```bash
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <ecr-repository-url-prefix>
docker build -t syndicate-lane .
docker tag syndicate-lane:latest <ecr-repository-url>:latest
docker push <ecr-repository-url>:latest
```

8. Force a new ECS deployment so the service pulls the new image:

```bash
aws ecs update-service \
  --cluster <ecs-cluster-name> \
  --service <ecs-service-name> \
  --force-new-deployment
```

## No GitHub secrets

If you later add GitHub Actions, use GitHub OIDC to assume an AWS role instead of storing
AWS access keys in GitHub. That gives you CI/CD without long-lived GitHub secrets.
