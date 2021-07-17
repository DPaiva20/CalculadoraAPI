var number1 = "";
var number2 = "";
var operator = "";
var cachedDigit = false;
var cachedResult = false;

window.onload = () => {var operation = document.getElementById("operation"); var label = document.getElementById("label")};

//Adiciona um digito a label
//A label é limitado a 10 digitos
//Caso o que esteja na label seja uma resultante
//todas as variaveis são resetadas
//e é considerado um novo calculo
function AddNumber(num){
	if(cachedResult){
		number1 = "";
		number2 = "";
		operator = "";
		
		UpdateGraphic();
		
		label.innerHTML = "0";
		
		cachedResult = false;
	}
	
	if(label.innerHTML == "0" || cachedDigit)
		label.innerHTML = num;
	else if(label.innerHTML.length < 11)
		label.innerHTML += num;
	
	cachedDigit = false;
}

//Adiciona/Modifica o operador do calculo
//Caso ainda não tenha um operador,
//o primeiro numero se torna igual a label
//Caso tenha, o segundo numero se torna uma label
//e é feito um Request para realizar o calculo
function AddOperator(op){

	if(operator == "")
		number1 = label.innerHTML;
	else if(!cachedDigit && !cachedResult){
		number2 = label.innerHTML;
		RequestAPI();
	}
	
	if(cachedResult){
		number2 = "";
		cachedResult = false;
	}
	operator = op;

	UpdateGraphic();
	
	cachedDigit = true;
}

//Inverte o sinal do numero na label
function InvertNumber(){
	label.innerHTML *= -1;
}

//Apaga o ultimo digito, se o numero não estiver em cache
function DeleteLastDigit(){
	if(!cachedDigit){
		let digits = label.innerHTML;
		digits = digits.length == 1 ? "0" : digits.slice(0, -1);
		label.innerHTML = digits;
	}
}

//Apaga a label ou todo o conteudo
function Clear(everything = false){
	if(everything){
		number1 = operator = number2 = "";
		UpdateGraphic();
	}
	
	label.innerHTML = "0";
}

//Atualiza o texto de operação
function UpdateGraphic(result = ""){
	let operatorSymbol = "";
	
	switch(operator){
		case "sum":
			operatorSymbol = "+";
			break;
		case "sub":
			operatorSymbol = "-";
			break;
		case "mul":
			operatorSymbol = "x";
			break;
		case "div":
			operatorSymbol = "/";
			break;
	}
	
	if(number1 != "")
		operation.innerHTML = number1;
	if(operator != "")
		operation.innerHTML += " " + operatorSymbol;
	if(number2 != "")
		operation.innerHTML += " " + number2;
	if(number1 == "" && operator == "" && number2 == "")
		operation.innerHTML = "";

	if(result != ""){
		operation.innerHTML += " =";
		label.innerHTML = result;
	}
}

//Realiza o Request da API
async function RequestAPI(finalResult){
	if(finalResult && !cachedResult)
		number2 = label.innerHTML;
	
	if(number1 == "" || number2 == "")
		return;
	
	let response = await fetch('http://localhost/proderj/API/calculator.php/' + operator + '/' + number1 + '/' + number2);
	let data = await response.json();
	//console.log(data.result);
	//return data;
	
	if(finalResult){
		cachedResult = true;
		UpdateGraphic(data.result);
		number1 = data.result;
	}
	else{
		number1 = data.result;
		number2 = "";
		UpdateGraphic();
	}
}