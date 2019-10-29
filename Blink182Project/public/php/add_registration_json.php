<?php
include("connect.php");

function sanitize($item){
	global $link;  //to use $link within the scope of this function, you must use the keyword "global"
	$item = html_entity_decode($item);
	$item = trim($item);
	$item = stripslashes($item);
	$item = strip_tags($item);
	$item = mysqli_real_escape_string( $link, $item );
	return $item;
}

$firstName = '';
$lastName = '';
$company = '';
$email = '';
$password = '';
$role = 0;
if(isset($_REQUEST["firstName"])) { $firstName = sanitize($_REQUEST["firstName"]); }
if(isset($_REQUEST["lastName"])) { $lastName = sanitize($_REQUEST["lastName"]); }
if(isset($_REQUEST["company"])) { $company = sanitize($_REQUEST["company"]); }
if(isset($_REQUEST["email"])) { $email = sanitize($_REQUEST["email"]); }
if(isset($_REQUEST["password"])) { $password = sanitize($_REQUEST["password"]); }
if(isset($_REQUEST["role"])) { $role = sanitize($_REQUEST["role"]); }

$sql = "INSERT INTO `users` (`id`, `firstName`, `lastName`, `company`, `email`, `password`, `role`) 
		VALUES (NULL, '".$firstName."', '".$lastName."', '".$company."', '".$email."', '".$password."', '".$role."')";
		
$result = mysqli_query($link, $sql);	

if (mysqli_affected_rows($link) == 1){	
	$success = true;
}else{
	$success = false;
}

$message_array	= Array();
if ($success){
	$user_id = mysqli_insert_id($link); //this gets the most recent "AUTO INCREMENT" id value
	session_start();
	$_SESSION["user_id"] = $user_id;
	$_SESSION["role"] = $role;
	
	$message_array["line1"] = 'Welcome, '.$firstName.' '.$lastName.'! Thanks for your registration.';
	$message_array["line2"] = 'You are now logged in.';
}else{
	$message_array["line1"] = 'Something went very wrong, and your registration failed.';
	$message_array["line2"] = 'Sorry.';
}

$message_array["url"] = "registration_json.html";
$message_array["link"] = "Return to Registration Form";

session_write_close();

echo json_encode($message_array);

?>
