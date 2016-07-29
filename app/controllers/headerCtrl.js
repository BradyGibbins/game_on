app.controller('headerCtrl', ['$scope', '$http', function($scope, $http){

	// retrieve platform list from db
	$http.get('/game_on/api/api.php?list-platforms')
		.then(function success(response){
			
			$scope.platformList = response.data;
 
		});

	// menu elements for large devices
	$scope.hidePlatformsLg = 'hidden';
	$scope.platformsShowHideLg = function(){
		if($scope.hidePlatformsLg === 'hidden'){
			$scope.hidePlatformsLg = '';
		}
		else{
			$scope.hidePlatformsLg = 'hidden';
		}
	};

	$scope.hideSearchLg = 'hidden';
	$scope.searchShowHideLg = function(){
		if($scope.hideSearchLg === 'hidden'){
			$scope.hideSearchLg = '';
		}
		else{
			$scope.hideSearchLg = 'hidden';
		}
	};


	// menu elements for small devices
	$scope.hidePlatformsSm = 'hidden';
	$scope.platformsShowHideSm = function(){
		if($scope.hidePlatformsSm === 'hidden'){
			$scope.hidePlatformsSm = '';
		}
		else{
			$scope.hidePlatformsSm = 'hidden';
		}
	};

	$scope.hideSearchSm = 'hidden';
	$scope.searchShowHideSm = function(){
		if($scope.hideSearchSm === 'hidden'){
			$scope.hideSearchSm = '';
		}
		else{
			$scope.hideSearchSm = 'hidden';
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


	// login and registration modals
	$scope.hideModalOverlay = 'hidden';

	$scope.hideLoginModal = 'hidden';
	$scope.showHideLogin = function(){
		if($scope.hideLoginModal === 'hidden'){
			$scope.hideModalOverlay = '';
			$scope.hideLoginModal = '';
		}
		else{
			$scope.hideModalOverlay = 'hidden';
			$scope.hideLoginModal = 'hidden';
			$scope.usernameError = false;
			$scope.passwordError = false;
		}
	};

	$scope.hideRegisterModal = 'hidden';
	$scope.showHideRegister = function(){
		if($scope.hideRegisterModal === 'hidden'){
			$scope.hideModalOverlay = '';
			$scope.hideRegisterModal = '';
		}
		else{
			$scope.hideModalOverlay = 'hidden';
			$scope.hideRegisterModal = 'hidden';
		}
	};


	// login processing
	$scope.loginUsername = '';
	$scope.loginPassword = '';

	$scope.processLogin = function(){

		$scope.usernameError = false;
		$scope.passwordError = false;


		if($scope.loginUsername === ''){
			$scope.usernameError = 'please enter a username';
			return false;
		}
		else if($scope.loginPassword === ''){
			$scope.passwordError = 'please enter a password';
			return false;
		}
		else{

			// $scope.usernameError = false;
			// $scope.passwordError = false;
			// $scope.loginUsername = '';
			// $scope.loginPassword = '';

			// $scope.getURL = '/game_on/api/api.php?loginUsername='+$scope.loginUsername+'&loginPassword='+$scope.loginPassword;

			
			$http.post('/game_on/api/api.php', {
				'loginUsername':$scope.loginUsername,
				'loginPassword':$scope.loginPassword
			},
			{
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			})
			.then(function success(response){
				console.log(response);
			});
		}

	};


	$scope.hideLoadingOverlay = 'hidden';
}]);