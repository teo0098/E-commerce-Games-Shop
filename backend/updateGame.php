<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);
    
    header('Content-Type: application/json'); 

    if ($dbConnect->connect()) {
        $file = $_FILES["image"];
        if ($file) {
            if ($file["error"] <= 0) {
                $gameID = $_POST["gameID"];
                if (!preg_match('/^[0-9]+$/', $gameID)) {
                    echo json_encode('ERROR');
                }
                else {
                    $fileName = $file["name"];
                    $uploadDir = __DIR__.$file_upload_destination;
                    $uploadFile = $uploadDir.basename($fileName);
                    $connect = $dbConnect->getConnection();
                    $gameName = $_POST["gameName"];
                    if (!preg_match('/^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ:\-\s]{1,49})?$/', $gameName)) {
                        echo json_encode('ERROR');
                    }
                    else {
                        $sqlQuery1 = "SELECT * FROM games WHERE gameName='$gameName' AND gameID!=$gameID";
                        $result1 = mysqli_query($connect, $sqlQuery1);
                        if ($result1->num_rows > 0) {
                            echo json_encode('EXISTS');
                        }
                        else {
                            $itemsAmount = mysqli_real_escape_string($connect, $_POST["itemsAmount"]);
                            $gamePrice = mysqli_real_escape_string($connect, $_POST["gamePrice"]);
                            $gameRel = mysqli_real_escape_string($connect, $_POST["gameDate"]);
                            $gameDesc = $_POST["gameDesc"];
                            $gameDesc = filter_var($gameDesc, FILTER_SANITIZE_STRING);
                            $gamePhoto = $imagePath.basename($fileName);
                            $categories = array();
                            $categories[] = mysqli_real_escape_string($connect, $_POST["Action"]);
                            $categories[] = mysqli_real_escape_string($connect, $_POST["RPG"]); 
                            $categories[] = mysqli_real_escape_string($connect, $_POST["Adventure"]); 
                            $categories[] = mysqli_real_escape_string($connect, $_POST["FPS"]); 
                            $categories[] = mysqli_real_escape_string($connect, $_POST["Strategy"]); 
                            $categories[] = mysqli_real_escape_string($connect, $_POST["Sport"]); 
                            $categories[] = mysqli_real_escape_string($connect, $_POST["Simulation"]);
                            $consoles = array();
                            $consoles[] = mysqli_real_escape_string($connect, $_POST["PS3"]);
                            $consoles[] = mysqli_real_escape_string($connect, $_POST["PS4"]); 
                            $consoles[] = mysqli_real_escape_string($connect, $_POST["XBOXONE"]); 
                            $consoles[] = mysqli_real_escape_string($connect, $_POST["Nintendo"]); 
                            $consoles[] = mysqli_real_escape_string($connect, $_POST["PC"]);
                            if (!preg_match('/^[1-9]([0-9]{1,6})?$/', $itemsAmount) || !preg_match('/^[1-9]([0-9]{1,6})?(\.[0-9]{2})?$/', $gamePrice)
                            || !preg_match('/[^`]/', $gameDesc)) 
                            {
                                echo json_encode("ERROR");
                            } 
                            else {
                                $sqlQuery2 = "UPDATE games SET gameName='$gameName', gamePrice=$gamePrice, gameDesc='$gameDesc', gameRel='$gameRel', imageURL='$gamePhoto', itemsAmount=$itemsAmount WHERE gameID=$gameID";
                                $result2 = mysqli_query($connect, $sqlQuery2);
                                if ($result2) {
                                    $sqlQueryDelete = "DELETE FROM games_categories WHERE gameID=$gameID";
                                    $resultDelete = mysqli_query($connect, $sqlQueryDelete);
                                    $sqlQueryDelete2 = "DELETE FROM games_consoles WHERE gameID=$gameID";
                                    $resultDelete2 = mysqli_query($connect, $sqlQueryDelete2);
                                    if (!$resultDelete || !$resultDelete2) {
                                        echo json_encode("ERROR");
                                    }
                                    else {
                                        foreach($categories as $category) {
                                            if ($category != "false") {
                                                $category = filter_var($category, FILTER_SANITIZE_STRING);
                                                $sqlQuery3 = "INSERT INTO games_categories VALUES (NULL, $gameID, '$category')";
                                                $result3 = mysqli_query($connect, $sqlQuery3);
                                            }
                                        }
                                        foreach($consoles as $console) {
                                            if ($console != "false") {
                                                $console = filter_var($console, FILTER_SANITIZE_STRING);
                                                $sqlQuery4 = "INSERT INTO games_consoles VALUES (NULL, $gameID, '$console')";
                                                $result4 = mysqli_query($connect, $sqlQuery4);
                                            }
                                        }
                                        if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
                                            echo json_encode("ERROR");
                                        }
                                    }
                                }
                                else {
                                    echo json_encode("ERROR");
                                }
                            }
                        }
                    }
                }
            }
            else {
                echo json_encode("ERROR");
            }
        }
        else {
            echo json_encode("ERROR");
        }
    }
    else {
        echo json_encode("ERROR");
    }
?>