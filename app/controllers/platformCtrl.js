app.controller('platformCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

	$scope.platformID = $routeParams.id;
	$scope.invalidPlatformID = false;
	
	$http.get('/game_on/api/api.php?platform-id='+$scope.platformID)
	.then(function success(response){
		$scope.invalidPlatformID = false;
		if(response.data.error === 'invalid platform id'){
			$scope.invalidPlatformID = true;
		}
		else{
			$scope.platformDetails = response.data;
			$http.get('/game_on/api/api.php?platform-reviews='+$scope.platformID)
			.then(function success(response){
				$scope.reviews = response.data;
			});
		}
	});

}]);