<?php
    require_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        try {
            $connect = $dbConnect->getConnection();
            $decoded = JWT::decode($_POST["jwtToken"], $JWT_SIGNATURE, array('HS256'));
            $decodedEmail = $decoded[0]->email;
            $decodedMode = $decoded[1];
            $table = "";
            if ($decodedMode == "Administrator") $table = "admins";
            else if ($decodedMode == "Employee") $table = "employees";
            else if ($decodedMode == "Customer") $table = "customers";
            $sqlQuery = "SELECT * FROM $table WHERE email='$decodedEmail'";
            $result = mysqli_query($connect, $sqlQuery);
            if ($result->num_rows < 1 || $decodedMode != $_POST['role']) {
                echo json_encode('NOTAUTH');
            }
        }
        catch (Exception $e) {
            echo json_encode('NOTAUTH');
        }
    }
    else {
        echo json_encode('ERROR');
    }
?>