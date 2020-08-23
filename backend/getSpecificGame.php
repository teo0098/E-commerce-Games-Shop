<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);
    
    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $game = $_GET['game'];
        if (!preg_match('/^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ:\-\s]{1,49})?$/', $game)) {
            echo json_encode('ERROR');
        }
        else {
            $sqlQuery1 = "SELECT * FROM games WHERE gameName='$game'";
            $result1 = mysqli_query($connect, $sqlQuery1);
            if ($result1->num_rows > 0) {
                $data1 = array();
                $row1 = mysqli_fetch_assoc($result1);
                $data1[] = $row1;
                $gameID = $row1["gameID"];
                $sqlQuery2 = "SELECT category FROM games_categories WHERE gameID=$gameID";
                $result2 = mysqli_query($connect, $sqlQuery2);
                $sqlQuery3 = "SELECT console FROM games_consoles WHERE gameID=$gameID";
                $result3 = mysqli_query($connect, $sqlQuery3);
                if (!$result2 || !$result3) {
                    echo json_encode("ERROR");
                }
                else {
                    $data2 = array();
                    $data3 = array();
                    while($row2 = mysqli_fetch_assoc($result2)) {
                        $data2[] = $row2;
                    }
                    while($row3 = mysqli_fetch_assoc($result3)) {
                        $data3[] = $row3;
                    }
                    $data1[] = $data2;
                    $data1[] = $data3;
                    echo json_encode($data1);
                }
            }
            else {
                echo json_encode('NOTFOUND');
            }
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>