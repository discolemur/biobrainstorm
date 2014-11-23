
router = require('express').Router();

/*
 * Define routings
 */
router.get('/', function(req, res) {
	res.sendfile('./public/home.html');
});

router.get('/home', function(req, res) {
	res.sendfile('./public/home.html');
});

router.get('/signin', function(req, res) {
	res.sendfile('./public/signin.html');
});

router.get('/signup', function(req, res) {
	res.sendfile('./public/signup.html');
});

router.get('/about', function(req, res) {
	res.sendfile('./public/about.html');
});

router.get('/contact', function(req, res) {
	res.sendfile('./public/contact.html');
});

router.get('/post_question', function(req, res) {
	res.sendfile('./public/post_question.html');
});

router.all('*', function(req, res){
	res.send(404);
})

// Make the router available
module.exports = router;
