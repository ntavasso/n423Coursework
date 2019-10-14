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

if(isset($_REQUEST["token"])) { $token = sanitize($_REQUEST["token"]); }

$success = false;
$valid_link = false;

$sql = "SELECT user_id, timestamp FROM password_reset_log 
		WHERE reset_token = '".$token."' ";
$result = mysqli_query($link, $sql); 
if (mysqli_num_rows($result) == 1){
	$success = true; //we found the token
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	$user_id = $row["user_id"];
	$link_time = $row["timestamp"];
	
	//compare the timestamp with present time --result is in seconds
    //this is a MYSQL function, which is reeturned as though it is a table column
	$sql = "SELECT TIMESTAMPDIFF(SECOND, '".$link_time."', NOW()) as time_elapsed";
	$result = mysqli_query($link, $sql);
		
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	if ($row["time_elapsed"] > 3600){  //3600 seconds is one hour
		//link is expired -- delete the record
		$sql = "DELETE from password_reset_log 
				WHERE reset_token = '".$token."' ";
		$result = mysqli_query($link, $sql); 
	}else{
		//link is not expired  -- reset the password
		$valid_link = true;
		//we will keep the record to validate during the update step
	}// -- end else --
	$email = '';
	if($valid_link){
		$sql = "SELECT email FROM users WHERE id = '".$user_id."' ";
		$result = mysqli_query($link, $sql);
		if (mysqli_num_rows($result) == 1){
			$row = mysqli_fetch_array($result, MYSQLI_BOTH);
			$email = $row["email"];	
		}	
	}
}//if (mysqli_num_rows($result) == 1)
	


$message_array=Array();
if (($success)&&($valid_link)){
	$message_array["status"] = "success";
	$message_array["token"] = $token;
	$message_array["email"] = $email;
}else{ //if(($success)&&($valid_link))
	$message_array["status"] = "failed";
	$message_array["line1"] = 'Something went very wrong, and your password reset failed.';
	$message_array["line2"] = 'Sorry.';
	$message_array["url"] = "registration_json.html";
	$message_array["link"] = "Return to Registration Form";
	if(!$valid_link){
		$message_array["status"] = "expired_link";
		$message_array["line1"] = "The password reset link has expired.  Your password cannot be reset with this link.";
	}
}// --end-- else if(($success)&&($valid_link))
 
session_write_close();

echo json_encode($message_array);

?>