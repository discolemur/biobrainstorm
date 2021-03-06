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

router.post('/search', function(req, res) {
	var handler = require('./public/js/search');
	var handle_search = function(jsonBroOut) {
		res.send(jsonBroOut);
	};
	handler.search(req.body, handle_search);
});

router.get('/search_results', function(req, res) {
	res.render('search_results', { title: 'Biobrainstorm : a bioinformatics community'});
});

// signin_user is the http request to actually sign in
router.post('/signin_user', function(req, res) {
	var handler = require('./public/js/signin');
	var handle_signin = function callback (err, jsonBroOut) {
		console.log("RETURNED!: ", jsonBroOut)
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
	var handler = require('./public/js/signup');
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

router.post('/post_question', function(req, res) {
	var handler = require('./public/js/post_question');
	var handle_post_question = function callback (jsonBroOut) {
		res.send(jsonBroOut);
	};
	handler.post_question(req.body, handle_post_question);
});

//added RH
router.get('/post_response', function(req, res) {
	res.render('post_response', { title: 'Post Your Response' });
});

router.post('/post_responsehandler', function(req, res) {
	var handler = require('./public/js/post_response');
	var handle_post_response = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.post_response(req.body, handle_post_response);
});

router.post('/votinghandler', function(req, res) {
	var handler = require('./public/js/voting');
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
	var handler = require('./public/js/get_one_message');
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
	var handler = require('./public/js/get_one_message');
	var handle_get_one_message = function callback (jsonBroOut) {
	//console.log("RETURNED!: ", jsonBroOut)
	//_callback(jsonBroOut);
	res.send(jsonBroOut);
	};
	handler.get_one_message(req.body, handle_get_one_message);
});

router.post('/delete_question', function(req, res) {
	var handler = require('./public/js/delete_question');
	console.log(req.body);
	var handle_delete_question = function callback (jsonBroOut) {
		res.send(jsonBroOut);
	};
	handler.delete_question(req.body, handle_delete_question);
});

router.post('/delete_response', function(req, res) {
	var handler = require('./public/js/delete_response');
	var handle_delete_response = function callback (jsonBroOut) {
		res.send(jsonBroOut);
	};
	handler.delete_response(req.body, handle_delete_response);
});

router.get('/about', function(req, res) {
	res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res) {
	res.render('contact', { title: 'Contact' });
});

router.post('/view_all', function(req, res) {
	var handler = require('./public/js/get_all_messages');
	var handle_get_all_messages = function callback (jsonBroOut) {
		res.send(jsonBroOut);
	};
	handler.get_all_messages(req.body, handle_get_all_messages);
});

router.get('/view_all', function(req, res) {
	res.render('view_all', { title: 'All Questions' });
});

router.all('*', function(req, res){
	res.sendStatus(404);
})

// Make the router available
module.exports = router;
