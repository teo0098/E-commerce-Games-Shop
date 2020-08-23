<?php
    include "CORS.php";
    include "dbCredentials.php";

    error_reporting(E_ERROR | E_PARSE);
    
    header('Content-Type: application/json'); 

    $to = $authEmail;
    $from = $_POST["from"];
    $msg = $_POST['msg'];
    $name = $_POST['name'];
    $subject = "Games Shop Contact Message";
    $message = "<p style='padding: 20px; line-height: 1.5;'>$msg</p>";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $name <$from>" . "\r\n";
    $googleRecaptcha = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$recaptcha_secret_key.'&response='.$_POST['recaptcha']);
    $response = json_decode($googleRecaptcha);
    if ($response->success==false) {
        echo json_encode('RECAPTCHA');
    }
    else {
        if (!mail($to, $subject, $message, $headers)) {
            echo json_encode('ERROR');
        }
    }
?>