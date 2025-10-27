
github project
:
# Task 1. Enable Google App Engine Admin API

1.In the left Navigation menu, click APIs & Services > Library.
2. Type "App Engine Admin API" in the search box.
3. Click the App Engine Admin API card.
4. Click Enable. If there is no prompt to enable the API, then it is already enabled and no action is needed.

>> git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
>> cd python-docs-samples/appengine/standard_python3/hello_world

- Setup python environment:

`
sudo apt update
sudo apt install -y python3-venv
python3 -m venv myenv
source myenv/bin/activate
`

- test the application

`
flask --app main run
`
The development server is now running and listening for requests on port 5000.

View the results by clicking the Web preview (web preview icon) > Change port.

- Change the Port Number to 5000 and click Change and Preview.

# deploy the app

`gcloud app deploy`

`gcloud app browse`
