<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $googleRecaptcha = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$recaptcha_secret_key.'&response='.$_POST['recaptcha']);
        $response = json_decode($googleRecaptcha);
        if ($response->success==false) {
            echo json_encode('RECAPTCHA');
        }
        else {
            $connect = $dbConnect->getConnection();
            $badData = false;
            $product = "";
            for ($i = 0; $i < count($_POST["gamesNames"]); $i++) {
                if (!preg_match('/^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ:\-\s]{1,49})?$/', array_values($_POST["gamesNames"])[$i])
                || !preg_match('/^[1-9]([0-9]{1,6})?(\.[0-9]{2})?$/', array_values($_POST["gamesPrices"])[$i])
                || !preg_match('/^[1-9]([0-9]{1,6})?$/', array_values($_POST["gamesAmounts"])[$i])) {
                    $badData = true;
                    break;
                }
                $product .= array_values($_POST["gamesNames"])[$i] . ", price: " . array_values($_POST["gamesPrices"])[$i] . "$, amount: " . array_values($_POST["gamesAmounts"])[$i] . ";";
            }
            if ($badData == false) {
                $delivery = mysqli_real_escape_string($connect, $_POST["delivery"]);
                $customerName = $_POST["name"] . " " . $_POST["lastname"];
                $customerName = mysqli_real_escape_string($connect, $customerName);
                $customerEmail = mysqli_real_escape_string($connect, $_POST["email"]);
                $customerPhone = mysqli_real_escape_string($connect, $_POST["phone"]);
                $customerAddress = "Location: " . $_POST["location"] . ", street: " . $_POST["street"] . ", apartment's number: " . $_POST["houseNumber"] . ", postal code: " . $_POST["pcode"];
                $customerAddress = mysqli_real_escape_string($connect, $customerAddress); 
                $totalPrice = mysqli_real_escape_string($connect, $_POST["totalPrice"]);
                $payment = mysqli_real_escape_string($connect, $_POST["payment"]);
                $status = "NOT STARTED";
                $orderDate = date("Y-m-d");
                $totalPrice = round($totalPrice, 2);
                if (!preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,20}$/', $delivery) || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,50}$/', $customerName)
                || !filter_var($customerEmail, FILTER_VALIDATE_EMAIL) || !preg_match('/^[\d]{4,13}$/', $customerPhone)
                || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,40}$/', $_POST["location"]) || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,40}$/', $_POST["street"])
                || !preg_match('/^([0-9]{2,10}|([0-9]{2,6}-[0-9]{2,6}))$/', $_POST["pcode"]) || !preg_match('/^[a-zA-Z0-9]{1,5}(\/?[a-zA-Z0-9]{1,5})?$/', $_POST["houseNumber"])
                || !preg_match('/^[1-9]([0-9]+)?(\.[0-9]{2})?$/', $totalPrice) || !preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,20}$/', $payment)) 
                {
                    echo json_encode("ERROR");
                }
                else {
                    $sqlQuery = "INSERT INTO orders VALUES (NULL, '$product', '$delivery', '$customerEmail', '$customerPhone', '$customerName', '$customerAddress', $totalPrice, '$payment', '$status', '$orderDate')";
                    $result = mysqli_query($connect, $sqlQuery);
                    if (!$result) {
                        echo json_encode("ERROR");
                    }
                }
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