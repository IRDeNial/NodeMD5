var express = require('express');
var router = express.Router();

// Get request to hash
router.get('/', function(req, res) {
	res.render('hasher');
});

module.exports = router;
