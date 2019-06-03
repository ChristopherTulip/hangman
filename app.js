// Express Set up
var express = require('express');
var app = module.exports = express();

// Import Configurations
var config = require('./config.js')(app, express);

// Import Controllers
var pagesCtrl = require("./controllers/pages_controller");

// Set up routing
app.get('/', pagesCtrl.landing);

// this starts the server
app.listen(3000)
