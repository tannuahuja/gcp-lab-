// terraform code: Terraform Essentials: Cloud Firestore Database

##  main.tf

```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = "qwiklabs-gcp-03-2cd55ab7ad05-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "qwiklabs-gcp-03-2cd55ab7ad05"
  region  = "us-central1"
}

resource "google_firestore_database" "default" {
  name     = "default"
  project  = "qwiklabs-gcp-03-2cd55ab7ad05"
  location_id = "nam5"
  type     = "FIRESTORE_NATIVE"
}

output "firestore_database_name" {
  value       = google_firestore_database.default.name
  description = "The name of the Cloud Firestore database."
}
```


## variables.tf


```
variable "project_id" {
  type        = string
  description = "The ID of the Google Cloud project."
  default     = "qwiklabs-gcp-03-2cd55ab7ad05"
}

variable "bucket_name" {
  type        = string
  description = "Bucket name for terraform state"
  default     = "qwiklabs-gcp-03-2cd55ab7ad05-tf-state"
}
```


### outputs.tf

```
output "project_id" {
  value       = var.project_id
  description = "The ID of the Google Cloud project."
}

output "bucket_name" {
  value       = var.bucket_name
  description = "The name of the bucket to store terraform state."
}
```

`terraform init`

`terraform plan `

`trraform apply`

`terraform destroy`
