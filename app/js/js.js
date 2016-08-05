$(document).ready(function(){
	// registration form image submission validation
	$('#register-img').on('change', function(){
		var img = $('#register-img').prop('files')[0];
		var formData = new FormData();

		formData.append('file', img);

		$.ajax({
			url:'/game_on/api/api.php',
			dataType:'text',
			cache:false,
			contentType:false,
			processData:false,
			data:formData,
			type:'post',
			success:function(data){

				var errorMsg = $('#register-img-error');

				if(data === 'too big'){
					errorMsg.css('display', 'none');
					errorMsg.text('file size must be less than 100KB');
					errorMsg.css('display', 'inline-block');
				}
				else if(data === "invalid"){
					errorMsg.css('display', 'none');
					errorMsg.text('file type must be .png, .gif or .jpg');
					errorMsg.css('display', 'inline-block');
				}
				else{
					errorMsg.css('display', 'none');
				}
			}
		});
	});

	// clear image field on registration form submission
	$('.register-submit').on('click', function(){
		$('#register-img').val('');
	});

	// form cancellation
	$('.cancel-btn, .exit-btn').on('click', function(){
		var imgError = $('#register-img-error');
		imgError.css('display', 'none');
		imgError.text('');

		// deletes image from server side temp folder
		$.ajax({
			url:'/game_on/api/api.php?clear-temp-files',
			method:'get'
		});
	});

	// move focus to form inputs when forms are shown
	$('#nav-login-lg, #nav-login-sm').on('click', function(){
		$('#login-username').focus();
	});

	$('#nav-register-lg, #nav-register-sm').on('click', function(){
		$('#register-username').focus();
	});
});