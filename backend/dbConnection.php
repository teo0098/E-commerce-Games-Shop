<?php
    class DbConnect {
        private $dbHost;
        private $dbUser;
        private $dbPassword;
        private $dbName;
        private $connection;

        public function __construct($dbHost, $dbUser, $dbPassword, $dbName) {
            $this->dbHost = $dbHost;
            $this->dbUser = $dbUser;
            $this->dbPassword = $dbPassword;
            $this->dbName = $dbName;
        }

        public function connect() {
            $this->connection = mysqli_connect($this->dbHost, $this->dbUser, $this->dbPassword, $this->dbName);
            if (!$this->connection) {
                return false;
            }
            else {
                return true;
            }
        }

        public function getConnection() {
            return $this->connection;
        }
    }
?>