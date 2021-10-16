var cpf = document.getElementById('cpf').value;
var fone = document.getElementById('fone').value;
var var_date = new Date();
var var_day = var_date.getDate();
var var_month = var_date.getMonth();
var var_year = var_date.getFullYear();
var consulta = [];
var ficha = [];
var month_text = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

function validate_patient(){ 
	//validação do nome do paciente
	if(document.getElementById('patient').value == ""){
		alert ("O campo nome deve ser preenchido!");
		document.getElementById('patient').style.backgroundColor = "#FA4659";
		document.getElementById('patient').focus();
		return false;
	}
	else{
		consulta[0] = document.getElementById('patient').value;
		return true;
	}
}	

function validate_fone(){	//validação do telefone do paciente
	if(fone.length	!= 11 || fone == ""){
		alert ("O telefone deve ser preenchido com DDD, digito 9 e o número, sem espaços e caracteres!");
		document.getElementById('fone').style.backgroundColor = "#FA4659";
		document.getElementById('fone').focus();
		return false;
	}
	else{
		consulta[1] = fone;
		return true;
	}
}

function validate_cpf(){	
	//validação do CPF
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == ""){
		alert ("O CPF digitado é inválido!");
		document.getElementById('cpf').style.backgroundColor = "#FA4659";
		document.getElementById('cpf').focus();
		return false;
		
	}	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999"){
			alert ("O CPF digitado é inválido!");
			document.getElementById('cpf').style.backgroundColor = "#FA4659";
			document.getElementById('cpf').focus();
			return false;		
	}	
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++){		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11){		
			rev = 0;	
		}
		if (rev != parseInt(cpf.charAt(9))){
			alert ("O CPF digitado é inválido!");
			document.getElementById('cpf').style.backgroundColor = "#FA4659";
			document.getElementById('cpf').focus();
			return false;
		}
	}
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++){		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11){	
			rev = 0;	
		}	
		if (rev != parseInt(cpf.charAt(10))){
			alert ("O CPF digitado é inválido!");
			document.getElementById('cpf').style.backgroundColor = "#FA4659";
			document.getElementById('cpf').focus();
			return false;		
		}	
	}
	
	consulta[2] = cpf;
	return true;
	
}

function validate_dentist(){
	//validação do nome do dentista
	if(document.getElementById('dentist').value != document.getElementsByClassName('dr').value){
		alert ("O NOME DO DENTISTA deve estar na lista!");
		document.getElementById('dentist').style.backgroundColor = "#FA4659";
		document.getElementById('dentist').focus();
		return false;
	}
	else{
		consulta[3] = document.getElementById('dentist').value;
		return true;
	}
}

function validate_date(){	
	//validação da data e horario
	if(document.getElementById('date').value == ""){
		alert ("Preencha uma DATA e HORÁRIO validos!");
		document.getElementById('date').style.backgroundColor = "#FA4659";
		document.getElementById('date').focus();
		return false;
	}
	else{
		consulta[4] = document.getElementById('date').value.substring(11, 16);
		consulta[5] = document.getElementById('date').value.substring(0, 10);
		return true;
	}
}

function send_consulta_data(){
	validate_patient();
	validate_fone(fone);
	validate_cpf(cpf);
	validate_dentist();
	validate_date();
	
	for (var i = 0; i < 6; i++) {
		dados.push({index: i});
		console.log(JSON.parse(JSON.stringify(consulta)));
	}
	document.getElementById('sucess').style.Color = "#green";
	return;
	

}

function validate_patient_edit(){ 
	//validação do nome do paciente
	if(document.getElementById('patient_edit').value == ""){
		alert ("O campo nome deve ser preenchido!");
		document.getElementById('patient_edit').style.backgroundColor = "#FA4659";
		document.getElementById('patient_edit').focus();
		return false;
	}
	else{
		ficha[0] = document.getElementById('patient_edit').value;
		return true;
	}
}	

function validate_field(){
	//validação do nome do dentista
	for (var i = 1; i < 5; i++){
		if(document.getElementById('field').value != document.getElementsById('field_'+i).value){
			alert ("O campo a ser alterado deve estar na lista!");
			document.getElementById('field').style.backgroundColor = "#FA4659";
			document.getElementById('field').focus();
			return false;
		}
		else{
			ficha[1] = document.getElementById('field').value;
			return true;
		}
	}

}
function validate_change(){ 
	//validação do nome do paciente
	if(document.getElementById('change').value == ""){
		alert ("O campo de alteração deve ser preenchido!");
		document.getElementById('change').style.backgroundColor = "#FA4659";
		document.getElementById('change').focus();
		return false;
	}
	else{
		ficha[2] = document.getElementById('change').value;
		return true;
	}
}	


function send_change_data(){
	validate_patient_edit();
	validate_field();
	validate_change();
	
	for (var i = 0; i < 3; i++) {
		dados.push({index: i});
		console.log(JSON.parse(JSON.stringify(ficha)));
	}
	document.getElementById('sucess_change').style.color = "#green";
	return;
}
//Passa o mês
function mesAnterior(){
	var_month - 1;
	var month_name = document.getElementById('month_name');
	var current_month = month_text[var_month];
	month_name.innerHTML = current_month;
	if(var_month < 0){
		new_year();
	}
}
function mesPosterior(){
	var_month + 1;
	var month_name = document.getElementById('month_name');
	var current_month = month_text[var_month];
	month_name.innerHTML = current_month;
	
	if(var_month > 11){
		old_year();
	}
}
