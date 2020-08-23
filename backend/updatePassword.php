<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $id = mysqli_real_escape_string($connect, $_POST["id"]);
        if ($_POST['mode'] == "employees") {
            $password = mysqli_real_escape_string($connect, $_POST["password"]);
            if (!preg_match('/^[A-Z0-9a-z!@#$_]{8,20}$/', $password) || !preg_match('/^[0-9]+$/', $id)) {
                echo json_encode('ERROR');
            }
            else {
                $newPassword = password_hash($password, PASSWORD_DEFAULT);
                $sqlQuery = "UPDATE employees SET `password`='$newPassword' WHERE `employeeID`=$id";
                $result = mysqli_query($connect, $sqlQuery);
                if (!$result) {
                    echo json_encode("ERROR");
                }
            }
        }
        else if ($_POST['mode'] == "customers") {
            $oldpassword = mysqli_real_escape_string($connect, $_POST["oldpassword"]);
            $newpassword = mysqli_real_escape_string($connect, $_POST["newpassword"]);
            if (!preg_match('/^[A-Z0-9a-z!@#$_]{8,20}$/', $oldpassword) || !preg_match('/^[A-Z0-9a-z!@#$_]{8,20}$/', $newpassword)
            || !preg_match('/^[0-9]+$/', $id)) {
                echo json_encode('ERROR');
            }
            else {
                $sqlQuery1 = "SELECT * FROM customers WHERE customerID=$id";
                $result1 = mysqli_query($connect, $sqlQuery1);
                if (!$result1 || $result1->num_rows == 0) {
                    echo json_encode("ERROR");
                }
                else {
                    $row = mysqli_fetch_assoc($result1);
                    if (!password_verify($oldpassword, $row["password"])) {
                        echo json_encode("ERROR");
                    }
                    else {
                        $newPassword = password_hash($newpassword, PASSWORD_DEFAULT);
                        $sqlQuery2 = "UPDATE customers SET `password`='$newPassword' WHERE `customerID`=$id";
                        $result2 = mysqli_query($connect, $sqlQuery2);
                        if (!$result2) {
                            echo json_encode("ERROR");
                        }
                    }
                }
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>