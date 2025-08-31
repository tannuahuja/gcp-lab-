# Build an LLM and RAG-based Chat Application using AlloyDB and LangChain : 

One of the best tools for reducing Gen AI hallucinations is to use Retrieval Augmented Generation (RAG). RAG is the concept of retrieving some data or information, then augmenting your prompt used with your Large Language Model (LLM), which allows it to generate more accurate responses based on the data included in the prompt.

You'll also leverage the capabilities of AlloyDB AI, Google Cloud's database for AI-powered applications, and LangChain, a framework for developing applications, to connect the LLM to external data sources. By the end of this lab, you'll have a functional chat application that can intelligently answer questions by retrieving relevant information from your database.

<img width="1080" height="440" alt="image" src="https://github.com/user-attachments/assets/3bb96e6a-afaa-4e6e-80a0-a7f111e936f1" />


What you'll learn
- How LLMs process language and how RAG enhances their capabilities by retrieving relevant information from a knowledge base.
- Set up and interact with AlloyDB, a scalable and performant PostgreSQL database designed for demanding workloads.
- Explore LangChain's tools and components for building LLM-powered applications, including document loaders, prompt templates, and chains.
- Connect AlloyDB as a vector store with LangChain, allowing the chat application to access and retrieve relevant information for generating responses.
- Develop a user-friendly interface for interacting with the chat application, allowing users to ask questions and receive informative answers.

### Task 1. Initialize the Environment

#### Install Postgres client
- Install the PostgreSQL client software on the deployed VM

`gcloud compute ssh instance-1 --zone=ZONE`

`sudo apt-get update`
`sudo apt-get install --yes postgresql-client `

#### Connect to the Instance

`export PGPASSWORD=PG_PASSWORD`

```
export PROJECT_ID=$(gcloud config get-value project)
export REGION=REGION
export ADBCLUSTER=CLUSTER
export INSTANCE_IP=$(gcloud alloydb instances describe $ADBCLUSTER-pr --cluster=$ADBCLUSTER --region=$REGION --format="value(ipAddress)")
psql "host=$INSTANCE_IP user=postgres sslmode=require"
```

### Initilise the database 
- create the database
- in the VM execute :
  `psql "host=$INSTANCE_IP user=postgres" -c "CREATE DATABASE assistantdemo"  `

- Enable pgVector extension:
`psql "host=$INSTANCE_IP user=postgres dbname=assistantdemo" -c "CREATE EXTENSION vector"   `


### install the python

- execute in VM
```
sudo apt install -y python3.11-venv git
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

`python -V`

`git clone https://github.com/GoogleCloudPlatform/genai-databases-retrieval-app.git`

- prepare the configuration file :
```
cd genai-databases-retrieval-app/retrieval_service
cp example-config.yml config.yml
sed -i s/127.0.0.1/$INSTANCE_IP/g config.yml
sed -i s/my-password/$PGPASSWORD/g config.yml
sed -i s/my_database/assistantdemo/g config.yml
sed -i s/my-user/postgres/g config.yml
cat config.yml
```

```
pip install -r requirements.txt
python run_database_init.py
```

#### Task 5. Deploy the Retrieval Service to Cloud Run
```
export PROJECT_ID=$(gcloud config get-value project)
gcloud iam service-accounts create retrieval-identity
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:retrieval-identity@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
```

### Task 6. Deploy the Retrieval Service
```
cd ~/genai-databases-retrieval-app
gcloud alpha run deploy retrieval-service \
    --source=./retrieval_service/\
    --no-allow-unauthenticated \
    --service-account retrieval-identity \
    --region us-central1 \
    --network=default \
    --quiet
```

- verify the service
```
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" $(gcloud  run services list --filter="(retrieval-service)" --format="value(URL)")
```

### Task 7. Deploy sample application
- in the vm ssh execute :

```
cd ~/genai-databases-retrieval-app/llm_demo
pip install -r requirements.txt
```

`export BASE_URL=$(gcloud  run services list --filter="(retrieval-service)" --format="value(URL)")`

#### Prepare Client ID
<img width="1642" height="782" alt="image" src="https://github.com/user-attachments/assets/f47b9ca2-1545-4035-8ad2-91979417bc83" />

<img width="1660" height="1072" alt="image" src="https://github.com/user-attachments/assets/7936a547-6586-4658-933f-ebcf5f830fd7" />

<img width="1684" height="878" alt="image" src="https://github.com/user-attachments/assets/739a4550-b146-4e5c-a703-b23121480292" />


<img width="2032" height="570" alt="image" src="https://github.com/user-attachments/assets/6bf4cb60-6b2a-43c3-9dca-8ed4c5d3f825" />

<img width="1598" height="1688" alt="image" src="https://github.com/user-attachments/assets/fedc8671-fade-4202-a109-a7c9ec14d6cd" />


`export CLIENT_ID=450....apps.googleusercontent.com`

`python run_app.py`

- connect to the application :
  `gcloud compute ssh instance-1 --zone=ZONE -- -L 8080:localhost:8081`

  
