var express = require('express');
// we need to ensure we 'require' all the modules we require for
// our server to work
// make sure we have installed these modules via npm and they
// exist in the node_modules folder.
// before running the server we can run npm install, this will
// install all our module dependencies which can be viewed in
// the package.json file
// to start the server issue the command npm start
// this will start the node server on the port specified
// by the port number at the end of this file. This number
// can be changed e.g. 8000, 8080 if it conflicts with other
// server processes you may have running
var app = express();
// we require all the modules we need for our server process
// note these modules need to be installed for this server process to work
// by doing an >npm start or >npm install in the root directory
// (same directory location as this file)
// will install these modules, see the package.json file which is what
// the >npm install and/or >npm start will source as required modules
// >npm start will start this server process.
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
//
app.use(express.static(path.join(__dirname, '/public')));
//index.html will be served by default if '/' selected
//i.e. the route '/' will look in /public for index.html
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//
app.get('/movies', function (req, res) {
    //this request should include a url for processing
    //this url will make an api call based on the url value
    if (!req.query.url) { //check get paramters for required fields
        res.send("Error");
        return
    }
    var movieListUrl = req.query.url; // get the search url from the request
    https.get(movieListUrl, function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);

            var body = '';
            response.on('data', function (d) { //getting data, append to body
                body += d;
            });
            response.on('end', function () {
                // Data reception is done, return to requester!
                var parsed = JSON.parse(body);
                res.setHeader('Content-Type', 'application/json');
                res.send(parsed);
            });
        })
        .on('error', function (e) {
            console.error(e);
        });

});
app.get('/favorites', function (req, res) {
    //return the list of favourite movies from the list stored in the dataset
    //the dataset data.json need to be in the same directory location as this server file
    var data = fs.readFileSync('./data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data); //return data back to requester
});
app.delete('/deleteFavorite', function (req, res) {
    //this resource will delete an entry in the movie favourites list
    //if it exists in the list
    //we test for the parameter imdbID to be present for a valid request
    if (!req.query.imdbID) { //check parameter data for required fields
        res.send("Error");
        return
    }
    var imdbID = req.query.imdbID; // get the imdbID from the request

    var data = JSON.parse(fs.readFileSync('./data.json')); //get existing data
    var idx = -1; //set to -1 as 0 is a valid array index number
    for (var i = 0; i < data.length; i++) { //find movie in favorites list
        if (data[i].imdbID === imdbID) {
            idx = i;
        }
    }
    if (idx >= 0)
        data.splice(idx, 1); //at the position of the movie remove that movie
                             //the splice function will remove the item at position idx
    fs.writeFile('./data.json', JSON.stringify(data)); //send back to file
    res.setHeader('Content-Type', 'application/json');
    res.send({"status": "ok"});
});

app.post('/favorites', function (req, res) {
    //we want to store a new favourite movie to our favorites list
    //the dataset data.json need to be in the same directory location as this server file
    if (!req.body.Title || !req.body.imdbID) { //check post data for required fields
        res.send("Error");
        return
    }
    var data = JSON.parse(fs.readFileSync('./data.json')); //get existing data
    var idx = -1;//set to -1 as 0 is a valid array index number
    for (var i = 0; i < data.length; i++) { //find movie in favorites list if already present
        if (data[i].imdbID === req.body.imdbID) { //use the imdbID as the key
            idx = i;
        }
    }
    if (idx == -1)     // -1 if not in list
        data.push(req.body); // add new movie data to favorites list
    fs.writeFile('./data.json', JSON.stringify(data)); //send back to file
    res.setHeader('Content-Type', 'application/json');
    res.send({"status": "ok"}); //return message back to sender
});
// start the server on port 5000 by default
// if environmental variable process.env.PORT set then use this setting
// we use the listen function to start the server and
// the server will now start listening for requests e.g. /favourites
// when the request is received it will be processed by the app.get()
// functions, see above.
// note: if deploying to heroku the process.env.PORT setting is recommended
// as the server may not start on their servers without this setting as they
// may dynamically allocate a port setting when firing up the server process
//
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});