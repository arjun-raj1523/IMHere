<?php
$server = "localhost";
$username = "arjunraj_admin";
$password = "iamhere";
$database = "arjunraj_IMHere";



// Create connection
$conn = new mysqli($server, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$email = $_GET["email"];
/*if($email!="ab@s.com")
echo $email;
*/
$sendid = mysql_real_escape_string($_POST["sendid"]);
$lat = mysql_real_escape_string($_POST["lat"]);
$longi = mysql_real_escape_string($_POST["longi"]);

$sql = "SELECT * FROM location WHERE sendid ='".$sendid."'";

 $result = $conn->query($sql);

 if ($result->num_rows > 0) {
    
   while($row = $result->fetch_assoc()) {
        
        echo "{\"records\":[{\"lat\":\"" . $row["lat"]. "\",\"longi\":\"". $row["longi"]. "\"}]}" ;
          
    }

//{"records":[{"Name":"Arjun","City":"Chicago","Country":"USA"}]}
} else {
    echo "0 results";
}


$conn->close();


?>