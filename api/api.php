<?php
session_start();

include 'functions.php';

// user login
if(isset($_POST['username']) && isset($_POST['user-pass'])){
	if(userAuth($_POST['username'], $_POST['user-pass'])){
		$userDetails = json_decode(userAuth($_POST['username'], $_POST['user-pass']), true);

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

?>