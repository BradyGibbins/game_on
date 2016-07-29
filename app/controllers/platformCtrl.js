app.controller('platformCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

	$scope.platformID = $routeParams.id;
	
	$http.get('/game_on/api/api.php?platform-id='+$scope.platformID)
	.then(function success(response){
		$scope.platformDetails = response.data;
	});

	$http.get('/game_on/api/api.php?platform-reviews='+$scope.platformID)
	.then(function success(response){
		$scope.reviews = response.data;
	});
}]);