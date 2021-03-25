# Autocomplete app back-end

## Installation

- Create a copy of `example.env` file with name `.env` at the same location.
- Update the contents of newly created `.env` file as per your local system settings.
    + Update the DB configurations as per your local settings.
- Then Run
```
composer install
```
- While the composer finishes the installation, create a database with the same name as you mentioned in step 2.
- Then Run
```
    php artisan key:generate --ansi
    php artisan migrate
```
These commands will create a key for running the application migrate all the tables in your database.
- Now that your tables are in place, let's create some dummy data for the demo. For this Run
```
    php artisan db:seed
```
This command will execute all the seeders which are in `database\seeds\` and will insert the data as written in these seeders.
- Navigate to the root folder of the application and run command
```php
    php artisan serve
```
Typically, you may use a web server such as Apache or Nginx to serve your Laravel applications. If you are on PHP 5.4+ and would like to use PHP's built-in development server, you may use the  serve Artisan command. By default the HTTP-server will listen to port 8000.
- Open your browser and navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

- If everything went right, you will be able to call the api endpoint or the CURL command mentioned in the root README file.

## Thank You
