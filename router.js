express = require('express');
router = express.Router();
bodyParser = require('body-parser');

/*
 * Define routings
 */

router.use(express.static(__dirname + '/public'));
router.use(bodyParser.json());

router.get('/', function(req, res) {
	res.render('home', { title: 'Biobrainstorm : a bioinformatics community' });
});

router.post('/test', function(req,res){
	res.send('Sucess');
});

router.post(/^\/search?((\w+)\+)*(\w+)$/, function(req,res){
	res.render('home', { title: 'Biobrainstorm : test' });
        console.log("Success");
});

router.post('/signupjson', function(req,res){
	res.send(req.body);
});



router.get('/home', function(req, res) {
	res.render('home', { title: 'Biobrainstorm : a bioinformatics community' });
});
//added RH
router.get('/search', function(req, res) {
	res.render('search', { title: 'Search' });
		var handler = require('./search2');

	var handle_search = function(jsonBroOut) {
		//console.log("RETURNED!: ",jsonBroOut);
		//_callback(jsonBroOut);
		res.send(jsonBroOut);
	};

handler.search(req.body, handle_search);
});

// signin_user is the http request to actually sign in
router.post('/signin_user', function(req, res) {
	var handler = require('./signin2');
	var handle_signin = function callback (jsonBroOut) {
	//	console.log("RETURNED!: ", jsonBroOut)
		res.send(jsonBroOut);
	}
	handler.signin(req.body, handle_signin);
});

// signin is the http request to render the signin page
router.get('/signin', function(req, res) {
	res.render('signin', { title: 'Sign In' });
});

// signup_user is the http request to actually sign in
router.post('/signup_user', function(req, res) {
	//should look for signup2 
	var handler = require('./signup2');
	var handle_signup = function callback (jsonBroOut){
	//	console.log("RETURNED!: ",jsonBroOut);
		res.send(jsonBroOut);
	}
	handler.signup(req.body, handle_signup)
});

// signup is the http request to render the signin page
router.get('/signup', function(req, res) {
	res.render('signup', { title: 'Sign Up' });
});

router.get('/post_question', function(req, res) {
	res.render('post_question', { title: 'Post Your Question' });
});
//added RH
router.get('/post_response', function(req, res) {
	res.render('post_response', { title: 'Post Your Response' });
});
//added RH
router.get('/voting', function(req, res) {
	res.render('voting', { title: 'Vote' });
});
//added RH
router.get('/get_one_question', function(req, res) {
	res.render('/get_one_question', { title: 'View Question' });
	
});
//added RH to be implemented later, works on back end code
router.get('/get_one_question', function(req, res) {
	res.render('get_one_question', { title: 'View Response' });
});
//added RH
router.get('/delete_question', function(req, res) {
	res.render('delete_question', { title: 'Delete Question' });
});
//added RH
router.get('/delete_response', function(req, res) {
	res.render('delete_response', { title: 'Delete Response' });
});

router.get('/about', function(req, res) {
	res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res) {
	res.render('contact', { title: 'Contact' });
});



router.get('/view_unanswered', function(req, res) {
	res.render('view_unanswered', { title: 'All Questions' });
});

router.all('*', function(req, res){
	res.sendStatus(404);
})

// Make the router available
module.exports = router;
