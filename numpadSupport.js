$(document).keypress(function(e){
	//console.log(e.keyCode);
	if(e.keyCode >= 48 && e.keyCode <= 57)
		AddNumber(String.fromCharCode(e.keyCode));
	else if(e.keyCode == 42)
		AddOperator("mul");
	else if(e.keyCode == 43)
		AddOperator("sum");
	else if(e.keyCode == 45)
		AddOperator("sub");
	else if(e.keyCode == 47)
		AddOperator("div");
	else if(e.keyCode == 61)
		RequestAPI(true);
});