<?php
require "vendor/autoload.php";

date_default_timezone_set('America/Sao_Paulo');

function CreateDocument($result, $number1, $operator, $number2){
	
	$document = [
		"machineIP" => getHostByName(getHostName()),
		"machineName" => getHostName(),
		"date" => date('j/n/Y H:i:s'),
		"numbers" => [(float)$number1, (float)$number2], 
		"operator" => $operator,
		"result" => (float)$result
	];
	
	InsertDocument($document);
}

function InsertDocument($document){
	$SERVER_ADDRESS = "mongodb://localhost:27017";
	
	$client = new MongoDB\Client($SERVER_ADDRESS);
	//echo "Connection to database successfully\n";

	$db = $client->test;
	//echo "Database test selected\n";

	$collection = $db->local;
	//echo "Collection selected";
	
	$collection->insertOne($document);
	//echo "Document inserted";
}
?>