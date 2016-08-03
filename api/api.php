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

	// file upload
	
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