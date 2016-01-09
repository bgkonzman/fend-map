# Map of Bay Area Jesuit Works
Udacity FEND P5-1

# Building the project
1. Clone the repo to your local machine
2. Make sure to have [npm installed](https://docs.npmjs.com/getting-started/installing-node).
3. From a CLI, run "npm install" in the project's root directory.
4. From a CLI, run "bower install" in the project's root directory.
6. From a CLI, run "grunt" in the project's root directory.
7. Copy the bower_components folder into dist/

# Running the app
1. Make sure to have [ngrok installed](https://ngrok.com/download).
2. Run a local web server - with python installed, this is as simple as:
   a. Navigating to the project's /dist directory
   b. Running "python -m SimpleHTTPServer 8080" from a CLI
3. Run ngrok from a CLI - if you've used port 8080 as above, it's as simple as:
   a. ngrok http 8080
4. Use a browser to visit the forwarding address ngrok displays.
