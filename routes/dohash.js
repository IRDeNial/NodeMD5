var express = require('express');
var router = express.Router();

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;
	 
	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length && obj.length > 0) return false;
	if (obj.length === 0) return true;
	 
	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and toValue enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	 
	return true;
}

// Post request to hash
router.get('/',function(req, res) {
	var crypto = require('crypto');
	var entities = require("entities");
	
	var input = entities.decodeHTML(req.query.query);
	var func = req.query.func;

	var db = req.db;
	var collection = db.get('md5');

	var md5hash = crypto.createHash('md5');
	md5hash.update(input);
	var finalHash = md5hash.digest('hex');

	if(func == "hash") {
		collection.update({hash: finalHash}, {
			'hash': finalHash,
			'text': input
		}, {upsert: true});

		res.send(finalHash);
	} else if(func == "get") {
		collection.findOne({
			hash: input
		},function(err,item){
			if(isEmpty(item)) {
				res.send("We don't have that hash on file.  Sorry about that.");
			} else {
				res.send(item.text);
			}
		});
	} else {
		res.send("No");
	}
});

module.exports = router;
