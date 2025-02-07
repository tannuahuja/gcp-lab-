
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

# Show pods
`kubectl get pods`

# Show deployments
`kubectl get deployments`

# Show replica sets
`kubectl get rs`

#You can also combine them
`kubectl get pods,deployments`

`kubectl get all`

## Task 5. Expose GKE deployment

`kubectl expose deployment monolith --type=LoadBalancer --port 80 --target-port 8080`

`kubectl get service`

## Task 6. Scale GKE deployment

`kubectl scale deployment monolith --replicas=3`

`kubectl get all`

## Task 7. Make changes to the website

Run the following commands copy the updated file to the correct file name:

`cd ~/monolith-to-microservices/react-app/src/pages/Home
mv index.js.new index.js`

`cat ~/monolith-to-microservices/react-app/src/pages/Home/index.js`

Run the following command to build the React app and copy it into the monolith public directory:

`cd ~/monolith-to-microservices/react-app
npm run build:monolith`

Run the following command to trigger a new cloud build with an updated image version of 2.0.0:

`cd ~/monolith-to-microservices/monolith`

`gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0 .`

## gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0 .

Tell Kubernetes that you want to update the image for your deployment to a new version with the following command:

`kubectl set image deployment/monolith monolith=gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0`

`kubectl get pods`

Test the application by running the following command to start the web server:

`npm start`

Task 9. Cleanup

Delete git repo 

`cd ~
rm -rf monolith-to-microservices`

Delete Artifact Registry images:

# Delete the container image for version 1.0.0 of the monolith
`gcloud container images delete gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:1.0.0 --quiet`

# Delete the container image for version 2.0.0 of the monolith
`gcloud container images delete gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0 --quiet`

Delete Google Cloud Build artifacts from Google Cloud Storage:

# The following command will take all source archives from all builds and delete them from cloud storage

# Run this command to print all sources:
# gcloud builds list | awk 'NR > 1 {print $4}'

`gcloud builds list | grep 'SOURCE' | cut -d ' ' -f2 | while read line; do gsutil rm $line; done`

Delete GKE service

`kubectl delete service monolith
kubectl delete deployment monolith`



### link for this lab :
https://www.cloudskillsboost.google/games/5890/labs/37473

Delete GKE cluster

`gcloud container clusters delete fancy-cluster lab region`
