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
        $connect = $dbConnect->getConnection();
        $login = mysqli_real_escape_string($connect, $_POST["login"]);
        $password = mysqli_real_escape_string($connect, $_POST["password"]);
        if ((!filter_var($login, FILTER_VALIDATE_EMAIL)) && (!preg_match('/^[A-Z0-9a-z]{5,15}$/', $login)) || !preg_match('/^[A-Z0-9a-z\!\@\#\$\_]{8,20}$/', $password)) {
            echo json_encode('NOTEXISTS');
        }
        else {
            $mode = mysqli_real_escape_string($connect, $_POST["mode"]);
            $table;
            if ($mode == "Administrator") $table = "admins";
            else if ($mode == "Employee") $table = "employees";
            else if ($mode == "Customer") $table = "customers";
            $sqlQuery1 = "SELECT * FROM $table WHERE nickname='$login' OR email='$login'";
            $result1 = mysqli_query($connect, $sqlQuery1);
            if ($result1->num_rows == 0) {
                echo json_encode("NOTEXISTS");
            } 
            else {
                $row1 = mysqli_fetch_assoc($result1);
                if (!password_verify($password, $row1["password"])) {
                    echo json_encode("NOTEXISTS");
                }
                else {
                    $sqlQuery2 = "SELECT `name`, `lastname`, `phone`, `nickname`, `email` FROM $table WHERE nickname='$login' OR email='$login'";
                    $result2 = mysqli_query($connect, $sqlQuery2);
                    if ($result2) {
                        $row2 = mysqli_fetch_assoc($result2);
                        $data = array();
                        $data[] = $row2;
                        $data[] = $mode;
                        $jwtToken = JWT::encode($data, $JWT_SIGNATURE);
                        $data[] = $jwtToken;
                        echo json_encode($data);
                    }
                    else {
                        echo json_encode("ERROR");
                    }
                }
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>