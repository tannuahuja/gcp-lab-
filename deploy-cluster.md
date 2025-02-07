
Deploy, Scale, and Update Your Website on Google Kubernetes Engine

 
### TASKS

 ## Task 1. Create a GKE cluster
  `gcloud container clusters create fancy-cluster --num-nodes 3`

`gcloud compute instances list`

## Task 2. Clone source repository

`git clone https://github.com/googlecodelabs/monolith-to-microservices.git`

`cd ~/monolith-to-microservices`
`./setup.sh`

`nvm install --lts`

`cd ~/monolith-to-microservices/monolith`

`npm start`

## Task 3. Create Docker container with Cloud Build

