<?php
require_once 'conn.php';
// converting JSON encoded string into a PHP variable
$data = json_decode(file_get_contents("php://input"));
$num = $data->num;
$amt = $data->amt;
$id  = $data->userId;

// insertion query
$query = "UPDATE `datas` SET `p_num` = '$num', `p_amt` = '$amt ' WHERE `datas`.`id` = $id";
if (mysqli_query($conn, $query)) {
    $response["msg"] = "Updated successfully";
} else {
    $response["msg"] = "Upation failed";
}
// sending response
echo json_encode($response);
