var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Express'
	});
});
*/

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

// Get request to hash
router.get('/', function(req, res) {
	res.render('hasher', {
		title: "MD5.xyz"
	});
});
// Post request to hash
router.get('/doHash',function(req, res) {
	var crypto = require('crypto');
	var input = req.query.query;
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

/* GET Hash list page. */
router.get('/hashlist', function(req, res) {
	var db = req.db;
    var collection = db.get('md5');
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var output = "";

    var download = false;

    console.log(query);



    if(query.dl == '' || !isEmpty(query.dl)) {
    	download = true;
    }
    if(download == true) {
    	if(query.dl == '') {
    		res.attachment('hashlist.txt');
    	} else {
    		res.attachment('hashlist.' + query.dl);
    	}
    }

    collection.find({},{},function(e,docs){
    	if(!download)
	    	output += '<textarea spellcheck="false" readonly="readonly" wrap="off" style="color:rgba(0,0,0,1);width:100%;height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;resize:none;">';
    
    	docs.forEach(function(item){
    		output += item.hash + " - " + item.text + '\r' + '\n';
    	});
    	if(!download)
	    	output += '</textarea>';

        res.send(output);
    });
});

module.exports = router;
