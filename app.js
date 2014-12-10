/*
 * Load dependencies
 */

var http = require('http');
var https = require('https');
var fs = require('fs');
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
 * Security, I hope.
 */

/*
var options = {
 key: fs.readFileSync('ssl/key.pem'),
 cert: fs.readFileSync('ssl/server.crt')
};
*/

 /*
 * Connect to DB
 */

//mongoose.connect(config.database.url);

/*
 * Start server.
 */
http.createServer(app).listen(app.get('port'), function() {
	console.log('Insecure server is running on port ' + app.get('port'));
}); 
/*
https.createServer(options, app).listen(app.get('port'), function() {
	console.log('Secure server is running on port ' + app.get('port'));
});
*/

