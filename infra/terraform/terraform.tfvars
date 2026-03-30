aws_region   = "us-east-2"
project_name = "syndicate-lane"
image_tag    = "latest"

container_environment = {
  NODE_ENV = "production"
  HOSTNAME = "0.0.0.0"
  PORT     = "3000"
}

container_secrets = {}
