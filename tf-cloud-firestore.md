# Terraform code: Terraform Essentials: Cloud Firestore Database

####  main.tf

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


#### variables.tf


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


#### outputs.tf

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

----------------------------------------------------------------------------------
---------------------------------------------------------------------------------

# Terraform Essentials: Google Compute Engine Instance


-Create a Cloud Storage bucket. The bucket name must be globally unique and should include your project ID as a prefix.
`gsutil mb -l "REGION" gs://"PROJECT_ID"-tf-state`

- Enable versioning on the bucket. This allows you to revert to previous states if necessary.
`gsutil versioning set on gs://"PROJECT_ID"-tf-state`

#### main.tf
```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = ""PROJECT_ID"-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_compute_instance" "default" {
  name         = "terraform-instance"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    subnetwork = "default"

    access_config {
    }
  }
}
```

#### variables.tf
```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = ""PROJECT_ID"-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_compute_instance" "default" {
  name         = "terraform-instance"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    subnetwork = "default"

    access_config {
    }
  }
}
```



----------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
# Google Cloud Storage Bucket

`gcloud storage buckets create gs://qwiklabs-gcp-04-d47df9b05b49-tf-state --project=qwiklabs-gcp-04-d47df9b05b49 --location=us-central1 --uniform-bucket-level-access`

`gsutil versioning set on gs://qwiklabs-gcp-04-d47df9b05b49-tf-state`

`mkdir terraform-gcs && cd $_`


#### main.tf
```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }

  backend "gcs" {
    bucket = "qwiklabs-gcp-04-d47df9b05b49-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "qwiklabs-gcp-04-d47df9b05b49"
  region  = "us-central1"
}

resource "google_storage_bucket" "default" {
  name          = "qwiklabs-gcp-04-d47df9b05b49-my-terraform-bucket"
  location      = "us-central1"
  force_destroy = true

  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}
```

-------------------------------------------------------------------------------
------------------------------------------------------------------------------

# Terraform Essentials: Google Cloud Storage Bucket

`gcloud storage buckets create gs://qwiklabs-gcp-01-8b5a4e9efa4a-tf-state --project=qwiklabs-gcp-01-8b5a4e9efa4a --location=us-central1 --uniform-bucket-level-access`

`gsutil versioning set on gs://qwiklabs-gcp-01-8b5a4e9efa4a-tf-state`

`mkdir terraform-gcs && cd $_`

#### main.tf

```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }

  backend "gcs" {
    bucket = "qwiklabs-gcp-01-8b5a4e9efa4a-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "qwiklabs-gcp-01-8b5a4e9efa4a"
  region  = "us-central1"
}

resource "google_storage_bucket" "default" {
  name          = "qwiklabs-gcp-01-8b5a4e9efa4a-my-terraform-bucket"
  location      = "us-central1"
  force_destroy = true

  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}
```

`terraform plan`

-Enter the following command to validate the bucket has been created:


`gsutil ls gs://qwiklabs-gcp-01-8b5a4e9efa4a-my-terraform-bucket`


--------------------------------------------------------------------------
----------------------------------------------------------------------
# service-account :
`gcloud config set project qwiklabs-gcp-01-9f519b8b44fd`
`gcloud config set compute/region us-central1`
`gcloud config set compute/zone us-central1-f`
`gcloud services enable iam.googleapis.com`

- Create a Cloud Storage bucket. Ensure the bucket name is globally unique and prefixed with your project ID: qwiklabs-gcp-01-9f519b8b44fd
`gcloud storage buckets create gs://qwiklabs-gcp-01-9f519b8b44fd-tf-state --project=qwiklabs-gcp-01-9f519b8b44fd --location=us-central1 --uniform-bucket-level-access`

-Enable versioning on the GCS bucket:
`gsutil versioning set on gs://qwiklabs-gcp-01-9f519b8b44fd-tf-state`

- create a tf configuration file :
`mkdir terraform-service-account && cd $_`

#### main.tf
```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = "qwiklabs-gcp-01-9f519b8b44fd-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region 
}

resource "google_service_account" "default" {
  account_id   = "terraform-sa"
  display_name = "Terraform Service Account"
}
```

#### variables.tf 

```
variable "project_id" {
  type = string
  description = "The GCP project ID"
  default = "qwiklabs-gcp-01-9f519b8b44fd"
}

variable "region" {
  type = string
  description = "The GCP region"
  default = "us-central1"
}
```

- after terraform apply --auto-approve
- Verify that the service account has been created in the Google Cloud Console or using the gcloud CLI.

`gcloud iam service-accounts list --project=qwiklabs-gcp-01-9f519b8b44fd`


---------------------------------------------------------------------------------
---------------------------------------------------------------------------------

# Terraform Essentials: Firewall Policy

#### firewall.tf
```
resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh-from-anywhere"
  network = "default"
  project = "qwiklabs-gcp-02-75d8482bc286"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["ssh-allowed"]
}
```

#### variables.tf
```
variable "project_id" {
  type = string
  default = "qwiklabs-gcp-02-75d8482bc286"
}

variable "bucket_name" {
  type = string
  default = "qwiklabs-gcp-02-75d8482bc286-tf-state"
}

variable "region" {
  type = string
  default = "us-west1"
}
```

#### outputs.tf
```
output "firewall_name" {
  value = google_compute_firewall.allow_ssh.name
}
```



`gcloud config set project qwiklabs-gcp-01-8b5a4e9efa4a`

`gcloud config set compute/region us-central1`

`terraform init`

`terraform plan `

`trraform apply --auto-approve`

`terraform destroy --auto-approve`
