<?php
session_start();

include 'functions.php';

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


// user logout
if(isset($_GET['logout'])){
	session_unset();
	session_destroy();
	session_start();
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