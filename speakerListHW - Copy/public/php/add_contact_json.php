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
$email = '';
$comment = '';
if(isset($_REQUEST["fName"])) { $firstName = sanitize($_REQUEST["fName"]); }
if(isset($_REQUEST["lName"])) { $lastName = sanitize($_REQUEST["lName"]); }
if(isset($_REQUEST["email"])) { $email = sanitize($_REQUEST["email"]); }
if(isset($_REQUEST["comment"])) { $comment = sanitize($_REQUEST["comment"]); }


$sql = "INSERT INTO `contacts` (`contactId`, `fName`, `lName`, `email`, `comment`, timestamp) 
		VALUES (NULL, '".$firstName."', '".$lastName."', '".$email."', '".$comment."', NULL)";
		
$result = mysqli_query($link, $sql);
$success = (mysqli_affected_rows($link) == 1);

$message_array	= Array();

if ($success){	
	$message_array["line1"] = "Thanks for your contact info.";
	$message_array["line2"] = "We'll be back in touch if we feel like it.";
}else{
	$message_array["line1"] = "Something went very wrong, and we lost your contact info.";
	$message_array["line2"] = "Sorry.";
}
$message_array["url"] = "contact_json.html";
$message_array["link"] = "Return to Contact Form";

// echo json_encode($message_array);
?>

