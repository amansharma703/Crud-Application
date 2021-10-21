<?php
require_once 'conn.php';
$data = file_get_contents("php://input");
$id  = $data;

// deleton query
$query = "DELETE FROM `datas` WHERE `datas`.`id` = $id";
if (mysqli_query($conn, $query)) {
    $response["msg"] = "User deleted successfully";
} else {
    $response["msg"] = "Unable to delete User";
}

// sending response
echo json_encode($response);
