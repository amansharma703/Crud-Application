<?php
require_once 'conn.php';

$query = "SELECT * FROM `datas`";
$res = mysqli_query($conn, $query);
$response = array();

if (mysqli_num_rows($res)) {
    while ($row = mysqli_fetch_assoc($res)) {
        $response[] = $row;
    }
} else {
    $response["msg"] = "No record found";
}

// sending response
echo json_encode($response);
