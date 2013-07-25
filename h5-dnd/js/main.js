$(document).ready(function() {
	$('form#upload-form').multiUpload({
		drop: 'drop-area',
		onSuccess : function() {

		},
		onFailure: function(e) {
			alert(e);
		}
	});
});
