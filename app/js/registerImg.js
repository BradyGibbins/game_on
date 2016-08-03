$(document).ready(function(){
	var img = $('#register-img');
	img.on('change', function(){
		console.log(img[0].files[0]);
	});
});