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
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
//
app.use(express.static(path.join(__dirname, '/public')));
//index.html will be served by default if '/' selected
//i.e. the route '/' will look in /public for index.html
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//
app.get('/movies', function (req, res) {

    var movieListUrl = req.query.url; // get the search url from the request
    http.get(movieListUrl, function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);

            var body = '';
            response.on('data', function (d) {
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
    var data = fs.readFileSync('./data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});
app.post('/deleteFavorite', function (req, res) {
    if (!req.body.Title || !req.body.imdbID) { //check post data for required fields
        res.send("Error");
        return
    }
    var data = JSON.parse(fs.readFileSync('./data.json')); //get existing data
    var idx = 0;
    for (var i = 0; i < data.length; i++) { //find movie in favorites list
        if (data[i].imdbID === req.body.imdbID) {
            idx = i;
        }
    }
    if (idx > 0)
        data.splice(idx, 1); //at the position of the movie remove that movie
    fs.writeFile('./data.json', JSON.stringify(data)); //send back to file
    res.setHeader('Content-Type', 'application/json');
    res.send({"status": "ok"});
});

app.post('/favorites', function (req, res) {
    if (!req.body.Title || !req.body.imdbID) { //check post data for required fields
        res.send("Error");
        return
    }
    var data = JSON.parse(fs.readFileSync('./data.json')); //get existing data
    var idx = 0;
    for (var i = 0; i < data.length; i++) { //find movie in favorites list
        if (data[i].imdbID === req.body.imdbID) {
            idx = i;
        }
    }
    if (idx == 0)     // 0 if not in list
        data.push(req.body); // add new movie data
    fs.writeFile('./data.json', JSON.stringify(data)); //send back to file
    res.setHeader('Content-Type', 'application/json');
    res.send({"status": "ok"});
});
// start the server on port 3000
// we use the listen function to start the server and
// the server will now start listening for requests e.g. /favourites
// when the request is received it will be processed by the app.get()
// functions, see above. 
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});