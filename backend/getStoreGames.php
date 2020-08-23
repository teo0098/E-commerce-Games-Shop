<?php
    include "CORS.php";
    include "dbCredentials.php";
    include "dbConnection.php";

    error_reporting(E_ERROR | E_PARSE);

    $dbConnect = new DbConnect($dbHost, $dbUser, $dbPassword, $dbName);

    header('Content-Type: application/json');

    if ($dbConnect->connect()) {
        $connect = $dbConnect->getConnection();
        $category = $_GET['category'];
        $page = $_GET['page'];
        if (!preg_match('/^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\-\s]{1,29})?$/', $category) || !preg_match('/^[1-9]([0-9]{1,6})?$/', $page)) {
            echo json_encode("ERROR");
        }
        else {
            $sqlCountRows;
            if ($category == 'All') {
                $sqlCountRows = "SELECT COUNT(*) AS amount FROM games ";
            }
            else {
                $sqlCountRows = "SELECT COUNT(*) AS amount FROM games JOIN games_categories ON games.gameID=games_categories.gameID AND games_categories.category='$category'";
            }
            $resultCountRows = mysqli_query($connect, $sqlCountRows);
            if (!$resultCountRows) {
                echo json_encode("ERROR");
            }
            else {
                $pageNumber = ($page * 5) - 5;
                $rowCount =  mysqli_fetch_assoc($resultCountRows);
                $sqlQuery;
                if ($category == 'All') {
                    $sqlQuery = "SELECT * FROM games ORDER BY gameRel DESC LIMIT $pageNumber,5";
                }
                else {
                    $sqlQuery = "SELECT * FROM games JOIN games_categories ON games.gameID=games_categories.gameID AND games_categories.category='$category' ORDER BY games.gameRel DESC LIMIT $pageNumber,5";
                }
                $result = mysqli_query($connect, $sqlQuery);
                if (!$result) {
                    echo json_encode("ERROR");
                }
                else {
                    $entireData = array();
                    $entireData[] = $rowCount['amount'];
                    $data = array();
                    while ($row = mysqli_fetch_assoc($result)) {
                        $data[] = $row;
                    }
                    $entireData[] = $data;
                    echo json_encode($entireData);
                }
            }
        }  
    }
    else {
        echo json_encode("ERROR");
    }
?>