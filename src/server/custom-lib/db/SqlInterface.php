<?php
namespace sqlInterface;

class SqlInterface {
	private $connection = null ;

    function __construct() {
    }

	public function open() {
		$this->connection=$this->connectToDB();
	}

	public function close() {
		$this->connection->close();
	}

    private function connectToDB()
    {

        include $_SERVER['DOCUMENT_ROOT'].'/src/server/custom-lib/db/SqlInterface.php';

        $mysqli = new mysqli("127.0.0.1", DB_USER, DB_PASSWORD, DB_NAME, 3306);

        if (!$mysqli->connect_error) {
            return $mysqli;
        }
        else {
            printf("Database connection failed: ".$mysqli->connect_error);
            return "false";
        }
    }

    private function passArrayByReference(&$variable)
    {
        $temp = array();

        for($i = 1; $i < count($variable); $i++) {
            $temp[$i-1] = &$variable[$i];
        }

        return $temp;
    }

    public function queryDB()
    {
        $numargs = func_num_args();
        if($numargs < 1) {
            return false;
        }


        $args = func_get_args();

	    $stmt = $this->connection->prepare($args[0]);

        if ($numargs >= 2) {

            $argList = $this->passArrayByReference($args);
            call_user_func_array(array($stmt, "bind_param"), $argList);
        }


        $stmt->execute();
        $result = $stmt->get_result();
        $resultArray = array();

	    if(!$result) {

	    } else {
	    $i=0;
		    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
			    foreach ($row as $key=>$value) {
				    $resultArray[$i][$key] = $value;
			    }
			    $i++;
		    }
		    $result = $resultArray;
	    }

        return $result;
    }
}
