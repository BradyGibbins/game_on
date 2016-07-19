app.controller('headerCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

	$http.get('/game_on/api/api.php?list-platforms')
		.then(function success(response){
			
			$scope.platformList = response.data;
 
		});

	$scope.hidePlatformsLg = 'hidden';
	$scope.platformsShowHideLg = function(){
		if($scope.hidePlatformsLg === 'hidden'){
			$scope.hidePlatformsLg = '';
		}
		else{
			$scope.hidePlatformsLg = 'hidden';
		}
	};

	$scope.hidePlatformsSm = 'hidden';
	$scope.platformsShowHideSm = function(){
		if($scope.hidePlatformsSm === 'hidden'){
			$scope.hidePlatformsSm = '';
		}
		else{
			$scope.hidePlatformsSm = 'hidden';
		}
	};

	$scope.menuSmActive = '';
	$scope.hideMenuSm = 'hidden';
	$scope.menuShowHideSm = function(){
		if($scope.hideMenuSm === 'hidden'){
			$scope.hideMenuSm = '';
			$scope.menuSmActive = 'active';
		}
		else{
			$scope.hideMenuSm = 'hidden';
			$scope.menuSmActive = '';
		}
	};

	$scope.menuPlatformsShowHideSm = function(){
		$scope.platformsShowHideSm();
		$scope.menuShowHideSm();
	};



}]);