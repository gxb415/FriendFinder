// Dependencies

var express = require('express');
var bodyParser = require('body-parser');

// express config

var app = express();

//intial port

var PORT = process.env.PORT || 3000;

// sets up express app to handle data parsing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Router 
// Points our server to "routing" files

require("./app/routing/apiroutes")(app);
require('./app/routing/htmlroutes')(app);

//Listener to start our server

app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
});