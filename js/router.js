
router = require('express').Router();

/*
 * Define routings
 */
router.get('/', function(req, res) {
	res.send("Hello World");
});

// Make the router available
module.exports = router;
