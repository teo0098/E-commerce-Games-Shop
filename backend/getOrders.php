<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        if ($_GET['mode'] == 'history') {
            if (!filter_var($_GET['customer'], FILTER_VALIDATE_EMAIL)) {
                echo json_encode('ERROR');
            }
            else {
                $customer = $_GET['customer'];
                $sqlQuery = "SELECT * FROM orders WHERE customerEmail='$customer' ORDER BY orderDate DESC";
                $result = mysqli_query($connect, $sqlQuery);
                if (!$result) {
                    echo json_encode("ERROR");
                }
                else {
                    $data = array();
                    while ($row = mysqli_fetch_assoc($result)) {
                        $data[] = $row;
                    }
                    echo json_encode($data);
                }
            }
        }
        else {
            $sqlQuery = "SELECT * FROM orders ORDER BY orderDate DESC";
            $result = mysqli_query($connect, $sqlQuery);
            if (!$result) {
                echo json_encode("ERROR");
            }
            else {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
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