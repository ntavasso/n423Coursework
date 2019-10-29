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
// if(isset($_REQUEST["password"])) { $password = password_hash($_REQUEST["password"], PASSWORD_DEFAULT); }

$success = false;
$valid_link = false;
$password = false;
$pwd_length = false;

//get the timestamp to test whether the link has expired
$sql = "SELECT user_id, timestamp FROM password_reset_log 
		WHERE reset_token = '".$token."' ";
$result = mysqli_query($link, $sql); 
if (mysqli_num_rows($result) == 1){
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	$user_id = $row["user_id"];
	$link_time = $row["timestamp"];
	
    //compare the timestamp with present time --result is in seconds
    //this is a MYSQL function, which is reeturned as though it is a table column
	$sql = "SELECT TIMESTAMPDIFF(SECOND, '".$link_time."', NOW()) as time_elapsed";
	$result = mysqli_query($link, $sql);
		
	$row = mysqli_fetch_array($result, MYSQLI_BOTH);
	if ($row["time_elapsed"] < 3601){  //3600 seconds is one hour
		//link is not expired  -- reset the password
		$valid_link = true;
	}
	if($valid_link){
        //handle the password
        //1. don't sanitize the password -- encryption removes the need
        if(isset($_REQUEST["password"])){ $password = $_REQUEST["password"]; }
        //2. check the length -- we want at least 8 characters

        if(strlen($password) > 7){$pwd_length = true; }
        //3.encrypt the password -- no need to sanitize it if encryption is used
        if($pwd_length){
	        //php's password_hash method: (note password_hash returns false if the encryption fails)
	        $password = password_hash($password, PASSWORD_DEFAULT);
        }else{
            $password = false;
        }

        if($password){
            $sql = "UPDATE users SET password = '".$password."' WHERE id = '".$user_id."' ";
            $result = mysqli_query($link, $sql);
            //when inserting, we can check for affected rows, 
            //but an UPDATE might be sucessful while not affecting any rows
            //if the updated value is the same as the previous value
            //we use mysqli_errno to tell us if the error number is 0, meaning everything is good.
            if(mysqli_errno($link) == 0){
                $success = true; //the update was successful
            }
            //link should not be used again -- delete the record
            $sql = "DELETE from password_reset_log 
            WHERE reset_token = '".$token."' ";
            $result = mysqli_query($link, $sql); 
        }//if $password
    }
}//if (mysqli_num_rows($result) == 1)


	


$message_array=Array();
if (($success)&&($valid_link)){
	$message_array["status"] = "success";
	$message_array["line1"] = 'Your password has been reset.';
	$message_array["line2"] = 'Log in with your new credentials.';
	$message_array["url"] = "login_json.html";
	$message_array["link"] = "Log In";
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
    if(!$pwd_length){
		$message_array["status"] = "password_error";
		$message_array["line1"] = "The password must be at least 8 characters long.";
	}
}// --end-- else if(($success)&&($valid_link))
 
session_write_close();

echo json_encode($message_array);
