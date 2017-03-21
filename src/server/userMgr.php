<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/src/server/custom-lib/db/SqlInterface.php');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$sql = new SqlInterface();
$sql->open();

switch ($_POST['action']) {
	case 'read':
		echo 'Reading users';
		echo readUsers();
		break;
	default:
		echo 'Invalid action provided:'.$_POST['action'];
		break;
}

function readUsers() {
	return "User data";
}

//$sql->queryDB('INSERT INTO entries SET entryType=?','s',$_POST['entryType']);
//$sql->queryDB('INSERT INTO tasks SET id=LAST_INSERT_ID(), taskTitle=?, dueDate=?, taskDescription=?', 'sss', $_POST['title'], $_POST['dueDate'], $_POST['details']);

$sql->close();

return true;

?>

