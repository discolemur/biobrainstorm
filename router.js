express = require('express')
router = express.Router();

/*
 * Define routings
 */

router.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/home.html');
});

router.get('/home', function(req, res) {
	res.sendFile(__dirname + '/public/home.html');
});

router.get('/signin', function(req, res) {
	res.sendFile(__dirname + '/public/signin.html');
});

router.get('/signup', function(req, res) {
	res.sendFile(__dirname + '/public/signup.html');
});

router.get('/about', function(req, res) {
	res.sendFile(__dirname + '/public/about.html');
});

router.get('/contact', function(req, res) {
	res.sendFile(__dirname + '/public/contact.html');
});

router.get('/post_question', function(req, res) {
	res.sendFile(__dirname + '/public/post_question.html');
});

router.get('/view_all', function(req, res) {
	res.sendFile(__dirname + '/public/view_all.html');
});

router.all('*', function(req, res){
	res.sendStatus(404);
})

// Make the router available
module.exports = router;
