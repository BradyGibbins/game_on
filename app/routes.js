app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl:'app/views/homeView.html',
		controller:'homeCtrl'
	})
	.when('/platforms', {
		templateUrl:'app/views/platformsView.html',
		controller:'platformsCtrl'
	})
	.when('/platforms/:id', {
		templateUrl:'app/views/platformView.html',
		controller:'platformCtrl'
	});
});