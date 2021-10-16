// sendInfo.js para MONGODB CLOUD começo 20/09/2021

function sendInfoInserir() {		// 	convertido para nuvem mongodb em 21/09/2021
		
		var cpfPaciente = document.getElementById("cpfPaciente").value;
		var croDentista = document.getElementById("croDentista").value;
		var dataHoraConsulta = document.getElementById("dataConsulta").value;
		var dataConsulta;
		var horaConsulta;
		
		//parseando data e hora
		let parseData = dataHoraConsulta.split('T');
		dataConsulta = parseData[0];
		
		horaConsulta = parseData[1];
		horaConsulta = horaConsulta.replaceAll(':','');
			
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("msgServer").innerText = xhttp.responseText; 
			alert(xhttp.responseText);
		}
		};

		xhttp.open("POST", "http://18.231.159.164:3001/inserirConsulta", true);

		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("cpfPaciente="+cpfPaciente+"&croDentista="+croDentista+"&dataConsulta="+dataConsulta+"&horaConsulta="+horaConsulta);

			
} 

function sendInfoLogin(){		// 	convertido para nuvem mongodb em 21/09/2021
		
		var cod = document.getElementById("inputLogin1").value;
		var senha = document.getElementById("inputLogin2").value;	
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("msgServer").innerText = xhttp.responseText; 
			
			if(xhttp.responseText == "Login efetuado com sucesso."){
				window.location.assign("./index.html");
			}else{
				alert(xhttp.responseText);
			}
		}
		};

		xhttp.open("POST", "http://18.231.159.164:3001/realizarLogin", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("cod="+cod+"&senha="+senha);
}

function sendInfoPaciente(){		// convertido para nuvem mongodb em 21/09/2021
		
		var cpf = document.getElementById("inputCpfCadastroPaciente2").value;
		var nome = document.getElementById("inputNomeCadastroPaciente2").value;
		var nsocial = document.getElementById("inputNomeSocialCadastroPaciente2").value;
		var fone = document.getElementById("inputTelefoneCadastroPaciente2").value;
		var nasc = document.getElementById("inputDataCadastroPaciente2").value;
		var email = document.getElementById("inputEmailCadastroPaciente2").value;
		var end = document.getElementById("inputEnderecoCadastroPaciente2").value;
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("msgServer").innerText = xhttp.responseText; 
			alert(xhttp.responseText);
		}
		};
		
		xhttp.open("POST", "http://18.231.159.164:3001/cadastrarPaciente", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("cpf="+cpf+"&nome="+nome+"&nsocial="+nsocial+"&fone="+fone+"&nasc="+nasc+"&email="+email+"&end="+end);
		
}

function sendInfoFicha(){			// 	convertido para nuvem mongodb em 22/09/2021
	
		var cpf = document.getElementById("inpEditCPF").value;
		var nome = document.getElementById("inpEditNome").value;	
		
		if(nome == "" && cpf == ""){
			alert("Favor preencher um dos campos.");
			window.location = "./index.html"; 
			return;
		}
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var resposta = xhttp.responseText;
			if (resposta == "Ficha não localizada."){
				alert("Ficha não localizada.");
				return;
			}
			
			resposta = JSON.parse(resposta);
			
			document.getElementById("labelocalizEditCPF").innerText = resposta[0].cpf; 
			document.getElementById("labelocalizEditNome").innerText = resposta[0].nome; 
			document.getElementById("labelocalizEditTelefone").innerText = resposta[0].fone; 
			
			// transformando data para formato dd/mm/aaaa
			var labelAno = resposta[0].nasc.substring(0,4);
			var labelMes = resposta[0].nasc.substring(5,7);
			var labelDia = resposta[0].nasc.substring(8,10);
			
			document.getElementById("labelocalizEditData").innerText = labelDia+"/"+labelMes+"/"+labelAno; 
			document.getElementById("labelocalizEditEmail").innerText = resposta[0].email; 
			document.getElementById("labelocalizEditEndereço").innerText = resposta[0].end; 
		}
		};
	
		xhttp.open("POST", "http://18.231.159.164:3001/consultarFicha", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("cpf="+cpf+"&nome="+nome);
}; // end of function sendInfoFicha

function lerAnamnese(){			// 	convertido para nuvem mongodb em 25/09/2021
	
		var email = document.getElementById("labelocalizEditEmail").innerText;	
			
		if(email == ""){
			alert("Este paciente não possui Anamnese cadastrada.");
			window.location = "./index.html";
			return;
		}
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var resposta = JSON.parse(xhttp.responseText);
			
			document.getElementById("labelEditAnam1").innerText = resposta[0].alergia; 
			document.getElementById("labelEditAnam2").innerText = resposta[0].fumante; 
			document.getElementById("labelEditAnam3").innerText = resposta[0].id; 
			
		}
		};

		xhttp.open("POST", "http://18.231.159.164:3001/lerAnamnese", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("email="+email);	
}


function atualizarAnamnese(){		// 	convertido para nuvem mongodb em 25/09/2021
	
		var alergia = document.getElementById("inpAlt").value;
		var fumante = document.getElementById("inpAlt2").value;
		var email = document.getElementById("labelEditAnam3").innerText;
		
		if(alergia == "" && fumante == ""){
			alert("Favor preencher um ou mais campos.");
			return;
		}
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			// Fazendo parse nos dados enviados pelo server
			let parseServer = xhttp.responseText.split(',');
			
			//document.getElementById("msgServer").innerText = xhttp.responseText;
			alert(xhttp.responseText);
			
		}
		};

		xhttp.open("POST", "http://18.231.159.164:3001/atualizarAnamnese", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("alergia="+alergia+"&fumante="+fumante+"&email="+email);
}

function sendInfoDentista(){		// convertido para nuvem mongodb em 21/09/2021
		
		var nome = document.getElementById("inputNomeCadastroDentista").value;
		var nsocial = document.getElementById("inputNomeSocialCadastroDentista").value;		
		var cro = document.getElementById("inputCroCadastroDentista").value;
		var especialidade = document.getElementById("inputEspecialidadeCadastroDentista").value;


		var seg = document.getElementById("inputDisponibilidadeSegundaCadastroDentista").checked;
		var ter = document.getElementById("inputDisponibilidadeTerçaCadastroDentista").checked;
		var qua = document.getElementById("inputDisponibilidadeQuartaCadastroDentista").checked;
		var qui = document.getElementById("inputDisponibilidadeQuintaCadastroDentista").checked;
		var sex = document.getElementById("inputDisponibilidadeSextaCadastroDentista").checked;
		var sab = document.getElementById("inputDisponibilidadeSabadoCadastroDentista").checked;
		var dom = document.getElementById("inputDisponibilidadeDomingoCadastroDentista").checked;
		
		var disp = "";
		 
		if(seg == true){
			disp = disp+','+"Segunda-feira";
		}
		if(ter == true){
			disp = disp+','+"Terça-feira";
		}
		if(qua == true){
			disp = disp+','+"Quarta-feira";
		}		
		if(qui == true){
			disp = disp+','+"Quinta-feira";
		}
		if(sex == true){
			disp = disp+','+"Sexta-feira";
		}
		if(sab == true){
			disp = disp+','+"Sábado";
		}
		if(dom == true){
			disp = disp+','+"Domingo";
		}	

		disp = disp.replace(',','');
		
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("msgServer").innerText = xhttp.responseText; 
			alert(xhttp.responseText);
		}
		};
		
		xhttp.open("POST", "http://18.231.159.164:3001/cadastrarDentista", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("nome="+nome+"&nsocial="+nsocial+"&cro="+cro+"&especialidade="+especialidade+"&disp="+disp);

}

function sendInfoRecepcionista(){			// convertido para nuvem mongodb em 20/09/2021
		
		var nome = document.getElementById("inputNomeCadastroRecepcionista").value;
		var codigo = document.getElementById("inputCodCadastroRecepcionista").value;
		var fone = document.getElementById("inputTelefoneCadastroRecepcionista").value;
		var email = document.getElementById("inputEmailCadastroRecepcionista").value;
		var nsocial = document.getElementById("inputNomeSocialCadastroRecepcionista").value;
		
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("msgServer").innerText = xhttp.responseText;		
			alert(xhttp.responseText); 
		}
		};
		
		xhttp.open("POST", "http://18.231.159.164:3001/cadastrarRecepcionista", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("nome="+nome+"&codigo="+codigo+"&fone="+fone+"&email="+email+"&nsocial="+nsocial);

}