app.controller('reviewCtrl', ['$scope', '$routeParams', '$http', '$timeout', function($scope, $routeParams, $http, $timeout){


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
	$scope.invalidReviewID = false;

	// retrieve review information
	$http.get('/game_on/api/api.php?review-id='+$scope.reviewID)
	.then(function success(response){
		$scope.invalidReviewID = false;
		if(response.data.error === 'invalid review id'){
			$scope.invalidReviewID = true;
		}
		else{
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
		}
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

// submit user comments on reviews
	$scope.commentInput = '';
	$scope.submitComment = function(){
		$scope.commentError = false;
		$scope.commentSuccess = false;
		if($scope.commentInput.length === 0){
			$scope.commentError = 'please enter a comment before submitting';
		}
		else if($scope.commentInput.length > 500){
			$scope.commentError = 'comments must contain 500 or fewer characters';
		}
		else{
			$http.post('/game_on/api/api.php', {
				reviewID:$scope.reviewID,
				comment:$scope.commentInput
			})
			.then(function success(response){
				$scope.commentInput = '';
				$scope.commentCount = response.data.length;
				$scope.reviewComments = response.data;
				$scope.commentSuccess = 'comment successfully submitted';
				$timeout(function(){
					$scope.commentSuccess = false;
				}, 1300);
			});
		}
	};

// show comment deletion modal
	$scope.showCommentDelete = function(commentID, reviewID){
		$scope.hideCommentDeleteModal = false;
		$scope.hideModalOverlay = false;
		$scope.commentToDelete = commentID;
		$scope.commentParent = reviewID;
	};

// hide comment deletion modal
	$scope.hideCommentDelete = function(){
		$scope.hideCommentDeleteModal = true;
		$scope.hideModalOverlay = true;
	};

// delete comment
	$scope.deleteComment = function(commentID, reviewID){
		$http.get('/game_on/api/api.php?delete-comment='+commentID+'&comment-parent='+reviewID)
		.then(function success(response){
			var data = response.data;
			if(data.error === 'no comments'){
				$scope.commentCount = 0;
				$scope.reviewComments = [];
				$scope.hideCommentDeleteModal = true;
				$scope.hideModalOverlay = true;
			}
			else{
				$scope.commentCount = data.length;
				$scope.reviewComments = response.data;
				$scope.hideCommentDeleteModal = true;
				$scope.hideModalOverlay = true;
			}
		});
	};

	$scope.hideCommentDeleteModal = true;
	$scope.hideModalOverlay = true;
}]);