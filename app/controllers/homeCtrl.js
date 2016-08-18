app.controller('homeCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){

	$scope.currentPlatform = 0;
	$scope.currentSlide = 0;
	$scope.hidePlatformSelect = true;

	var cycleSlides;


	$http.get('/game_on/api/api.php?list-platforms')
	.then(function success(response){
		$scope.platforms = response.data;
		var data = response.data;
		$scope.currentPlatformName = 'All Platforms';

		$scope.platformSelect = function(platformID){
			$scope.hidePlatformSelect = !$scope.hidePlatformSelect;
			$scope.currentPlatform = platformID;
			$scope.getSlides($scope.currentPlatform);
			var platformSelectID = platformID - 1;
			if(platformID === 0){
				$scope.currentPlatformName = 'All Platforms';
			}
			else{
				$scope.currentPlatformName = data[platformSelectID].platform_name;
			}
			$scope.currentSlide = 0;
		};
	});

	// start the slideshow
	$scope.startSlideshow = function(){
		// cancels running interval
		$scope.stopSlideshow();

		cycleSlides = $interval(function(){
			var slides = $scope.slides;
			if($scope.currentSlide === (slides.length - 1)){
				$scope.currentSlide = 0;
				$scope.slideChange($scope.currentSlide);
			}
			else{
				$scope.currentSlide ++;
				$scope.slideChange($scope.currentSlide);
			}
		}, 5000);
	};

	// stop the slideshow
	$scope.stopSlideshow = function(){
		$interval.cancel(cycleSlides);
	};

	// change slideshow contents depending on platform chosen
	$scope.getSlides = function(platform){

		$http.get('/game_on/api/api.php?latest-reviews='+platform)
		.then(function success(response){

			var slides = [];
			var data = response.data;
			$scope.reviews = data;

			for(var i = 0; i < data.length; i++){
				var slide = {};
				if(i === 0){
					slide.visible = true;
				}
				else{
					slide.visible = false;
				}

				slide.id = data[i].review_id;
				slide.title = data[i].review_title;
				slide.img = data[i].review_img;
				slide.author = data[i].user_fname + ' ' + data[i].user_lname;
				slide.platform = data[i].platform_name;

				slides[i] = slide;
			}
			$scope.slides = slides;
			$scope.startSlideshow();
		});
	};

	// display slides for the selected platform
	$scope.getSlides($scope.currentPlatform);


	// change visible slide in slideshow
	$scope.slideChange = function(slideNum){
		var slides = $scope.slides;
		for(var i = 0; i < slides.length; i++){
			if(i === slideNum){
				slides[slideNum].visible = true;
			}
			else{
				slides[i].visible = false;
			}
		}
		$scope.currentSlide = slideNum;
	};

	$scope.hideLoadingOverlay = true;
	$scope.startSlideshow();
}]);