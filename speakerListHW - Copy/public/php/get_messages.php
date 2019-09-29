<?php
include("connect.php");

$query = "SELECT id, fName, lName, email, comment, timestamp from contacts
		  ORDER BY timestamp DESC	";
$result = mysqli_query($link, $query);

$messages = Array();
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)){
	if($row["comment"] < ' '){$row["comment"] = "--No Message--";}
	
	$messages[] = Array( 	"contactId" => $row["contactId"],
							"fName" => $row["fName"],
							"lName" => $row["lName"],
							"email" => $row["email"],
							"comment" => $row["comment"],
							"timestamp" => $row["timestamp"]);
} //while

echo json_encode($messages);

?>