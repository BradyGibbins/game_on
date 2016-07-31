app.controller('headerCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	// retrieve platform list from db
	$http.get('/game_on/api/api.php?list-platforms')
		.then(function success(response){
			
			$scope.platformList = response.data;
 
		});

	


	// MENU ELEMENTS FOR LARGE DEVICES

	// show/hide platform list on large devices
	$scope.hidePlatformsLg = 'hidden';
	$scope.platformsShowHideLg = function(){
		if($scope.hidePlatformsLg === 'hidden'){
			$scope.hidePlatformsLg = '';
		}
		else{
			$scope.hidePlatformsLg = 'hidden';
		}
	};

	// show/hide search bar on large devices
	$scope.hideSearchLg = 'hidden';
	$scope.searchShowHideLg = function(){
		if($scope.hideSearchLg === 'hidden'){
			$scope.hideSearchLg = '';
		}
		else{
			$scope.hideSearchLg = 'hidden';
		}
	};






	// MENU ELEMENTS FOR SMALL DEVICES
	
	// show/hide platform list on small devices
	$scope.hidePlatformsSm = 'hidden';
	$scope.platformsShowHideSm = function(){
		if($scope.hidePlatformsSm === 'hidden'){
			$scope.hidePlatformsSm = '';
		}
		else{
			$scope.hidePlatformsSm = 'hidden';
		}
	};

	// show/hide search bar on small devices
	$scope.hideSearchSm = 'hidden';
	$scope.searchShowHideSm = function(){
		if($scope.hideSearchSm === 'hidden'){
			$scope.hideSearchSm = '';
		}
		else{
			$scope.hideSearchSm = 'hidden';
		}
	};

	// show/hide menu on small devices
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

	// show/hide both menu and platforms on small devices
	$scope.menuPlatformsShowHideSm = function(){
		$scope.platformsShowHideSm();
		$scope.menuShowHideSm();
	};

	// hide menu and show login/registration modals on small devices
	$scope.menuLoginShowHideSm = function(){
		$scope.menuShowHideSm();
		$scope.showHideLogin();
	};

	$scope.menuRegisterShowHideSm = function(){
		$scope.menuShowHideSm();
		$scope.showHideRegister();
	};





	// DEVICE SIZE INDEPENDENT STUFF

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
			$scope.submitError = false;
			$scope.loginSuccess = false;
			$scope.loginUsername = '';
			$scope.loginPassword = '';
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


	// check session status
	$http.get('/game_on/api/api.php?session-status')
	.then(function success(response){
		if(response.data.session === 'false'){
			$scope.sessionActive = false;
		}
		else{
			$scope.sessionActive = true;
		}
	});

	// login processing
	$scope.loginUsername = '';
	$scope.loginPassword = '';

	$scope.processLogin = function(){

		$scope.usernameError = false;
		$scope.passwordError = false;
		$scope.submitError = false;
		$scope.loginSuccess = false;


		if($scope.loginUsername === ''){
			$scope.usernameError = 'please enter a username';
			return false;
		}
		else if($scope.loginPassword === ''){
			$scope.passwordError = 'please enter a password';
			return false;
		}
		else{

			$http.post('/game_on/api/api.php', {
				'loginUsername':$scope.loginUsername,
				'loginPassword':$scope.loginPassword
			})
			.then(function success(response){
				
				var data = response.data;

				if(data.error){
					$scope.submitError = data.error;
					return false;
				}
				else{
					$scope.userInfo = {
						userID:data.user_id,
						userType:data.user_type_id,
						username:data.username,
						email:data.user_email,
						fname:data.user_fname,
						lname:data.user_lname,
						joinDate:data.user_join_date,
						img:data.user_img
					};

					$scope.loginSuccess = 'login successful';

					$timeout(function(){
						$scope.showHideLogin();
					}, 1000);
				}
			});
		}

	};

	$scope.logout = function(){
		$http.get('/game_on/api/api.php?logout')
		.then(function success(){
			$scope.sessionActive = false;
		});
	};


	$scope.hideLoadingOverlay = 'hidden';
}]);