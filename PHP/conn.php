<?php

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

$server = "localhost";
$username = "root";
$password = "";
$database = "crud_angular";

$conn = mysqli_connect($server, $username, $password, $database);

if (!$conn) {  
    die("error" . mysqli_connect_error());
}
