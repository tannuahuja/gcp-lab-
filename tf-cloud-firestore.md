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

> Navigate to **VPC network > Firewall** in the Google Cloud Console and verify the existence of the `allow-ssh-from-anywhere` firewall rule.
-----------------------------------------------------------------
--------------------------------------------------------------

# terraform essentials : VPC and subnet 

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
    bucket = "qwiklabs-gcp-00-80aa73212cd9-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "qwiklabs-gcp-00-80aa73212cd9"
  region  = "us-west1"
}

resource "google_compute_network" "vpc_network" {
  name                    = "custom-vpc-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet_us" {
  name            = "subnet-us"
  ip_cidr_range   = "10.10.1.0/24"
  region          = "us-west1"
  network         = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "allow_icmp" {
  name    = "allow-icmp"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "icmp"
  }
  source_ranges = ["0.0.0.0/0"]
}
```


#### variables.tf
```
variable "project_id" {
  type        = string
  description = "The ID of the Google Cloud project"
  default     = "qwiklabs-gcp-00-80aa73212cd9"
}

variable "region" {
  type        = string
  description = "The region to deploy resources in"
  default     = "us-west1"
}
```

#### outputs.tf
```
output "network_name" {
  value       = google_compute_network.vpc_network.name
  description = "The name of the VPC network"
}

output "subnet_name" {
  value       = google_compute_subnetwork.subnet_us.name
  description = "The name of the subnetwork"
}
```
-----------------------------------------------------------------------
--------------------------------------------------------------------

# Developer Essentials: Application Development with Secret Manager

>  Create a Secret in Secret Manager
`gcloud secrets create arcade-secret --replication-policy=automatic`
> Add a secret version with your sensitive data.

`echo -n "t0ps3cr3t!" | gcloud secrets versions add arcade-secret --data-file=-`

>Task 3. Python Application to to interact with Secret Manager
#### app.py
```
import os
from flask import Flask, jsonify, request
from google.cloud import secretmanager
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize Secret Manager client
# The client will automatically use the service account credentials of the Cloud Run service
secret_manager_client = secretmanager.SecretManagerServiceClient()

# Hardcoded Project ID and Secret ID as per your request
PROJECT_ID = "qwiklabs-gcp-03-66c714e3463e" # Project ID
SECRET_ID = "arcade-secret"   # Secret Identifier

@app.route('/')
def get_secret():
    """
    Retrieves the specified secret from Secret Manager and returns its payload.
    The SECRET_ID and PROJECT_ID are now hardcoded in the application.
    """
    if not SECRET_ID or not PROJECT_ID:
        logging.error("SECRET_ID or PROJECT_ID not configured (should be hardcoded).")
        return jsonify({"error": "Secret ID or Project ID not configured."}), 500

    secret_version_name = f"projects/{PROJECT_ID}/secrets/{SECRET_ID}/versions/latest"

    try:
        logging.info(f"Accessing secret: {secret_version_name}")
        # Access the secret version
        response = secret_manager_client.access_secret_version(request={"name": secret_version_name})
        secret_payload = response.payload.data.decode("UTF-8")

        # IMPORTANT: In a real application, you would process or use the secret
        # here, not return it directly in an HTTP response, especially if the
        # secret is sensitive. This example is for demonstration purposes only.
        return jsonify({"secret_id": SECRET_ID, "secret_value": secret_payload})

    except Exception as e:
        logging.error(f"Failed to retrieve secret '{SECRET_ID}': {e}")
        return jsonify({"error": f"Failed to retrieve secret: {str(e)}"}), 500

if __name__ == '__main__':
    # When running locally, Flask will use the hardcoded values directly.
    # In Cloud Run, these values are used without needing environment variables.
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
```

#### requirements.txt
```
Flask==3.*
google-cloud-secret-manager==2.*
```

#### Dockerfile

```
FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "app.py"]
```

>Initialize Artifact Registry as a Docker registry.

`gcloud artifacts repositories create arcade-images --repository-format=docker --location=us-central1 --description="Docker repository"`

> build the docker image
`docker build -t us-central1-docker.pkg.dev/qwiklabs-gcp-03-66c714e3463e/arcade-images/arcade-secret:latest .`

> test the conatiner image
`docker run --rm -p 8080:8080 us-central1-docker.pkg.dev/qwiklabs-gcp-03-66c714e3463e/arcade-images/arcade-secret:latest`

> push container image to artifact registry
`docker push us-central1-docker.pkg.dev/qwiklabs-gcp-03-66c714e3463e/arcade-images/arcade-secret:latest`

>Create a Service Account for Secret Manager application.
```
gcloud iam service-accounts create arcade-service \
  --display-name="Arcade Service Account" \
  --description="Service account for Cloud Run application"
```

> Grant the Cloud Run service account access to the Secret Manager secret.
```
gcloud secrets add-iam-policy-binding arcade-secret \
--member="serviceAccount:arcade-service@qwiklabs-gcp-03-66c714e3463e.iam.gserviceaccount.com" \
--role="roles/secretmanager.secretAccessor"
```

>Deploy the application to Cloud Run.
```
gcloud run deploy arcade-service \
  --image=us-central1-docker.pkg.dev/qwiklabs-gcp-03-66c714e3463e/arcade-images/arcade-secret:latest \
  --region=us-central1 \
  --set-secrets SECRET_ENV_VAR=arcade-secret:latest \
  --service-account arcade-service@qwiklabs-gcp-03-66c714e3463e.iam.gserviceaccount.com \
  --allow-unauthenticated
```

>Get the URL of your deployed Cloud Run service.


```
gcloud run deploy arcade-service \
  --image=us-central1-docker.pkg.dev/qwiklabs-gcp-03-66c714e3463e/arcade-images/arcade-secret:latest \
  --region=us-central1 \
  --set-secrets SECRET_ENV_VAR=arcade-secret:latest \
  --service-account arcade-service@qwiklabs-gcp-03-66c714e3463e.iam.gserviceaccount.com \
  --allow-unauthenticated
```
> Access the URL in your browser or using curl and verify that the application can access the secret.

```
curl $(gcloud run services describe arcade-service --region=us-central1 --format='value(status.url)') | jq
```



####

`gcloud config set project qwiklabs-gcp-01-8b5a4e9efa4a`

`gcloud config set compute/region us-central1`

`terraform init`

`terraform plan `

`trraform apply --auto-approve`

`terraform destroy --auto-approve`
