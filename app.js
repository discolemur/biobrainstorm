/*
 * Load dependencies
 */

var http = require('http');
var express = require('express');
var router = require('./router.js');
var path = require('path');
var mongoose = require('mongoose');
var partials = require('express-partials');

/*
 * Load config
 */

var config = require('./config.json');

/*
 * Set up app
 */

var app = express();
app.set('port', config.port);
app.set('views', './public/views');
app.set('view options', { layout: './public/layout.ejs' });
app.set('view engine', 'ejs');
app.use(partials());
app.use(router);

 /*
 * Connect to DB
 */

mongoose.connect(config.database.url);

/*
 * Start server.
 */
 
http.createServer(app).listen(app.get('port'), function() {
	console.log('Server is running on port ' + app.get('port'));
});

