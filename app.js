/*
 * Load dependencies
 */

var http = require('http');
var express = require('express');
var router = require('./router.js');
var path = require('path');
var mongoose = require('mongoose');

/*
 * Load config
 */

var config = require('./config.json');

/*
 * Set up app
 */

var app = express();
app.set('port', config.port);
app.use(router);

 /*
 * Connect to DB
 */

//mongoose.connect(config.database.url);

/*
 * Start server.
 */
 
http.createServer(app).listen(app.get('port'), function() {
	console.log('Server is running on port ' + app.get('port'));
});

