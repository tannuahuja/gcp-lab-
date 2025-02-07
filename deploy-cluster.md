
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

`gcloud services enable cloudbuild.googleapis.com`

`cd ~/monolith-to-microservices/monolith`

`gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:1.0.0 .`

To view your build history or watch the process in real time by clicking the Navigation menu and scrolling down to CI/CD section, then click Cloud Build > History. Here you can see a list of all your previous builds.

Optional: From the Build details page, click on the Build summary > Execution details > Image name in the build information section to see the container image:

## Task 4. Deploy container to GKE

`kubectl create deployment monolith --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:1.0.0`

`kubectl get all`

Optional: You can run commands to your deployments separately as well:

`# Show pods
kubectl get pods

# Show deployments
kubectl get deployments

# Show replica sets
kubectl get rs

#You can also combine them
kubectl get pods,deployments`

