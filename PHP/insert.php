<?php
require_once 'conn.php';
// converting JSON encoded string into a PHP variable
$data = json_decode(file_get_contents("php://input"));
$num = $data->num;
$amt = $data->amt;

// insertion sql query
$query = "INSERT INTO `datas` (`p_num`, `p_amt`) VALUES ('$num', '$amt')";
if (mysqli_query($conn, $query)) {
    $response["msg"] = "User Add successfully";
} else {
    $response["msg"] = "Unable to add User";
}

// sending response
echo json_encode($response);
