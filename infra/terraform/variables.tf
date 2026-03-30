variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Base name used for AWS resources."
  type        = string
  default     = "syndicate-lane"
}

variable "container_port" {
  description = "Port exposed by the Next.js container."
  type        = number
  default     = 3000
}

variable "desired_count" {
  description = "Number of ECS tasks to run."
  type        = number
  default     = 1
}

variable "cpu" {
  description = "Fargate task CPU units."
  type        = number
  default     = 512
}

variable "memory" {
  description = "Fargate task memory in MiB."
  type        = number
  default     = 1024
}

variable "image_tag" {
  description = "Container image tag to deploy from ECR."
  type        = string
  default     = "latest"
}

variable "health_check_path" {
  description = "ALB health check path."
  type        = string
  default     = "/"
}

variable "allowed_ingress_cidrs" {
  description = "CIDR blocks allowed to reach the ALB."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "container_environment" {
  description = "Plain environment variables injected into the ECS task."
  type        = map(string)
  default = {
    NODE_ENV = "production"
    HOSTNAME = "0.0.0.0"
    PORT     = "3000"
  }
}

variable "container_secrets" {
  description = "Secret values injected into the ECS task. Keys are env var names and values are SSM/Secrets Manager ARNs."
  type        = map(string)
  default     = {}
}

variable "tags" {
  description = "Additional tags to apply to AWS resources."
  type        = map(string)
  default     = {}
}
