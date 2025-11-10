1. see cluster status  
`gcloud container clusters list`

2. You can also monitor the progress in the Cloud console by navigating to Navigation menu > Kubernetes Engine > Clusters.

- Once your cluster has a RUNNING status, run the following command to get the cluster credentials:
`gcloud container clusters get-credentials central --zone us-central1-c`

3. Run the following command to verify that the nodes have been created:
`kubectl get nodes`

4. In Cloud Shell, enable the Gemini for Google Cloud API with the following command:
`gcloud services enable cloudaicompanion.googleapis.com`

## Task 2. Deploy an application

`git clone https://github.com/xiangshen-dk/microservices-demo.git`

`cd microservices-demo`

In the Cloud Shell Editor's file Explorer, navigate to microservices-demo > release > kubernetes-manifests.yaml.
You can use the AI-powered features of Gemini Code Assist to make changes to your code directly in your code editor. In this instance, you decide to let Gemini Code Assist help explain the kubernetes-manifests.yaml file to support the onboarding of a new member in your team.

Open the kubernetes-manifests.yaml file. This action enables Gemini Code Assist, as indicated by the presence of the Gemini Code Assist: Smart Actions icon in the upper-right corner of the editor.

Click the Gemini Code Assist: Smart Actions Gemini Code Assist: Smart Actions icon and select Explain this.

Gemini Code Assist opens a chat pane with the prefilled prompt of Explain this. In the inline text box of the Code Assist chat, replace the prefilled prompt with the following, and click Send:

```
As a Kubernetes Architect at Cymbal AI, provide a formal and comprehensive explanation of the kubernetes-manifests.yaml file for new team member onboarding.

Your explanation should:

* Detail the key components used in the configuration file
* Describe key Services and their functions
* Describe the common configuration elements
* Describe what the configuration deploys

For the suggested improvements, don't update this file.
```

6. Run the following command to install the app using kubectl:
`kubectl get pods`

7. Run the following command to get the external IP of the application. This command only returns an IP address once the service has been deployed, so you may need to repeat the command until there's an external IP address assigned:
`export EXTERNAL_IP=$(kubectl get service frontend-external | awk 'BEGIN { cnt=0; } { cnt+=1; if (cnt > 1) print $4; }')`

8. Finally, execute the following command to confirm that the app is up and running:
`curl -o /dev/null -s -w "%{http_code}\n"  http://$EXTERNAL_IP`


In the Kubernetes Engine > Workloads page, you'll see that all of the pods are OK.

<img width="1836" height="1082" alt="image" src="https://github.com/user-attachments/assets/ba518000-15f2-4e77-8a7b-5d7bfe1dcec5" />

Now, select Gateways, Services & Ingress, and then click on the Services tab to verify all services are OK. Stay on this screen to set up monitoring for the application.

### Task 3. Open the application

Scroll down to frontend-external and click the Endpoints IP of the service.

<img width="2118" height="1096" alt="image" src="https://github.com/user-attachments/assets/9c080b65-fe41-4dcf-bf10-72271b7fd23a" />
