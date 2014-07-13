var express = require('express');
var router = express.Router();

// Get request to hash
router.get('/', function(req, res) {
	res.render('hasher', {
		title: "MD5.xyz"
	});
});

module.exports = router;
