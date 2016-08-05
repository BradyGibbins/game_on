app.controller('headerCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	// check session status
	$http.get('/game_on/api/api.php?session-status')
	.then(function success(response){
		if(response.data.session === 'false'){
			$scope.sessionActive = false;
		}
		else{
			$scope.sessionActive = true;

			var userID = response.data.id;

			$http.get('/game_on/api/api.php?user-info='+userID)
			.then(function success(response){
				var data = response.data;

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
			});
		}
	});

	// retrieve platform list from db
	$http.get('/game_on/api/api.php?list-platforms')
		.then(function success(response){
			
			$scope.platformList = response.data;
 
		});

	


	// MENU ELEMENTS FOR LARGE DEVICES

	// show/hide platform list on large devices
	$scope.hidePlatformsLg = true;
	$scope.platformsShowHideLg = function(){
		if($scope.hidePlatformsLg){
			$scope.hidePlatformsLg = false;
		}
		else{
			$scope.hidePlatformsLg = true;
		}
	};

	// show/hide search bar on large devices
	$scope.hideSearchLg = true;
	$scope.searchShowHideLg = function(){
		if($scope.hideSearchLg){
			$scope.hideSearchLg = false;
		}
		else{
			$scope.hideSearchLg = true;
		}
	};






	// MENU ELEMENTS FOR SMALL DEVICES
	
	// show/hide platform list on small devices
	$scope.hidePlatformsSm = true;
	$scope.platformsShowHideSm = function(){
		if($scope.hidePlatformsSm){
			$scope.hidePlatformsSm = false;
		}
		else{
			$scope.hidePlatformsSm = true;
		}
	};

	// show/hide search bar on small devices
	$scope.hideSearchSm = true;
	$scope.searchShowHideSm = function(){
		if($scope.hideSearchSm){
			$scope.hideSearchSm = false;
		}
		else{
			$scope.hideSearchSm = true;
		}
	};

	// show/hide menu on small devices
	$scope.menuSmActive = '';
	$scope.hideMenuSm = true;
	$scope.menuShowHideSm = function(){
		if($scope.hideMenuSm){
			$scope.hideMenuSm = false;
			$scope.menuSmActive = 'active';
		}
		else{
			$scope.hideMenuSm = true;
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
	$scope.hideModalOverlay = true;

	$scope.hideLoginModal = true;
	$scope.showHideLogin = function(){
		if($scope.hideLoginModal){
			$scope.hideModalOverlay = false;
			$scope.hideLoginModal = false;
		}
		else{
			$scope.hideModalOverlay = true;
			$scope.hideLoginModal = true;
			$scope.loginUsernameError = false;
			$scope.loginPasswordError = false;
			$scope.submitError = false;
			$scope.loginSuccess = false;
			$scope.loginUsername = '';
			$scope.loginPassword = '';
		}
	};

	$scope.hideRegisterModal = true;
	$scope.showHideRegister = function(){
		if($scope.hideRegisterModal){
			$scope.hideModalOverlay = false;
			$scope.hideRegisterModal = false;
		}
		else{
			$scope.hideModalOverlay = true;
			$scope.hideRegisterModal = true;
			$scope.registerUsernameError = false;
			$scope.registerPassError = false;
			$scope.registerPassConfError = false;
			$scope.registerEmailError = false;
			$scope.registerFNameError = false;
			$scope.registerLNameError = false;
			$scope.registerSuccess = false;
			$scope.registerUsername = '';
			$scope.registerPass = '';
			$scope.registerPassConf = '';
			$scope.registerEmail = '';
			$scope.registerFName = '';
			$scope.registerLName = '';
		}
	};


	// login processing
	$scope.loginUsername = '';
	$scope.loginPassword = '';

	$scope.processLogin = function(){

		$scope.loginUsernameError = false;
		$scope.loginPasswordError = false;
		$scope.submitError = false;
		$scope.loginSuccess = false;

		// creates reference point for descendent scopes
		var self = this;

		if(self.loginUsername === ''){
			$scope.loginUsernameError = 'please enter a username';
			return false;
		}
		else if(self.loginPassword === ''){
			$scope.loginPasswordError = 'please enter a password';
			return false;
		}
		else{

			$http.post('/game_on/api/api.php', {
				'loginUsername':self.loginUsername,
				'loginPassword':self.loginPassword
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
					$scope.sessionActive = true;

					$timeout(function(){
						$scope.showHideLogin();
					}, 1000);
				}
			});
		}

	};


	// logout user
	$scope.logout = function(){
		$http.get('/game_on/api/api.php?logout')
		.then(function success(){
			$scope.sessionActive = false;
			$scope.userInfo = {};
		});
	};


	// user registration procesing
	$scope.registerUsername = '';
	$scope.registerPass = '';
	$scope.registerPassConf = '';
	$scope.registerEmail = '';
	$scope.registerFName = '';
	$scope.registerLName = '';

	$scope.processReg = function(){


		$scope.registerUsernameError = false;
		$scope.registerPassError = false;
		$scope.registerPassConfError = false;
		$scope.registerEmailError = false;
		$scope.registerFNameError = false;
		$scope.registerLNameError = false;
		$scope.registerSuccess = false;

		// creates reference point for descendent scopes
		var self = this;

		// username registration validation
		// check if username exists
		$http.get('/game_on/api/api.php?user-exists='+self.registerUsername)
		.then(function success(response){
			
			// password requirements
			var hasUppercase = /[A-Z]/.test(self.registerPass);
			var hasLowercase = /[a-z]/.test(self.registerPass);
			var hasNumber = /\d/.test(self.registerPass);

			// email address requirement
			var validEmail = /^[\w]+@[\w]+\.([\w]{2,}|[\w]{2,3}\.[\w]{2})$/i.test(self.registerEmail);

			// registration username validation
			var userExists = response.data;
			if(userExists === 'true'){
				$scope.registerUsernameError = 'username already exists';
				return false;
			}
			else if(self.registerUsername.length < 4 || self.registerUsername.length > 10){
				$scope.registerUsernameError = 'must be between 4 and 10 characters';
				return false;
			}


			// registration password validation
			else if(self.registerPass.length < 7){
				$scope.registerPassError = 'must contain at least 7 characters';
				return false;
			}
			else if(!hasUppercase || !hasLowercase || !hasNumber){
				$scope.registerPassError = 'must contain 1 lowercase letter, 1 uppercase letter and 1 number';
				return false;
			}


			// registration password confirmation validation
			else if(self.registerPass !== self.registerPassConf){
				$scope.registerPassConfError = 'must match password';
				return false;
			}


			// registration email address validation
			else if(!validEmail){
				$scope.registerEmailError = 'invalid email address';
				return false;
			}


			// registration first name validation
			else if(self.registerFName === ''){
				$scope.registerFNameError = 'please enter a first name';
				return false;
			}


			// registration first name validation
			else if(self.registerLName === ''){
				$scope.registerLNameError = 'please enter a last name';
				return false;
			}


			// successful validation
			else{
				$http.post('/game_on/api/api.php', {
					'user-registration':true,
					'username':self.registerUsername,
					'password':self.registerPass,
					'email':self.registerEmail,
					'fName':self.registerFName,
					'lName':self.registerLName
				})
				.then(function success(response){
					$scope.registerSuccess = 'successfully registered as '+self.registerUsername;

					$timeout(function(){
						$scope.showHideRegister();
						$scope.registerSuccess = false;
					}, 1200);
				});
			}

		});
	};

	$scope.hideLoadingOverlay = true;
}]);