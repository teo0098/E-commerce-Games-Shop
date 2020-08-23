<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $gameName = $_GET["gameName"];
        if (!preg_match('/^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ:\-\s]{1,49})?$/', $gameName)) {
            echo json_encode("ERROR");
        }
        else {
            $sqlQuery = "SELECT * FROM games WHERE gameName LIKE '%$gameName%'";
            $result = mysqli_query($connect, $sqlQuery);
            if (!$result) {
                echo json_encode("ERROR");
            }
            else {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                echo json_encode($data);
            }
        }  
    }
    else {
        echo json_encode("ERROR");
    }
?>