<?php
include("php/connect.php");

$query = "SELECT id, fName, lName, email, comment, timestamp from contacts
		  ORDER BY timestamp DESC	";
$result = mysqli_query($link, $query);

$messages = Array();
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)){
	// if($row["comment"] < ' '){$row["comment"] = "--No Message--";}
	
	$messages[] = Array( 	"contactId" => $row["contactId"],
							"fName" => $row["fName"],
							"lName" => $row["lName"],
							"email" => $row["email"],
							"comment" => $row["comment"],
							"timestamp" => $row["timestamp"]);
} //while
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Speaker List</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Montserrat:700&display=swap" rel="stylesheet">


</head>
  <body>
  <nav>
    </nav>  <!-- end nav-bar -->

    <section class="contactView">
        <div class="wrapper">
        <h1>Contacts</h1>
				<?php
				// if(count($messages) < 1){ echo '<div class="message-notice"> There are no messages at this time.</div>'; }
				
                foreach ($messages as $message){
                    echo '	<div class="message">
								<div class="message-header">'
									.$message["timestamp"].': <span>'.$message["fName"].' '.$message["lName"].' &lt;'.$message["email"].'&gt;</span> wrote:
								</div>
								<div class="message-comment">'.$message["comment"].'</div>
								<a href="mailto:'.$message["email"].'">Reply</a>
							</div>  <!--/.message -->
							';
                }// foreach
                ?>
        </div>
			</section>


    </body>
    <footer>
        <!-- <div class="wrapper"> -->
        <div class="copyright">
            <p>Copyright © 2019 Conference for Friends</p>
        </div>
        <div class="footerText">
            <div class="footerHome">
                <a href="#">Home</a>
            </div>
            <div class="footerJSON">
                <a href="#">JSON Speakers</a>
            </div>
            <div class="footerMySQL">
                <a href="#">MySQL Speakers</a>

            </div>
            <div class="footerAbout">
                <a href="#">About</a>
            </div>
            <div class="footerContact">
                <a href="#">Contact</a>
            </div>
            <div class="footerLogin">
                <a href="#">Login</a>
            </div>
        </div>
        <div class="social">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-twitter-square"></i>
        </div>
        <!-- </div> -->
    </footer>


    <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase.js"></script>
    <script src="/https:/www.gstatic.com/firebase/6.6.1/firebase-auth.js"></script>
    <script src="/https:/www.gstatic.com/firebase/6.6.1/firebase-firestore.js"></script>
    <script src="/https:/www.gstatic.com/firebase/6.6.1/firebase-database.js"></script>
    <script src="/https:/www.gstatic.com/firebase/6.6.1/firebase-messaging.js"></script>
    <script src="/https:/www.gstatic.com/firebase/6.6.1/firebase-storage.js"></script>
    <script src="/https:/www.gstatic.com/firebase/init.js"></script>

    <!-- <script src="/__/firebase/6.6.1/firebase-app.js"></script>
    <script src="/__/firebase/6.6.1/firebase-auth.js"></script>
    <script src="/__/firebase/6.6.1/firebase-firestore.js"></script>
    <script src="/__/firebase/6.6.1/firebase-database.js"></script>
    <script src="/__/firebase/6.6.1/firebase-messaging.js"></script>
    <script src="/__/firebase/6.6.1/firebase-storage.js"></script> 
    <script src="/__/firebase/init.js"></script> -->
    <script src="lib/jquery-3.4.1.min.js"></script>
    <script src="app/firebase-model.js"></script>
    <script src="app/navbar.js"></script>
    <script src="app/app.js"></script>
</body>

</html>