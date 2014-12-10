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
});

router.post('/signinhandler', function(req,res){
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
});

router.post('/signuphandler', function(req, res) {
	var handler = require('./signup2');
	var handle_signup = function callback (jsonBroOut){
		//console.log("RETURNED!: ",jsonBroOut);
		//_callback(jsonBroOut);
		res.send(jsonBroOut);
	};
	handler.signup(req.body, handle_signup);
});

router.get('/post_question', function(req, res) {
	res.render('post_question', { title: 'Post Your Question' });
});

router.post('/post_questionhandler', function(req, res) {
	var handler = require('./post_question2');
	var handle_post_question = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.post_question(req.body, handle_post_question);
});

//added RH
router.get('/post_response', function(req, res) {
	res.render('post_response', { title: 'Post Your Response' });
});

router.post('/post_responsehandler', function(req, res) {
	var handler = require('./post_response2');
	var handle_post_response = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.post_response(req.body, handle_post_response);
});
//added RH
router.get('/voting', function(req, res) {
	res.render('voting', { title: 'Vote' });
});

router.post('/votinghandler', function(req, res) {
	var handler = require('./voting2');
	var handle_voting = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.voting(req.body, handle_voting);
});
//added RH
router.get('/get_one_question', function(req, res) {
	res.render('/get_one_question', { title: 'View Question' });
	
});
router.post('/get_one_questionhandler', function(req, res) {
	var handler = require('./get_one_message3');
	var handle_get_one_message = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.get_one_message(req.body, handle_get_one_message);
});

//added RH to be implemented later, works on back end code
router.get('/get_one_response', function(req, res) {
	res.render('get_one_response', { title: 'View Response' });
});
router.post('/get_one_responsehandler', function(req, res) {
	var handler = require('./get_one_message3');
	var handle_get_one_message = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.get_one_message(req.body, handle_get_one_message);
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
