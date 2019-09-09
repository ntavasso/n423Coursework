<?php
////////////////////// MAMP version ///////////////////////

	// $dbhost = 'localhost:8889';
	// $dbuser = 'root';
	// $dbpwd  = 'root';
	// //$dbname = '<your MAMP database name>';
	// $dbname = 'n413';

	// $link = mysqli_connect($dbhost, $dbuser, $dbpwd, $dbname);

	// if (!$link) {
	// 	die('Connect Error (' . mysqli_connect_errno() . ') '
	// 			. mysqli_connect_error());
	// }

//////////////////////////////////////////////////////////

////////////////////// web-4 method /////////////////////

	$dbhost = 'localhost';
	$dbuser = 'ntavasso';
	$dbpwd  = 'ntavasso';
	$dbname = 'ntavasso_db';
	
	$conn = new mysqli($dbhost, $dbuser, $dbpwd, $dbname);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);

	}

	$sql = "SELECT id, firstName, lastName, suffix, age, description, photo  FROM speakers";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstName"]. " " . $row["lastName"]. "<br>";
    }
	} else {
    echo "0 results";
	}
	$conn->close();
//????
	// echo "`<p>${firstName}</p>`,
	// `<p>${listName.suffix}</p>`,
	// `<p>${listName.age}</p>`,
	// `<p>${listName.description}</p>`,
	// `<p><img src="${listName.photo}"></p>`"
?>