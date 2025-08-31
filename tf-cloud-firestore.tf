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
`



``
