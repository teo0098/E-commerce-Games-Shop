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
        $name = mysqli_real_escape_string($connect, $_POST["name"]);
        $lastName = mysqli_real_escape_string($connect, $_POST["lastname"]);
        $phone = mysqli_real_escape_string($connect, $_POST["phone"]);
        $nickname = mysqli_real_escape_string($connect, $_POST["nickname"]);
        $email = mysqli_real_escape_string($connect, $_POST["email"]);
        $id = mysqli_real_escape_string($connect, $_POST["id"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,20}$/', $name)
        || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,30}$/', $lastName) || !preg_match('/^[\d]{4,13}$/', $phone)
        || !preg_match('/^[A-Z0-9a-z]{5,15}$/', $nickname) || !preg_match('/^[0-9]+$/', $id)) 
        {
            echo json_encode('ERROR');
        }
        else {
            $table = mysqli_real_escape_string($connect, $_POST["mode"]);
            $sqlQuery1 = "";
            $sqlQuery2 = "";
            $sqlQuery3 = "";
            if ($table == "employees") {
                $sqlQuery1 = "SELECT * FROM $table WHERE phone='$phone' AND employeeID!=$id";
                $sqlQuery2 = "SELECT * FROM $table WHERE nickname='$nickname' AND employeeID!=$id";
                $sqlQuery3 = "SELECT * FROM $table WHERE email='$email' AND employeeID!=$id";
            }
            else if ($table == "customers") {
                $sqlQuery1 = "SELECT * FROM $table WHERE phone='$phone' AND customerID!=$id";
                $sqlQuery2 = "SELECT * FROM $table WHERE nickname='$nickname' AND customerID!=$id";
                $sqlQuery3 = "SELECT * FROM $table WHERE email='$email' AND customerID!=$id";
            }
            $result1 = mysqli_query($connect, $sqlQuery1);
            $result2 = mysqli_query($connect, $sqlQuery2);
            $result3 = mysqli_query($connect, $sqlQuery3);
            if ($result1->num_rows == 0 && $result2->num_rows == 0 && $result3->num_rows == 0) {
                $sqlQuery4 = "";
                if ($table == "employees") {
                    $sqlQuery4 = "UPDATE employees SET `name`='$name', `lastname`='$lastName', `phone`='$phone', `nickname`='$nickname', `email`='$email' WHERE `employeeID`=$id";
                }
                else if ($table == "customers") {
                    $sqlQuery4 = "UPDATE customers SET `name`='$name', `lastname`='$lastName', `phone`='$phone', `nickname`='$nickname', `email`='$email' WHERE `customerID`=$id";
                    $sqlSelect = "SELECT * FROM customers WHERE customerID=$id";
                    $resultSelect =  mysqli_query($connect, $sqlSelect);
                    if (!$resultSelect) {
                        $sqlQuery4 = "";
                    }
                    else {
                        $row = mysqli_fetch_assoc($resultSelect);
                        $oldEmail = $row["email"];
                        $sqlQuery5 = "UPDATE orders SET `customerEmail`='$email', `customerPhone`='$phone' WHERE `customerEmail`='$oldEmail'";
                        $result5 = mysqli_query($connect, $sqlQuery5);
                        if (!$result5) {
                            $sqlQuery4 = "";
                        }
                    }
                }
                if ($sqlQuery4 == "") {
                    echo json_encode('ERROR');
                }
                else {
                    $result4 = mysqli_query($connect, $sqlQuery4);
                    if (!$result4) {
                        echo json_encode("ERROR");
                    }
                    else if ($table == "customers") {
                        $sqlQueryJWT = "SELECT `name`, `lastname`, `phone`, `nickname`, `email` FROM $table WHERE `customerID`=$id";
                        $resultJWT = mysqli_query($connect, $sqlQueryJWT);
                        if ($resultJWT) {
                            $rowJWT = mysqli_fetch_assoc($resultJWT);
                            $data = array();
                            $data[] = $rowJWT;
                            $data[] = 'Customer';
                            $jwtToken = JWT::encode($data, $JWT_SIGNATURE);
                            echo json_encode($jwtToken);
                        }
                        else {
                            echo json_encode("ERROR");
                        }
                    }
                }
            }
            else if ($result1->num_rows > 0) {
                echo json_encode("PHONEEXISTS");
            }
            else if ($result2->num_rows > 0) {
                echo json_encode("NICKNAMEEXISTS");
            }
            else if ($result3->num_rows > 0) {
                echo json_encode("EMAILEXISTS");
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