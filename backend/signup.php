<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $table = mysqli_real_escape_string($connect, $_POST["mode"]);
        $checkRecaptcha = false;
        $error = false;
        if ($table != 'employees') $checkRecaptcha = true;
        if ($checkRecaptcha == true) {
            $googleRecaptcha = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$recaptcha_secret_key.'&response='.$_POST['recaptcha']);
            $response = json_decode($googleRecaptcha);
            if ($response->success==false) {
                echo json_encode('RECAPTCHA');
                $error = true;
            }
        }
        if ($error == false) {
            $name = mysqli_real_escape_string($connect, $_POST["name"]);
            $lastName = mysqli_real_escape_string($connect, $_POST["lastname"]);
            $phone = mysqli_real_escape_string($connect, $_POST["phone"]);
            $nickname = mysqli_real_escape_string($connect, $_POST["nickname"]);
            $email = mysqli_real_escape_string($connect, $_POST["email"]);
            $password = mysqli_real_escape_string($connect, $_POST["password"]);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,20}$/', $name)
            || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,30}$/', $lastName) || !preg_match('/^[\d]{4,13}$/', $phone)
            || !preg_match('/^[A-Z0-9a-z]{5,15}$/', $nickname) || !preg_match('/^[A-Z0-9a-z\!\@\#\$\_]{8,20}$/', $password)) {
                echo json_encode("ERROR");
            }
            else {
                $sqlQuery1 = "SELECT * FROM $table WHERE phone='$phone'";
                $sqlQuery2 = "SELECT * FROM $table WHERE nickname='$nickname'";
                $sqlQuery3 = "SELECT * FROM $table WHERE email='$email'";
                $result1 = mysqli_query($connect, $sqlQuery1);
                $result2 = mysqli_query($connect, $sqlQuery2);
                $result3 = mysqli_query($connect, $sqlQuery3);
                if ($result1->num_rows == 0 && $result2->num_rows == 0 && $result3->num_rows == 0) {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $sqlQuery4 = "";
                    $vkey = md5(time().$nickname);
                    if ($table == "employees") {
                        $sqlQuery4 = "INSERT INTO $table VALUES (NULL, '$name', '$lastName', '$phone', '$nickname', '$email', '$hashedPassword')";
                    }
                    else {
                        $sqlQuery4 = "INSERT INTO verifyCustomers VALUES (NULL, '$name', '$lastName', '$phone', '$nickname', '$email', '$hashedPassword', '$vkey')";
                    }
                    $result4 = mysqli_query($connect, $sqlQuery4);
                    if (!$result4) {
                        echo json_encode("ERROR");
                    }
                    else {
                        if ($table != "employees") {
                            $to = $email;
                            $subject = "Games Shop registration verification";
                            $message = "<a style='text-align: center; padding: 20px; font-weight: bold;' href='https://teo-games-shop.herokuapp.com/verification?vkey=$vkey'>I confirm my registration on Games Shop website</a>";
                            $headers = "MIME-Version: 1.0" . "\r\n";
                            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                            $headers .= "From: Games Shop <$authEmail>" . "\r\n";
                            mail($to, $subject, $message, $headers);
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
    }
    else {
        echo json_encode("ERROR");
    }
?>