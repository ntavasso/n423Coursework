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
    $user_id = 0;
    $email = '';
    //get the email address
     if(isset($_REQUEST["email"])) { $email = sanitize($_REQUEST["email"]); }

    //find the account in the database
     $sql = "SELECT * FROM users
             WHERE email = '".$email."'";
     $result = mysqli_query($link, $sql);

     //get the user_id from the record and create a token
     if (mysqli_num_rows($result) == 1){
         $row = mysqli_fetch_array($result, MYSQLI_BOTH);
         $user_id = $row["id"];
         //make unique token
         $token = sha1($email.time());
         

        //put a record in the password reset log that includes the user_id and token
         $sql = "INSERT INTO `password_reset_log` (`id`, `user_id`, `reset_token`, `timestamp`) 
                 VALUES (NULL, '".$user_id."', '".$token."', NOW())";
         $result = mysqli_query($link, $sql); 

        //compose and send an e-mail to the user 
        //*note* this MUST be done from a server that can send email
         if(mysqli_affected_rows($link) == 1){
             $reset_link = "https://in-info-web4.informatics.iupui.edu/~ntavasso/GitHub/n423Coursework/speakerListHW/public/N413_Conference_AdvLogin/json/reset_password.html?token=".$token;
             $to = $_REQUEST["email"];
             $subject = 'Password Reset Request';
             $message = '
                A password reset request has been made for your N413 AdvLogin 4 account that uses this e-mail address.  If you did not initiate this request, please notify the security team at once.
			
                If you made the request, please click on the link below to reset your password.  This link will expire one hour from the time this e-mail was sent.
			
                '.$reset_link;
                
             //be sure the /r/n (carriage return) characters are in DOUBLE QUOTES!  
             //PHP treats single quoted escaped characters differently, and things will break
             $headers = 'From: ntavasso@in-info-web4.informatics.iupui.edu' . "\r\n" .
             'Reply-To:ntavasso@in-info-web4.informatics.iupui.edu' . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

            //send the mail
             mail($to, $subject, $message, $headers);
         }else{
             //otherwise send an error message
             $email_error = "There was a problem with the database.  Your password cannot be reset.";
         }
        
     }else{
         //not found error
         $email_error = "The e-mail address you entered was not found in the database.<br/>
         Check to be sure the e-mail address is correct and try again.";
     }

    $message_array = Array();

    if ($user_id > 0){
        $message_array["status"] = 'success';
        $message_array["line1"] = "A link to reset your password has been mailed to your e-mail address.<br/>The link is valid for 1 hour.";
        
    }else{
        $message_array["status"] = 'failed';
        if($email_error > ""){ $message_array["line1"] = $email_error; }
    }
    $message_array["line2"] = '';
	$message_array["url"] = "login_json.html";
	$message_array["link"] = "Return to Login Form";
    echo json_encode($message_array);
?>