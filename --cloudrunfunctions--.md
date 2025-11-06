# -------------------  CLOUD FUNCTION    ----------------- 
 
##### Create a function : Cloud Run Functions: Qwik Start - Console

1. craete a function
2. services -> cloud run ->
3. deploy the function
4. Still in the Create function dialog, in Source code for Inline editor use the default helloHttp function implementation already provided for index.js.
5. Click SAVE and REDEPLOY to deploy the function.
6. test the function
7. On the function details dashboard, to test the function click TEST.
8. In the Triggering event field, enter the following text between the brackets {} .
`"message":"Hello World!"`
9. Copy the CLI test command and run it in the Cloud Shell.

View logs from the service details page.

On the Service Details page, click Observability and select Logs.

Example of the log history that displays in Results:



   <img width="847" height="722" alt="image" src="https://github.com/user-attachments/assets/2d137c2a-a6d0-4d4a-9a75-c7b42383dfd0" />

   <img width="2146" height="260" alt="image" src="https://github.com/user-attachments/assets/4eee1304-313c-4eec-8af8-49022763b737" />
   <img width="2146" height="260" alt="image" src="https://github.com/user-attachments/assets/e23379ac-04d3-4641-a8ac-46885d7ac41c" />

-------------------
## Cloud Run Functions: Qwik Start - Command Line

```
gcloud config set run/region us-east1
mkdir gcf_hello_world && cd $_
nano index.js
```
>> index.js
```
const functions = require('@google-cloud/functions-framework');

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('helloPubSub', cloudEvent => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const base64name = cloudEvent.data.message.data;

  const name = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';

  console.log(`Hello, ${name}!`);
});
```

>> package.json

```
{
  "name": "gcf_hello_world",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  }
}
```

`npm install`

#### Task 2. Deploy your function

- Deploy the nodejs-pubsub-function function to a pub/sub topic named cf-demo

```
gcloud functions deploy nodejs-pubsub-function \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-east1 \
  --source=. \
  --entry-point=helloPubSub \
  --trigger-topic cf-demo \
  --stage-bucket qwiklabs-gcp-00-0059c431cf39-bucket \
  --service-account cloudfunctionsa@qwiklabs-gcp-00-0059c431cf39.iam.gserviceaccount.com \
  --allow-unauthenticated
```

```
gcloud functions describe nodejs-pubsub-function \
  --region=us-east1
```

#### task3 : test the function 

```
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
```

> view logs :

`
gcloud functions logs read nodejs-pubsub-function \
  --region=us-east1 
`

-------------------------------------------
--------------------------------------------------

## Build a Serverless App with Cloud Run that Creates PDF Files : 


01:30:00
Lab instructions and tasks
GSP644
Overview
Objectives
Setup and requirements
Task 1. Understanding the task
Task 2. Enable the Cloud Run API
Task 3. Deploy a simple Cloud Run service
Task 4. Trigger your Cloud Run service when a new file is uploaded
Task 5. See if the Cloud Run service is triggered when files are uploaded to Cloud Storage
Task 6. Containers
Task 7. Testing the pdf-conversion service


--------

Pet theory would like to convert their invoices into PDFs so that customers can open them reliably. The team wants to accomplish this conversion automatically to minimize the workload for Lisa, the office manager.

Ruby, Pet Theory's computer consultant, gets a message from Patrick in IT...

<img width="763" height="731" alt="image" src="https://github.com/user-attachments/assets/935a51fd-1540-4f16-96a2-3bb9724597d8" />

<img width="830" height="605" alt="image" src="https://github.com/user-attachments/assets/7228b244-e6be-4a3b-a244-9e3b6e0b8bd6" />


### Task 3. Deploy a simple Cloud Run service

```
git clone https://github.com/rosera/pet-theory.git
cd pet-theory/lab03
```

>> Edit package.json with Cloud Shell Code Editor or your preferred text editor. In the "scripts" section, add "start": "node index.js", as shown below:

```
...

"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

...
```

```
npm install express
npm install body-parser
npm install child_process
npm install @google-cloud/storage
```

Now open the lab03/index.js file and review the code.
The application will be deployed as a Cloud Run service that accepts HTTP POSTs. If the POST request is a Pub/Sub notification about an uploaded file, the service writes the file details to the log. If not, the service simply returns the string "OK".

Review the file named lab03/Dockerfile.
The above file is called a manifest and provides a recipe for the Docker command to build an image. Each line begins with a command that tells Docker how to process the following information:

The first list indicates the base image should use node as the template for the image to be created.
The last line indicates the command to be performed, which in this instance refers to "npm start".
To build and deploy the REST API, use Google Cloud Build. Run this command to start the build process:

`gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/pdf-converter`

<img width="828" height="589" alt="image" src="https://github.com/user-attachments/assets/ed24efa2-beae-4e3e-8e43-28facb977108" />

```
gcloud run deploy pdf-converter \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/pdf-converter \
  --platform managed \
  --region Region \
  --no-allow-unauthenticated \
  --max-instances=1
```

```
SERVICE_URL=$(gcloud beta run services describe pdf-converter --platform managed --region Lab Region --format="value(status.url)")
echo $SERVICE_URL
curl -X POST $SERVICE_URL
curl -X POST -H "Authorization: Bearer $(gcloud auth print-identity-token)" $SERVICE_URL
gsutil mb gs://$GOOGLE_CLOUD_PROJECT-upload
gsutil mb gs://$GOOGLE_CLOUD_PROJECT-processed
gsutil notification create -t new-doc -f json -e OBJECT_FINALIZE gs://$GOOGLE_CLOUD_PROJECT-upload
```

- Then create a new service account which Pub/Sub will use to trigger the Cloud Run services:

```
gcloud iam service-accounts create pubsub-cloud-run-invoker --display-name "PubSub Cloud Run Invoker"
```

- Give the new service account permission to invoke the PDF converter service:
```
gcloud beta run services add-iam-policy-binding pdf-converter --member=serviceAccount:pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com --role=roles/run.invoker --platform managed --region Lab Region
```

`gcloud projects list`

`PROJECT_NUMBER=[project number]`

- Then enable your project to create Cloud Pub/Sub authentication tokens:
```
gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT --member=serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator
```

- Finally, create a Pub/Sub subscription so that the PDF converter can run whenever a message is published on the topic "new-doc".
```
gcloud beta pubsub subscriptions create pdf-conv-sub --topic new-doc --push-endpoint=$SERVICE_URL --push-auth-service-account=pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com
```


#### Task 5. See if the Cloud Run service is triggered when files are uploaded to Cloud Storage
- Copy some test files into your upload bucket:
`gsutil -m cp gs://spls/gsp644/* gs://$GOOGLE_CLOUD_PROJECT-upload`

### check this url for this lab 
##### https://www.skills.google/games/6875/labs/42699

#### https://github.com/Gaston-MaikMax/arcade/blob/main/GSP644/Build%20a%20Serverless%20App%20with%20Cloud%20Run%20that%20Creates%20PDF%20Files.md
------







---------












--------------





















------------



--------- # FLUTTER --------------





-------------------------------------------
--------------------------------------------------------
----------------------------------------------------------------


ques: How will you make a new Google Cloud Function accessible via a public URL?
- http trigger

ques: In the Google Cloud console, where will you find the logs generated by your Cloud Function?
- cloud logging

ques: Which gcloud command group is used to deploy Cloud Functions?
- gcloud functions deploy

ques: How will you specify the geographic location for your Google Cloud Function deployment from the command line?
- --region

ques : Which Google Cloud service is used to build and deploy containerized applications without managing the underlying infrastructure?
- cloud run 

ques: Which command do you use in Cloud Shell to deploy a container to Cloud Run?
- gcloud run deploy


ques: Cloud Run functions is a serverless execution environment for event driven services on Google Cloud.
- true

ques: Which type of trigger is used while creating Cloud Run functions in the lab?
HTTPS


-------------------------------------
--------------------------------------------

ques: In Google Cloud, how will you update the permissions within an existing custom role using a YAML file?
- gcloud iam roles update

ques: In Google Cloud, how will you grant a user a specific set of permissions not available in predefined roles?
- custom role

ques: From the command line, how will you launch your Flutter application on a connected device or simulator?
- flutter run

ques: Which command is used to create a new Flutter project from the command line?
- flutter create

ques: In a multi-screen Flutter app, how will you programmatically move from the first screen to the second?
- navigator.push

ques : How will you display a scrollable list of items that can be of varying lengths in your Flutter application?
- listView

-------------------------------------------
-------------------------------------

ques: In Google Cloud Monitoring, how will you organize a set of related resources, such as all your web server instances, to monitor them as a single unit?
- group

ques: In Google Cloud Monitoring, how will you get an automatic email when a VM's CPU usage is too high?
- alerting group

ques: In your Google Cloud VPC, how will you apply a firewall rule to a specific group of VMs?
- network tag

ques: Which command is used to apply a firewall rule in Google Cloud?
- gcloud compute firewall-rules create

ques: Which Google Cloud component allows nodes in a private cluster to access public repositories for pulling container images?
- cloud NAT 

ques: How will you allow your local machine's IP address to connect to a private Google Cloud GKE cluster's control plane?
- Authorized networks
  

----------------------------------------
-----------------------------

ques: Which Google Cloud service lets you view metrics, logs, and uptime checks across multiple projects?
- cloud monitoring

ques: To give another user permission to view dashboards in Cloud Monitoring, you assign them which role?
- monitoring viewer

ques: In Google Cloud, how will you create a new GKE cluster from your command line?
- gcloud container clusters create

ques: In your Google Cloud GKE cluster, how will you list all the running pods in the default namespace?
- kubectl get pods

ques : How will you interact with Google Cloud Storage from your command line?
- gsutil
  
ques :How will you create a new Google Cloud Storage bucket from your terminal?
- gsutil mb

 
-----------------------------------------------------
---------------------------------------------------------






  
