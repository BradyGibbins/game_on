<?php
session_start();

include 'functions.php';

// checks if request type is post
if($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_POST)){

	// decode JSON input from Angular post request and assign to $_POST array
	$_POST = json_decode(file_get_contents('php://input'), true);

	// user login
	if(isset($_POST['loginUsername']) && isset($_POST['loginPassword'])){

		if(userAuth($_POST['loginUsername'], $_POST['loginPassword'])){
			$userDetails = json_decode(userAuth($_POST['loginUsername'], $_POST['loginPassword']), true);

			$_SESSION['id'] = $userDetails['user_id'];
			echo userInfo($_SESSION['id']);
		}
		else{
			echo '{"error":"invalid credentials"}';
		}
	}

	// file upload validation
	if(isset($_FILES['file'])){
		$fileType = exif_imagetype($_FILES['file']['tmp_name']);

		switch($fileType){
			case 1:
			case 2:
			case 3:
				// file size too large
				if(filesize($_FILES['file']['tmp_name']) > 1024000){
					clearstatcache();
					echo 'too big';
				}
				// uploaded file meets criteria
				else{
					$imgTempPath = $_SERVER['DOCUMENT_ROOT'].'game_on/app/img/imgTmp/'.$_FILES['file']['name'];
					move_uploaded_file($_FILES['file']['tmp_name'], $imgTempPath);
					$_FILES['file']['tmp_name'] = $imgTempPath;
					$_SESSION['file'] = $_FILES['file'];
					echo 'valid';
				}
				break;
			// uploaded file is incorrect type
			default:
				echo 'invalid';
		}
	}

	// user registration
	if(isset($_POST['user-registration'])){
		$userID = newUserID();
		$username = sanitise($_POST['username']);
		$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$email = sanitise($_POST['email']);
		$fName = sanitise($_POST['fName']);
		$lName = sanitise($_POST['lName']);
		$imgFile = @$_SESSION['file'];
		unset($_SESSION['file']);
		$img = sanitise($imgFile['tmp_name']) or $img = '0.png';

		if($img !== '0.png'){
			$imgType = exif_imagetype($imgFile['tmp_name']);
			switch($imgType){
				case 1:
					$imgType = '.gif';
					break;
				case 2:
					$imgType = '.jpg';
					break;
				case 3:
					$imgType = '.png';
					break;
			}
			$imgPath = $_SERVER['DOCUMENT_ROOT'].'game_on/app/img/users/'.$userID.$imgType;
			$imgName = $userID.$imgType;
			rename($img, $imgPath);
		}

		$userInfo = array();

		$userInfo['user_id'] = $userID;
		$userInfo['username'] = $username;
		$userInfo['password'] = $password;
		$userInfo['email'] = $email;
		$userInfo['fName'] = $fName;
		$userInfo['lName'] = $lName;
		$userInfo['img'] = $imgName;


		userRegistration($userInfo);
	}
}

// empties temporary image storage folder
if(isset($_GET['clear-temp-files'])){
	$files = glob($_SERVER['DOCUMENT_ROOT'].'game_on/app/img/imgTmp/*');
	foreach($files as $file){
		if(is_file($file)){
			unlink($file);
		}
	}
}


// check if a session is active
if(isset($_GET['session-status'])){
	if(!sessionActive()){
		echo '{"session":"false"}';
	}
	else{
		echo sessionActive();
	}
}


// user logout
if(isset($_GET['logout'])){
	session_unset();
	session_destroy();
	session_start();
}

// get user info
if(isset($_GET['user-info'])){
	if(!userInfo($_GET['user-info'])){
		echo '{"error":"invalid user id"}';
	}
	else{
		echo userInfo($_GET['user-info']);
	}
}

// check if a username exists
if(isset($_GET['user-exists'])){
	if(!userExists($_GET['user-exists'])){
		echo 'false';
	}
	else{
		echo 'true';
	}
}

// list all platforms
if(isset($_GET['list-platforms'])){
	echo listPlatforms();
}

// get platform details
if(isset($_GET['platform-id'])){
	if(!platformDetails($_GET['platform-id'])){
		echo '{"error":"invalid platform id"}';
	}
	else{
		echo platformDetails($_GET['platform-id']);
	}
}

// list search results
if(isset($_GET['q'])){
	if(!searchResults($_GET['q'])){
		echo '{"error":"no results"}';
	}
	else{
		echo searchResults($_GET['q']);
	}
}


// list all reviews for a platform
if(isset($_GET['platform-reviews'])){
	if(!allPlatformReviews($_GET['platform-reviews'])){
		echo '{"error":"invalid platform id"}';
	}
	else{
		echo allPlatformReviews($_GET['platform-reviews']);
	}
}
?>