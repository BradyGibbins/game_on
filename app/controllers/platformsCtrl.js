app.controller('platformsCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/game_on/api/api.php?list-platforms')
	.then(function(response){
		$scope.platforms = response.data;
	});


}]);