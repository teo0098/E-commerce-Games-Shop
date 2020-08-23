<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $status = $_POST['status'];
        $orderID = $_POST['orderID'];
        $sqlQuery1 = "UPDATE orders SET `status`='$status' WHERE orderID=$orderID";
        $result1 = mysqli_query($connect, $sqlQuery1);
        if (!$result1) {
            echo json_encode('ERROR');
        }
        else {
            $sqlQuery2 = "SELECT * FROM orders ORDER BY orderDate DESC";
            $result2 = mysqli_query($connect, $sqlQuery2);
            if (!$result2) {
                echo json_encode("ERROR");
            }
            else {
                $data = array();
                while ($row = mysqli_fetch_assoc($result2)) {
                    $data[] = $row;
                }
                echo json_encode($data);
            }
        }  
    }
    else {
        echo json_encode("ERROR");
    }
?>