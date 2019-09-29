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

$email = '';
$password = '';
if(isset($_REQUEST["email"])) { $email = sanitize($_REQUEST["email"]); }
if(isset($_REQUEST["password"])) { $password = sanitize($_REQUEST["password"]); }

$user_id = 0; //this will be the id from the user table record
$role = 0; //this will be the role value from the user table record

$query = "SELECT id, firstName, lastName, role from users
		  WHERE email = '".$email."'
		  AND password = '".$password."'";
		  
$result = mysqli_query($link, $query);	

if (mysqli_num_rows($result) == 1){	
	$success = true;
}else{
	$success = false;
}

$message_array	= Array();
if ($success){
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	$user_id = $row["id"]; //we will use this to determine if there is a log-in
	$firstName = $row["firstName"];
	$lastName = $row["lastName"];
	$role = $row["role"];
	session_start();
	$_SESSION["user_id"] = $user_id;
	$_SESSION["role"] = $role;
	
	$message_array["line1"] = 'Welcome, '.$firstName.' '.$lastName.'!';
	$message_array["line2"] = 'You are now logged in.';
	$message_array["url"] = "logout.html";
	$message_array["link"] = "Logout";
}else{
	$message_array["line1"] = 'Something went very wrong, and your log-in failed.';
	$message_array["line2"] = 'Sorry.';
	$message_array["url"] = "login_json.html";
	$message_array["link"] = "Return to Login Form";
}

session_write_close();

echo json_encode($message_array);

?>
