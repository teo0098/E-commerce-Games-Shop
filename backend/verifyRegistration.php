<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $vkey = $_POST["vkey"];
        if (!preg_match('/^[A-Z0-9a-z]+$/', $vkey)) {
            echo json_encode('ERROR');
        }
        else {
            $sqlQuery = "SELECT * FROM verifyCustomers WHERE vkey='$vkey'";
            $result = mysqli_query($connect, $sqlQuery);
            if ($result->num_rows == 0) {
                echo json_encode("ERROR");
            }
            else if ($result->num_rows > 0) {
                $row = mysqli_fetch_assoc($result);
                $name = $row["name"];
                $lastName = $row["lastname"];
                $phone = $row["phone"];
                $nickname = $row["nickname"];
                $email = $row["email"];
                $hashedPassword = $row["password"];
                $sqlInsert = "INSERT INTO customers VALUES (NULL, '$name', '$lastName', '$phone', '$nickname', '$email', '$hashedPassword')";
                $resultInsert = mysqli_query($connect, $sqlInsert);
                $sqlDelete = "DELETE FROM verifyCustomers WHERE vkey='$vkey'";
                $resultDelete = mysqli_query($connect, $sqlDelete);
                if (!$resultInsert || !$resultDelete) {
                    echo json_encode("ERROR");
                }
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>