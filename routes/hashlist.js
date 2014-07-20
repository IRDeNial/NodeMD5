var express = require('express');
var router = express.Router();

function isEmpty(obj) {
	if (obj == null) return true;

	if (obj.length && obj.length > 0) return false;
	if (obj.length === 0) return true;
	
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	 
	return true;
}

function filterNewLines(input) {
    return input.replace(/\n/gim,'\\n').replace(/\r/gim,'\\r');
}

/* GET Hash list page. */
router.get('/', function(req, res) {
	var entities = require("entities");

	var db = req.db;
    var collection = db.get('md5');
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var output = "";

    var download = false;

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
	    	output += '<textarea id="hideThis" spellcheck="false" readonly="readonly" wrap="off" style="color:rgba(0,0,0,1);width:100%;height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;resize:none;display:hidden;">';
    
    	docs.forEach(function(item){
    		output += item.hash + " - " + (!download ? entities.encodeHTML(filterNewLines(item.text)) : filterNewLines(item.text)) + '\r' + '\n';
    	});
    	if(!download) {
	    	output += '</textarea>';
            output += '<script>window.onload=function(){document.getElementById("hideThis").style.display = "inline";}</script>';
        }
        res.send(output);
    });
});

module.exports = router;
