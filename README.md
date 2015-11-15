#lovemovies

This application was built as an educational project to teach students the basics of node and angular
it consists of a node server side and an angular client side.

You are welcome to clone or fork this application at https://github.com/lillylangtree/lovemovies.git

The application is deployed to heroku at https://ilovemovies.herokuapp.com/

The angular files are contained under the /public directory

the public/index.html file is served by default on the '/' route

the entire node process can be seen in the server.js file

The application accesses movie data via api calls both on the client and server side.
The angular application uses the $http service to return data via an api call to the
https://omdbapi.com api. This method is allowed as the api permissions client side
applications. Be aware that this is not always the case with client side access to
external domain resources. To show how to obtain data on the client side via a server
side 'proxy' we include a server side resource to obtain data on the server side
that can be passed back to the client.

For more information on cross domain issue see
https://jvaneyck.wordpress.com/2014/01/07/cross-domain-requests-in-javascript/

The application 'persists' favorite movie data to a file in the same location as
the server.js file, data.json

For a discussion of Angular and MVC frameworks see https://ilovemovies.herokuapp.com/document.html

##Installation
=============
To run the application once cloned or forked run the command
>npm start
In the root directory i.e. where server.js exists
This will start the node server process.

See package.json for how the npm start command works.

Navigate to http;//localhost:<port number>

The port number will be displayed in the command tool

#Server side
=============
The node process contains the following resources

/movies action:get
    parameter: url the http location of api to retrieve movie list

    returns json file of movies based on a search term supplied as a parameter

    sample request http://www.omdbapi.com/?s=star+wars&r=json

    returns array of movie objects.

/favorites action:get

    retreive favorite movies from the data.json file.

    Returns json file of movie objects

/favorites action:post
    post data {movie object}

    saves favorite movie (if it doesn't already exist) to data.json file

/deleteFavorite action:delete
    parameter: imdbId

    deletes movies from data.json file

##Angular Application
===================

The routing for the client side application can be seen in the app.js file under the /public
directory.

##Resources

##Deploying to Heroku

Heroku requires a Profile to be present. This indicates the file name of the server process to be started via node.
A Procfile is present in this project. No change is needed unless you change the name of the server file.

see https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction for details of deploying
node applications to heroku
