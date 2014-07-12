$(document).ready(function(){
	function doHash(string,dest) {
		$.ajax({
			url: '/doHash',
			type: 'GET',
			data: {
				func: 'hash',
				query: string
			}
		}).success(function(resp) {
			dest.val(resp);
		});
	}

	function getValue(string,dest) {
		if(string.length == 32) {
			$.ajax({
				url: '/doHash',
				type: 'GET',
				data: {
					func: 'get',
					query: string
				}
			}).success(function(resp) {
				dest.val(resp);
			});
		} else {
			dest.val("That wasn't a valid MD5 hash...");
		}
	}

	$("#inputText").val('');
	$("#inputHash").val('');

	$("#inputText").on('keyup',$.debounce(200,function() {
    	if($("#inputText").val() == "") {
    		$("#inputHash").val('');
    	} else {
			doHash($('#inputText').val(),$('#inputHash'));
		}
	}));
	$("#inputHash").on('keyup',$.debounce(200,function() {
    	if($("#inputHash").val() == "") {
    		$("#inputText").val('');
    	} else {
			getValue($('#inputHash').val(),$('#inputText'));
		}
	}));
});