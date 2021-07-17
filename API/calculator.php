<?php
include '../DBConnection.php';

$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

$operator = $request[0];
$number1 = $request[1];
if(count($request) >= 3)
	$number2 = $request[2];

$result = "";

switch($operator){
	case "sum":
		$result = $number1 + $number2;
		break;
	case "sub":
		$result = $number1 - $number2;
		break;
	case "mul":
		$result = $number1 * $number2;
		break;
	case "div":
		$result = $number1 / $number2;
		break;
	case "ufrac":
		$result = 1 / $number1;
		break;
	case "sqr":
		$result = pow($number1, 2);
		break;
	case "sqrt":
		$result = sqrt($number1);
		break;
	default:
		$result = "undefined";
		break;
}

$result = round($result, 4);

$document = [
	"result" => $result
];

CreateDocument($result, $number1, $operator, $number2);

echo json_encode($document);
?>