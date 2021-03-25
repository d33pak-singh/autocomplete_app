# Schoology Take Home Assignment

## Prerequisites
You will need the following tools: `docker` and `docker-compose` to get this app running properly. Also please make sure you have `npm` installed in your environment.

### Preparing the files

I'll start with 3 images 

- PHP: contains php-fpm, php-cli, composer and dependencies for running laravel
- Node: contains npm used to run react app
- MySQL: the database we need for our app, using image form dockerhub

```bash
    .
    ├── docker
    │   ├── frontend
    │   │   └── Dockerfile (React & npm)
    │   └── backend
    │       └── Dockerfile (PHP & Laravel)
    └── docker-compose.yml
    
    2 directories, 3 files
```

We have **docker-compose.yml** and Dockerfile in each directory that has the configuration files for our custom image for backend and frontend.
## Steps to get the App running
### Step 1
Download the source code by running the `git` clone command:
```
git clone https://github.com/d33pak-singh/autocomplete_app.git
```
You'll have the source code in a directory name `autocomplete_app`
### Step 2

Please make sure that the listed ports are avaibale as we are going to use those ports to run different services.
- Laravel backend (8080)
- React frontend (3000)
- Mysql (4306)

Move to the root of `autocomplete_app` and then start then let's begin the build process
- Copy `.env.example` to `.env` and add values for all DB_DATABASE, DB_USERNAME, DB_PASSWORD, UID and BACKEND_PORT. Please make sure to update these
values else there can be problems while running the application.
- Move to `autocomplete_app/backend` and follow the same steps by changing the `.env.example` to `.env`. Please keep in mind that this time you are configuring env variables for your laravel app while previously you did the same for docker.

### Step 3
Build the images and start the services:

P.S If you have not added your user to docker user group then please use **sudo docker-compose xxx** while running all docker commands. 
```
docker-compose build
docker-compose up -d
```
This will start the docker process where docker will read the Dockerfile from both backend and frontend directories and install the asked dependencies for both laravel and react app.
There is a seperate service written in docker.yml file which will also create a container for mysql by using mysql image from dockerhub.

### Step 4
After the build is created and docker has boot up our containers we are ready to start. But just to make sure that things went fine, run the command and you'll be able to see our 3 new containers running.
```
docker ps
```
### Step 5
Before we move ahead we have to run few lasts commands to make run our laravel migration which will create table in mysql and also our seeders which will fill data in the tables for us.

Run these commands:
```
docker exec -it AUTOCOMPLETE_APP_BACKEND bash -c "cd backend/ && composer install"
docker exec -it AUTOCOMPLETE_APP_BACKEND php backend/artisan key:generate --ansi
docker exec -it AUTOCOMPLETE_APP_BACKEND php backend/artisan migrate
docker exec -it AUTOCOMPLETE_APP_BACKEND php backend/artisan db:seed
```
Here `AUTOCOMPLETE_APP_BACKEND` is name of the container which has php and laravel running on it. You can also crosscheck this with `docker ps` command.

### Step 6
If everything works as expected, you will be able to access the app by opening the following url in your browser:  [http://localhost:3000](http://localhost:3000). Here you'll get to see the home page where we have our search bar in the header. API calls will be made to fetch the result against entered search query. The fetched data is saved using Reducer so that on next same query search data can be served from reducer store rather than making a new API call again. Debouncing is also used to limit the number of API calls on each key press.
![](https://i.ibb.co/X3j291Y/demo.gif)

## API methods
There is only one endpoint exposed and the endpoint follow a URL pattern like this: `/api/v1/` + `controller`. `v1` is added to give versioning to the api.

For this assignment, I have create one controller called `people` and one method using can be accessed by the endpoint `/api/v1/people`.

URL | Query | Method | Description | 
--- | --- | --- | ---
api/v1/people | query=xxxx  | GET | Returns list of all people with matching name  |                     

Also as per the asked requirement here is a example CURL command using which one can run to fetch data:
```
  curl -X GET \
    http://127.0.0.1:8080/api/v1/people?query=Deepak \
    -H 'Accept: */*' \
    -H 'Connection: keep-alive' \
    -H 'Content-Length: 389' \
    -H 'Content-Type: application/json' \
    -H 'cache-control: no-cache'
```
# Architecture
This assignment is developed keeping in mind that the person cloning it has to run minimum lines of commands to get this running. Also both the front-end and back-end part of the application are divided in different containers service. E.g if something need to be changed in the front end so that changes can be easily made by only making changes in front end directory and same goes for the back-end part.

On installation of both laravel and React scaffolding directories are created by default. I'm going to list only the directories I wrote code in or created.

Application is structured in the following way:

                
+ backend (Laravel/PHP);
    + app (Contains our model, controllers, services, helpers. basically meat of app);
         + Constants (Contains constants for response, validation, errors);
         + Exceptions (Handle all exception case on root level so even if application crashes a valid response is sent to user);
         + Helpers (Utility method for various purpose like validation etc.);
         + Http (Contains controllers which contain all businesses logic, talk to helpers services and generate and send back response to client);
         + Model (DB operation wrapper. Mysql queries are executed here);
         + Services (Various utilities like validating request, calling models etc.);
    + database (Contains files for database operations);
         + factories (Used to generate fake data to be filled in database);
         + migrations (Contains migration which n run will create tables in database);
         + seeds (Dump data generated from factories in tables);
    + routes (React app folders and files);
         + api (All our /api roues are defined here in this file and then mapped to desired controller);
    + tests (React app folders and files);
         + Unit (Contains our unit test cases written for controller);
+ Frontend (React);
  + src (React app folders and files);
    + assets (contains logo and other images);
    + components (contains components for each smaller modules. Eg. Snackbar);
    + containers (contains entry point component for root route, import child from components directory);
    + services (api calling factory; all endpoints will be called from here);
+ miscellaneous files (git, docker);

## Running tests
I have also written unit test cases for our endpoint.
To run the `API` tests, navigate to the root folder and run the following command:
```
docker exec -it AUTOCOMPLETE_APP_WEB vendor/bin/phpunit
```
![](https://i.ibb.co/p31cgqz/unit-tes.png)


## Todo's
- All the commands that user has to run manually can also be automated using docker
- Setup Redis on back-end and cache result from db for more fast results.

# Thank you for the time
Build with :heart: and :coffee:
