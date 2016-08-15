app.controller('homeCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	$scope.currentPlatform = 1;
	$scope.slides = [];

	$scope.getSlides = function(platform){
		
		$http.get('/game_on/api/api.php?latest-reviews='+platform)
		.then(function success(response){

			var slides = [];
			var data = response.data;

			for(var i = 0; i < data.length; i++){
				var slide = {};
				slide.id = data[i].review_id;
				slide.title = data[i].review_title;
				slide.img = data[i].review_img;
				slide.author = data[i].user_fname + ' ' + data[i].user_lname;
				slide.platform = data[i].platform_name;

				slides[i] = slide;
			}
			$scope.slides = slides;
		});
		
	};

	$scope.getSlides(1);

}]);