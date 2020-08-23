<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        if ($_POST['mode'] == "customers") {
            $password = mysqli_real_escape_string($connect, $_POST["password"]);
            $nickname = mysqli_real_escape_string($connect, $_POST["nickname"]);
            if (!preg_match('/^[A-Z0-9a-z!@#$_]{8,20}$/', $password) || !preg_match('/^[A-Z0-9a-z]{5,15}$/', $nickname)) {
                echo json_encode('ERROR');
            }
            else {
                $sqlSelectCustomer = "SELECT * FROM customers WHERE nickname='$nickname'";
                $resultSelectCustomer = mysqli_query($connect, $sqlSelectCustomer);
                if (!$resultSelectCustomer || $resultSelectCustomer->num_rows == 0) {
                    echo json_encode('ERROR');
                }
                else {
                    $row = mysqli_fetch_assoc($resultSelectCustomer);
                    if (!password_verify($password, $row['password'])) {
                        echo json_encode('ERROR');
                    }
                    else {
                        $sqlDeleteAccount = "DELETE FROM customers WHERE nickname='$nickname'";
                        $resultDeleteAccount = mysqli_query($connect, $sqlDeleteAccount);
                        if (!$sqlDeleteAccount) {
                            echo json_encode('ERROR');
                        }
                    }
                }
            }
        }
        else {
            $ID = mysqli_real_escape_string($connect, $_POST["ID"]);
            if (!preg_match('/^[0-9]+$/', $ID)) {
                echo json_encode('ERROR');
            }
            else {
                $sqlQuery = "";
                if ($_POST['mode'] == "employees") {
                    $sqlQuery = "DELETE FROM employees WHERE employeeID=$ID";
                }
                else if ($_POST['mode'] == "games") {
                    $sqlQuery = "DELETE FROM games WHERE gameID=$ID";
                    $sqlQuery2 = "DELETE FROM games_categories WHERE gameID=$ID";
                    $resul2 = mysqli_query($connect, $sqlQuery2);
                    if (!$resul2) {
                        echo json_encode("ERROR");
                        $sqlQuery = "";
                    }
                }
                if ($sqlQuery != "") {
                    $result = mysqli_query($connect, $sqlQuery);
                    if (!$result) {
                        echo json_encode("ERROR");
                    }
                }
                else {
                    echo json_encode('ERROR');
                }
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>