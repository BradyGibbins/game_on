<?php

$con = mysqli_connect('localhost', 'root', '', 'game_on') or false;

function sanitise($input){
	global $con;

	$input = mysqli_real_escape_string($con, $input);
	$input = stripslashes($input);
	$input = htmlspecialchars($input);

	return $input;
}

function query($sql){
	global $con;	
	$query = mysqli_query($con, $sql);

	if($query){
		return $query;
	}
	else{
		return false;
	}
}

function userAuth($username, $password){

	$userExists = query('SELECT * FROM users WHERE username = "'.$username.'"');

	if($userExists){
		$userDetails = mysqli_fetch_assoc($userExists);
		$dbPass = $userDetails['user_password'];

		if(password_verify($password, $dbPass)){
			$user = array(
					'id' => $userDetails['user_id'],
					'type' => $userDetails['user_type_id'],
					'username' => $userDetails['username'],
					'email' => $userDetails['user_email'],
					'fname' => $userDetails['user_fname'],
					'lname' => $userDetails['user_lname'],
					'img' => $userDetails['user_img']
				);
			return json_encode($user);
		}
	}
	else{
		return false;
	}

}


?>