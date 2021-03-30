<?php
    require_once "./vendor/autoload.php";
    include "CORS.php";
    include "dbCredentials.php";

    error_reporting(E_ERROR | E_PARSE);
    
    header('Content-Type: application/json'); 

    $from = $_POST["from"];
    $msg = $_POST['msg'];
    $name = $_POST['name'];
    $subject = "Games Shop Contact Message";
    $message = "<p style='padding: 20px; line-height: 1.5;'>$msg</p>";
    $googleRecaptcha = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$recaptcha_secret_key.'&response='.$_POST['recaptcha']);
    $response = json_decode($googleRecaptcha);
    if ($response->success==false) {
        echo json_encode('RECAPTCHA');
    }
    else {
        $sendgridEmail = new \SendGrid\Mail\Mail(); 
        $sendgridEmail->setFrom("$from", "$name");
        $sendgridEmail->setSubject("Games Shop contact help");
        $sendgridEmail->addTo($authEmail);
        $sendgridEmail->addContent(
            "text/html", "$message"
        );
        $sendgrid = new \SendGrid($GAMES_SHOP_SENDGRID_KEY);
        try {
            $response = $sendgrid->send($sendgridEmail);
            if ($response->statusCode() != 202) {
                echo json_encode("ERROR");
            }
        } catch (Exception $e) {
            echo json_encode("ERROR");
        }
    }
?>