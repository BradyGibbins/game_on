app.config(function($routeProvider){
	$routeProvider
	// home
	.when('/', {
		templateUrl:'app/views/homeView.html',
		controller:'homeCtrl'
	})
	// all platforms
	.when('/platforms', {
		templateUrl:'app/views/platformsView.html',
		controller:'platformsCtrl'
	})
	// single platform
	.when('/platforms/:id', {
		templateUrl:'app/views/platformView.html',
		controller:'platformCtrl'
	})
	// single review
	.when('/reviews/:id', {
		templateUrl:'app/views/reviewView.html',
		controller:'reviewCtrl'
	})
	.when('/search/:q', {
		templateUrl:'app/views/searchView.html',
		controller:'searchCtrl'
	});
});