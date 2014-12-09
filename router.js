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

router.get('/signin', function(req, res) {
	res.render('signin', { title: 'Sign In' });
	
	var handler = require('./signin2');
	var handle_signin = function callback (jsonBroOut) {
		//console.log("RETURNED!: ", jsonBroOut)
		//_callback(jsonBroOut);
		res.send(jsonBroOut);
	}
	handler.signin(req.body, handle_signin);
	
});

router.get('/signup', function(req, res) {
	res.render('signup', { title: 'Sign Up' });
	//should look for signup2 
	var hanlder = require('./signup2');
	var handle_signup = function callback (jsonBroOut){
		//console.log("RETURNED!: ",jsonBroOut);
		//_callback(jsonBroOut);
		res.send(jsonBroOut);
	}
	hanlder.signup(req.body, handle_signup)
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
