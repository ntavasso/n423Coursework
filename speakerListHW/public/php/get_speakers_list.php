<?php
include("php/connect.php");

$query = "SELECT id, firstName, lastName, suffix, age, description, photo from speakers";
$result = mysqli_query($link, $query);

$speakers = Array();
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)){
	
	$speakers[] = Array( 	"id" => $row["id"],
							"firstName" => $row["firstName"],
							"lastName" => $row["lastName"],
							"title" => $row["title"],
							"suffix" => $row["suffix"],
							"age" => $row["age"],
							"description" => $row["description"],
							"photo" => $row["photo"] );
}

echo json_encode($speakers);

?>