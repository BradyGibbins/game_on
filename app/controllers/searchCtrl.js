app.controller('searchCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){

	$scope.q = $routeParams.q;
	$http.get('/game_on/api/api.php?q='+$scope.q)
	.then(function success(response){
		var data = response.data;
		if(data.error){
			$scope.resultCount = 0;
		}
		else{
			$scope.searchResults = data;
			$scope.resultCount = data.length;
		}
	});

}]);