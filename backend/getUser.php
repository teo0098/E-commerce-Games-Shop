<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $userNickname = mysqli_real_escape_string($connect, $_GET["user"]);
        if (!preg_match('/^[A-Z0-9a-z]{5,15}$/', $userNickname)) {
            echo json_encode('ERROR');
        }
        else {
            $sqlQuery = "";
            if ($_GET["mode"] == "employees") {
                $sqlQuery = "SELECT `employeeID`, `name`, `lastname`, `email`, `phone`, `nickname` FROM employees WHERE nickname='$userNickname'";
            }
            else if ($_GET["mode"] == "customers") {
                $sqlQuery = "SELECT `customerID`, `name`, `lastname`, `email`, `phone`, `nickname` FROM customers WHERE nickname='$userNickname'";
            }
            $result = mysqli_query($connect, $sqlQuery);
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_assoc($result);
                echo json_encode($row);
            }
            else {
                echo json_encode("ERROR");
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>