app.controller('reviewCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){

// check session status
	$http.get('/game_on/api/api.php?session-status')
	.then(function success(response){
		if(response.data.session === 'false'){
			$scope.sessionActive = false;
		}
		else{
			$scope.sessionActive = true;

			var userID = response.data.id;

			$http.get('/game_on/api/api.php?user-info='+userID)
			.then(function success(response){
				var data = response.data;

				// console.log(data);

				$scope.userInfo = {
					userID:data.user_id,
					userType:data.user_type_id,
					username:data.username,
					userImg:data.user_img
				};
			});
		}
	});

	$scope.reviewID = $routeParams.id;

	// retrieve review information
	$http.get('/game_on/api/api.php?review-id='+$scope.reviewID)
	.then(function success(response){
		// console.log(response.data);
		$scope.reviewDetails = response.data;

		var reviewContent = $scope.reviewDetails.review_content;
		var reviewParas = '';
		// add <p> tags around each paragraph of review text
		reviewContent.forEach(function(cv, i){
			cv = "<p>"+cv+"</p>";
			reviewParas += cv;
		});

		// add review text to the view
		$('.review-content').html(reviewParas);
	});


	// retrieve review's comments
	$http.get('/game_on/api/api.php?review-comments='+$scope.reviewID)
	.then(function success(response){
		$scope.reviewComments = response.data;
		var data = response.data;
		if(data.error === 'no comments'){
			$scope.commentCount = 0;
		}
		else{
			$scope.commentCount = data.length;
		}
	});

}]);