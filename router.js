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

router.get('/signin', function(req, res) {
	res.render('signin', { title: 'Sign In' });
});

router.get('/signup', function(req, res) {
	res.render('signup', { title: 'Sign Up' });
});

router.get('/about', function(req, res) {
	res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res) {
	res.render('contact', { title: 'Contact' });
});

router.get('/post_question', function(req, res) {
	res.render('post_question', { title: 'Post Your Question' });
});

router.get('/view_unanswered', function(req, res) {
	res.render('view_unanswered', { title: 'All Questions' });
});

router.all('*', function(req, res){
	res.sendStatus(404);
})

// Make the router available
module.exports = router;
