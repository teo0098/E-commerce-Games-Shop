<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $sqlQuery = "";
        if ($_GET['mode'] == "employees") {
            $sqlQuery = "SELECT `employeeID`, `name`, `lastname`, `phone`, `email`, `nickname` FROM employees ORDER BY lastname";
        }
        else if ($_GET['mode'] == "customers") {
            $sqlQuery = "SELECT `customerID`, `name`, `lastname`, `phone`, `email`, `nickname` FROM customers ORDER BY lastname";
        }
        if ($sqlQuery != "") {
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
        else {
            echo json_encode("ERROR");
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>