//var endPointSendData = "https://www.prospeccion.compartamos.com.mx:8583/prospeccion-web/web/v1/solicitud/submit";
//var endPointSendData = "https://sl-gbeta052.compartamos.mx:8602/prospeccion-web/web/v1/solicitud/submit";
var endPointSendData = "https://MQLDVVAS4552.compartamos.mx:8600/prospeccion-web/web/v1/solicitud/submit";
const MSG_ERROR_GRAL = "No se pudo mandar la información. Inténtelo más tarde";


$(document).ready(function() {
	$('input[type="radio"]').prop('checked', false);
	$('input[name=id_question]').val('1');
	$('#msError').hide();	
	$('.desktop-footer').hide();

	// Cambiar color del checkbox cuando esté marcado
	$('#avisoPrivacidad').on('change', function() {
		if ($(this).is(':checked')) {
			$(this).css('accent-color', '#CE0058');
		} else {
			$(this).css('accent-color', 'initial');
		}
	});

	//Inicializar localStorage
	localStorage.setItem("CompartamosGenero","");
    localStorage.setItem("CompartamosNombre","");
    localStorage.setItem("CompartamosAP","");
    localStorage.setItem("CompartamosAM","");
    localStorage.setItem("CompartamosFecha","");
    localStorage.setItem("CompartamosTipoTelefono","");
    localStorage.setItem("CompartamosCorreo","");
    localStorage.setItem("CompartamosHorario","");
    localStorage.setItem("CompartamosCPGD","");
    localStorage.setItem("CompartamosHojaFormulario",1);  
	localStorage.setItem("tipoCredito", 'N/A');
	localStorage.setItem("productoAdicional", 'N/A');
	localStorage.setItem("negocio", 'N/A');
	localStorage.setItem("antiguedad", 'N/A');


	//Variables Globales

	const regularExp2 = /^[\s*a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[\s*a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
	const regularExp =	/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s+[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/

	var errorNombre = true;
	var errorApP = true;
	var errorApM = false;
	var errorFecha = true;
	var errorTelefono = true;
	var errorHorario = true;
	var errorCP = true;
	var errorEmail = false;
	var errorAvisoPrivacidad = true;
	var errorValidaGenero = true;
	var muestraAvisoBandera = true;
	var bandContinuar = false;
	//Variables Formulario
	var cliente = 'N/A'
	
	var tipoCredito = 'N/A';
	var tienesNegocio = 'N/A';
	var productoAdicional = 'N/A';
	var antiguedadSeisMeses = 'N/A';
	var valorNombre = '';
	var valorApP = '';
	var valorApM = '';
	var valorFecha = '';
	var valorTelefono = '';
	var valorHorario = '';
	var valorCP = '';
	var valorEmail = '';
	var valorAvisoPrivacidad = '';
	var valorGenero = '';
	var valorAvisoBandera = '';


	//Pregunta 1:  Ya tienes un crédito Compartamos
	$('#q1 .answer').on('click', function() {
		let answer = $(this).attr('data-id');
		$('#q1 .answer').removeClass('selected');
		$(this).addClass('selected');

		if (answer === 'Si') {
            $('#rbCSi').prop('checked', true);
			
        } else if (answer === 'No') {
            $('#rbCNo').prop('checked', true); 
			
        }
		cliente = answer;
		$('input[name=answer_question_1]').val(answer);

		$('#btnContinue').addClass('active');

		$('#msgError').hide();
	});

	$('#q2_1 .answer').on('click', function() {
		let answer = $(this).attr('data-id');

		$('#q2_1 .answer').removeClass('selected');
		$(this).addClass('selected');
	
		if (answer === 'Grupal') {
			$('#rbGrupalSi').prop('checked', true); 
		} else if (answer === 'Individual') {
			$('#rbIndividualNo').prop('checked', true); 
		}

		tipoCredito = answer;
		$('input[name=answer_question_2_1]').val(answer);

		$('#btnContinue').addClass('active');

		$('#msgError').hide();

	});

	//Pregunta 2_2: Tienes un negocio
	$('#q2_2 .answer').on('click', function() {
		let answer = $(this).attr('data-id');


		$('#q2_2 .answer').removeClass('selected');
		$(this).addClass('selected');

		if (answer === 'Si') {
			$('#rbSi').prop('checked', true);  // Marca el radio button de "Si"
			tienesNegocio = 'Si';
		} else if (answer === 'No') {
			$('#rbNo').prop('checked', true);  // Marca el radio button de "No"
			tienesNegocio = 'No';
		}

		$('input[name=answer_question_2_2]').val(answer);

		$('#btnContinue').addClass('active');

		$('#msgError').hide();
	});

	//Pregunta 3_1: ¿Tu negocio tiene más de 6 meses?
	$('#q3_1 .answer').on('click', function() {
		let answer = $(this).attr('data-id');


		$('#q3_1 .answer').removeClass('selected');
		$(this).addClass('selected');

		if (answer === 'Si') {
			$('#rbSiNegocio').prop('checked', true);
			antiguedadSeisMeses = 'Si';
		} else if (answer === 'No') {
			$('#rbNoNegocio').prop('checked', true);
			antiguedadSeisMeses = 'No';
		}
		$('input[name=answer_question_3_1]').val(answer);
		

		$('#btnContinue').addClass('active');

		$('#msgError').hide();
	});

	//Pregunta 3_2
	$('#q3_2 .answer').on('change', validarFormulario);
	$('#q3_2 .answer').on('blur', validarFormulario);



	$('#btnContinue').on('click', function() {
		let idQuestion = $('input[name=id_question]').val();

		if (idQuestion == 1) {
			validateQ1();
		} else if (idQuestion == '2_1') {
			validateQ2_1();
		} else if (idQuestion == '2_2') {
			validateQ2_2();
		} else if (idQuestion == '3_1') {
			validateQ3_1();
		} else if (idQuestion == '3_2') {
			validateQ3_2();
		} else if (idQuestion == '3_3') {
			validateQ3_3();
		} else if (idQuestion == '4_1') {
			validateQ4_1();
		} else if (idQuestion == '4_2') {
			validateQ4_2();
		} else if (idQuestion == '4_3') {
			validateQ4_3();
		}

		//Si viene de #q3_2
		//Entonces sendData();
		//en SendData si es OK, muestro Gracias

	});

	//Pregunta: Tienes un credito?
	function validateQ1() {

		let answer = $('input[name=answer_question_1]').val();
	
		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}
	
		$('.question__content').hide();
	
		if (answer == 'Si') {
			$('#q2_1').show();
			$('input[name=id_question]').val('2_1');
			$('#q2_1 .progress__label span').html('30%');
			$('#q2_1 .progress__line').addClass('p30');
		} else {
			$('#q2_2').show();
			$('input[name=id_question]').val('2_2');
			$('#q2_2 .progress__label span').html('30%');
			$('#q2_2 .progress__line').addClass('p30');
		}

		$('#btnContinue').removeClass('active');
	
		$('input[name=answer_question_1]').val(answer);

		localStorage.setItem('cliente', answer);
	
		pushDataLayer(
			"form_field_steps", 
			{
			  'pantalla': 'pantalla_1-0%',
			  'field_name': '01. ¿Tienes un crédito Compartamos?',              
			  'field_value': answer
			},
		);
	}

	function validateQ2_1(){
		let answer = $('input[name=answer_question_2_1]').val();

		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}
	
		$('.question__content').hide();
	
		if (answer == 'Grupal') {
			$('#q4_1').show();
			$('input[name=id_question]').val('4_1');
			$('#q4_1 .progress__label span').html('60%');
			$('#q4_1 .progress__line').addClass('p60');
			$('.desktop-footer').show();
		} else {
			$('#q4_2').show();
			$('input[name=id_question]').val('4_2');
			$('#q4_2 .progress__label span').html('60%');
			$('#q4_2 .progress__line').addClass('p60');
			$('.desktop-footer').show();
		}
		
		$('#btnContinue').removeClass('active');
		$('#btnContinue').hide();

		$('input[name=answer_question_2_1]').val(answer);
		localStorage.setItem('tipoCredito', answer);

		pushDataLayer("form_field_steps", {
			'pantalla': 'pantalla_1-30%',
			'field_name': '02. ¿Qué tipo de crédito tienes?',
			'field_value': answer
		}, answer);
	}

	//Pregunta: tienes negocio?
	function validateQ2_2() {
		let answer = $('input[name=answer_question_2_2]').val();
	
		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}
	
		$('.question__content').hide();
	
		if (answer == 'Si') {
			$('#q3_1').show();
			$('input[name=id_question]').val('3_1');
			$('#q3_1 .progress__label span').html('60%');
			$('#q3_1 .progress__line').addClass('p60');
		} else {
			$('#q3_2').show();
			$('input[name=id_question]').val('3_2');
			$('#q3_2 .progress__label span').html('90%');
			$('#q3_2 .progress__line').addClass('p80');
		}

		$('#btnContinue').removeClass('active');
	
		$('input[name=answer_question_1]').val(answer);
		localStorage.setItem('negocio', tienesNegocio);

		pushDataLayer("form_field_steps", {
			'pantalla': 'pantalla_1-30%',
			'field_name': '02. ¿Tienes un negocio?',
			'field_value': tienesNegocio
		});
	}

	//Pregunta: tiene mas de 6 meses?
	function validateQ3_1(){
		let answer = $('input[name=answer_question_3_1]').val();
	
		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}

		$('.question__content').hide();
	
		if (answer == 'Si') {
			antiguedadSeisMeses = 'Si';
		} else {
			antiguedadSeisMeses = 'No';
		}

		//Cambia a Datos Personales
		$('#q3_2').show();
		$('input[name=id_question]').val('3_2');
		$('#q3_1 .progress__label span').html('90%');
		$('#q3_2 .progress__line').addClass('p80');



		$('#btnContinue').removeClass('active');
	
		$('input[name=answer_question_1]').val(answer);
		localStorage.setItem('antiguedad', antiguedadSeisMeses);

		pushDataLayer("form_field_steps", {
			'pantalla': 'pantalla_1-60%',
			'field_name': '03. ¿Tu negocio tiene más de 6 meses?',
			'field_value': antiguedadSeisMeses
		});
	}

	function validateQ3_2() {
		var ssSource = window.ssSource || 'default_tracking_source'; // Asegurar que ssSource siempre esté definido
	 
		if (bandContinuar === false) {
	 
		    // Capturar datos dinámicos del formulario
		    var tipoTelefono = $('#telefonoSelect').val();
		    var horarioLlamada = $('#horaSelect').val();
		    var nombre = $('#txbNombre').val();
	 
		    // Muestra el mensaje de error
		    $('#msgDatosIncorrectos')
			   .html('Verifica que todos los datos sean correctos.')
			   .show();
	 
		    setTimeout(function() {
			   $('#msgDatosIncorrectos').fadeOut();
		    }, 7000);
	 
		    return false; // Indica que la validación falló
		}
	 
		// Si la validación es exitosa:
		$('#msgDatosIncorrectos').hide();
		sendData('');
		return true; // Indica que la validación fue exitosa
	 }
	 


	//Credito Grupal
	function validateQ4_1(){
		let answer = $('input[name=answer_question_4_1]').val();
		$('.desktop-footer').hide();
	
		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}

		$('.question__content').hide();
		productoAdicional = answer;
		localStorage.setItem ("productoAdicional", productoAdicional);

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			'event': 'form_field_steps',
			'CDCategory': $('input[name=answer_question_2_1]').val(),
			'CDFunnel': 'cliente',
			'CDSource': ssSource,
			'pantalla': 'pantalla_1-60%',
			'field_name': '03. Producto seleccionado',
			'field_value': productoAdicional
		});

		//Cambia a Datos Personales
		$('#q3_2').show();
		$('input[name=id_question]').val('3_2');
		$('#q3_2 .progress__label span').html('90%');
		$('#q3_2 .progress__line').addClass('p80');

		$('#q3_2 .tipoCredito').hide();
		



		$('#btnContinue').removeClass('active');
		$('#btnContinue').show();
	}
  

	//Crédito Individual

	function validateQ4_2(){
		let answer = $('input[name=answer_question_4_2]').val();
		$('.desktop-footer').hide();
	
		if (answer == '') {
			$('#msgError')
				.html('Seleccione una respuesta.')
				.show();
			return false;
		}

		$('.question__content').hide();
		productoAdicional = answer;

		//Cambia a Datos Personales
		$('#q3_2').show();
		$('input[name=id_question]').val('3_2');
		$('#q3_2 .progress__label span').html('90%');
		$('#q3_2 .progress__line').addClass('p80');

		$('#q3_2 .tipoCredito').hide();
		



		$('#btnContinue').removeClass('active');
		$('#btnContinue').show();
	}


	function validarFormulario() {
        let campo = $(this);
		let campoId =  campo.attr('id');
		let valor = campo.val();

		const textErrorElement = document.getElementById('textError' + campoId);


		switch (campoId) {
			case 'txbNombre':
				if (validateName(valor)) {
					textErrorElement.style.display = "none";
					$('#txbNombre').removeClass('inputError');
					errorNombre = false;
					valorNombre = valor;
					localStorage.setItem("CompartamosNombre", valor);
				} else {
					textErrorElement.style.display = "block";
					$('#txbNombre').addClass('inputError');
					errorNombre= true;
				}
				break;
			case 'txbApPaterno':
				if (validateApellidoPaterno(valor)) {
					textErrorElement.style.display = "none";
					$('#txbApPaterno').removeClass('inputError');
					errorApP = false;
					valorApP = valor;
					localStorage.setItem("CompartamosAP", valor);
				} else {
					textErrorElement.style.display = "block";    
					$('#txbApPaterno').addClass('inputError');
					errorApP= true;
				}
				break;
			case 'txbApMaterno':
				if (valor.length >0){
					if(validateApellidoMaterno(valor)) {
					textErrorElement.style.display = "none";
					$('#txbApMaterno').removeClass('inputError');
					errorApM = false;
					valorApM = valor;
					localStorage.setItem("CompartamosAM", valor);
					
					} else {
						textErrorElement.style.display = "block";    
						$('#txbApMaterno').addClass('inputError');
						errorApM= true;
					}
				} else{
					textErrorElement.style.display = "none";
					$('#txbApMaterno').removeClass('inputError');
					errorApM= false;

				}
				break;
			case 'diaSelect':
			case 'mesSelect':
			case 'anioSelect':
				const dia = $('#diaSelect').val();
				const mes = $('#mesSelect').val();
				const anio = $('#anioSelect').val();
				const textErrorFecha = document.getElementById('textErrorFecha');

				if(validaFecha(dia, mes, anio)){
					textErrorFecha.style.display = "none";
					$('#diaSelect').removeClass('inputError');
					$('#mesSelect').removeClass('inputError');
					$('#anioSelect').removeClass('inputError');
					errorFecha = false;
					valorFecha = valor;
				} else{
					textErrorFecha.style.display = "block";
					$('#diaSelect').addClass('inputError');
					$('#mesSelect').addClass('inputError');
					$('#anioSelect').addClass('inputError');
					errorFecha = true;
				}
				break;
			case 'rbFemenino':
			case 'rbMasculino':
				var generoSeleccionado = $("input[name='rbSexo']:checked").val();
				if (!generoSeleccionado) {
					$('#textErrorGenero').show();
					errorValidaGenero=true;
				} else {
					$('#textErrorGenero').hide(); 
					errorValidaGenero=false;
					valorGenero = valor;
					localStorage.setItem("CompartamosGenero",generoSeleccionado);
				}
				break;
			case 'txbNumeroTel':
			case 'telefonoSelec':
				var tipoTelefono = $('#telefonoSelect').val();
				var numeroTelefono = $('#txbNumeroTel').val();

				const validaTel = validarTelefonoContacto(numeroTelefono);
				
				if(validaTel === "errorPrimerDigito"){
					$('#textErrorTelefono1').css('display', 'block');	
					$('#txbNumeroTel').addClass('inputError');
					errorTelefono=true;
				}else if(validaTel === "numeroInvalido"){
					$('#textErrorTelefono').css('display', 'block');	
					$('#txbNumeroTel').addClass('inputError');
					errorTelefono=true;
				}else{					
					$('#textErrorTelefono').css('display', 'none');	
					$('#textErrorTelefono1').css('display', 'none');	
					$('#txbNumeroTel').removeClass('inputError');
					errorTelefono= false;
					validarTelefono = validaTel;
					localStorage.setItem("CompartamosTipoTelefono", tipoTelefono);
					localStorage.setItem("CompartamosTelefono", numeroTelefono);
				}
				break;
			case 'horaSelect':
				const valorHora = valor;
				if (valorHora === "0" || valorHora === null) {
					textErrorElement.style.display = "block";
					$('#horaSelect').addClass('inputError');
					errorHorario = true;
				} else {
					textErrorElement.style.display = "none";
					$('#horaSelect').removeClass('inputError');
					errorHorario = false;
					valorHorario = valor;
					localStorage.setItem("CompartamosHorario",valorHora);   
				}
				break;
			case 'txbCP':
				if(validarCP(valor)){
					textErrorElement.style.display = "none";
					$('#txbCP').removeClass('inputError');
					errorCP = false;
					valorCP = valor;
				}else{
					textErrorElement.style.display = "block";
					$('#txbCP').addClass('inputError');
					erroreraValidacion = false;
					errorCP=true;
					
				}
				break;
			case 'txbCorreoElectronico':
				if(validaCorreo(valor)){
					textErrorElement.style.display = "none";
					errorEmail = false;
					$('#txbCorreoElectronico').removeClass('inputError');
					valorEmail = valor;
					errorEmail = false;
				}else{
					textErrorElement.style.display = "block";
					$('#txbCorreoElectronico').addClass('inputError');
					errorEmail = true;
					localStorage.setItem("CompartamosCorreo",valor);
				}
				break;
			case 'avisoPrivacidad':
				if (!campo.prop('checked')) {
					errorAvisoPrivacidad = true;
					valorAvisoPrivacidad = true;
				} else {
					$('#textErrorAviso').hide();
					errorAvisoPrivacidad = false;
					valorAvisoPrivacidad = false;
				}
				break;
			default:
				break;
		}
		errorTelefono = false;
		var validaBolque1= errorNombre || errorApP || errorApM || errorTelefono || errorCP;
		var validaBloque2= errorFecha || errorValidaGenero || errorHorario  || errorEmail;

		if( tipoCredito == 'N/A'){
			if(validaBolque1 || validaBloque2 || errorAvisoPrivacidad){
				$('#btnContinue').removeClass('active');
				bandContinuar = false;
			}else{
				$('#btnContinue').addClass('active');
				bandContinuar = true;
			}
		}else {
			if(validaBolque1 || errorAvisoPrivacidad){
				$('#btnContinue').removeClass('active');
				bandContinuar = false;
			}else{
				$('#btnContinue').addClass('active');
				bandContinuar = true;
			}
		}

		
    }

	function validateName(nombre){
		
    	return regularExp.test(nombre);
	}
	function validateApellidoPaterno(apellidoP){
		return regularExp.test(apellidoP);
	}
	function validateApellidoMaterno(apellidoM){
		return regularExp.test(apellidoM);
	}

	function validaFecha (dia, mes, anio){
		if (dia === "0" || mes === "0" || anio === "0") {
			return false;
		}

		const fecha = new Date(anio, mes - 1, dia); 

		//const fecha = new Date(`${anio}-${mes}-${dia}`);
		if (fecha.getDate() != dia || fecha.getMonth() + 1 != mes || fecha.getFullYear() != anio) {
			return false;
		}

		const edad = calcularEdad(fecha);
		if(edad < 18 || edad > 98 ){
			return false;
		}

		return true;
		
	}

	function calcularEdad(fecha_nacimiento) {
		var hoy = new Date();
		var cumpleanos = new Date(fecha_nacimiento);
		var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		var m = hoy.getMonth() - cumpleanos.getMonth();
		if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
			edad--;
		}
		return edad;
	}

	function validarTelefonoContacto(telefono) {
		telefono = telefono.replace(/[-\s+]/g, "").trim();
		const regex = /^[0-9]{10}$/; 
	
		if (telefono[0] === '0') {
			
			return "errorPrimerDigito";
		}
		if (regex.test(telefono)) {
			return telefono;
		} else {
			return "numeroInvalido";
		}
	}

	function validarCP(txtCP) {	
		if (/^\d{5}$/.test(txtCP)) {
			return true;
		} else {
			return false;
		}
	}

	function validaCorreo(correo){
		if(correo.trim().length != 0) {
			let regularExp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
			if(regularExp.test(correo)) { 
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}

	function sendData(token) {
		console.log("Iniciando envío de datos...");
		spinnerOn('Registrando información...');

		let category = document.getElementsByName("answer_question_2_1")[0].value;
		
		$.ajax({
		    method: 'POST', // ✅ Añadir método HTTP
		    url: endPointSendData,
		    data: armarFormulario(token),
		    contentType: false, // ✅ Necesario para FormData
		    processData: false, // ✅ Necesario para FormData
		    cache: false,
		    success: function(data) {
			   console.log("Respuesta del servidor:", data);
			   spinnerOff();
			   
			   if (data.codigo == 0) {
					localStorage.setItem('lead_id',data.solicitud.id)
					//inicio de código para traer el folio//
					sessionStorage.setItem('Folio', data.solicitud.id);
					sessionStorage.setItem('Horario', data.solicitud.horario);

					//fin de códig//
					clickSenderDatakayer();
				  console.log("Redireccionando...");
				  determinarRedireccion();
			   } else {
				  gestionaError(data);
			   }
		    },
		    error: function(xhr, status, error) {				
				dataLayer.push({
				'event': 'error_lead',
				'CDFunnel': (localStorage.getItem('cliente') == 'Si') ? 'Cliente' : 'No cliente',
				'CDCategory': localStorage.getItem('tipoCredito'),
      			'CDLabel': localStorage.getItem('productoAdicional'),
				'CDAction': 'Intento de registro',
				'submit_result': 'Error',
				'detail': "Error de conexión:"+ error
				});
			   console.error("Error de conexión:", error);
			   spinnerOff();
			   alert("Error al conectar con el servidor. Intente nuevamente.");
		    },
		    complete: function() {
			   grecaptcha.reset(); // ✅ Limpiar captcha si se usa
		    }
		});
	 }
	 /*
	 function determinarRedireccion() {
		// Verificar visibilidad con estilo CSS
		const isDateVisible = () => {
		    const dia = document.getElementById('diaSelect');
		    if (!dia) return false;
		    const style = window.getComputedStyle(dia);
		    return style.display !== 'none' && style.visibility !== 'hidden';
		};
	 
		if (isDateVisible()) {
		    console.log("Campos de fecha VISIBLES");
		    const diaVal = document.getElementById('diaSelect').value;
		    const mesVal = document.getElementById('mesSelect').value;
		    const anioVal = document.getElementById('anioSelect').value;
		    
		    if (diaVal !== "0" && mesVal !== "0" && anioVal !== "0") {
			   console.log("Fecha COMPLETA - Redirigiendo a ty-no-cliente.html");
			   window.location.href = 'ty-no-cliente.html';
		    } else {
			   console.log("Fecha INCOMPLETA - Redirigiendo a ty-cliente.html");
			   window.location.href = 'ty-cliente.html';
		    }
		} else {
		    console.log("Campos de fecha OCULTOS - Redirigiendo a ty-cliente.html");
		    window.location.href = 'ty-cliente.html';
		}
	 }
	*/

	 function determinarRedireccion() {
		// Verificar si los campos de fecha están visibles
		const isDateVisible = () => {
		    const dia = document.getElementById('diaSelect');
		    return dia && dia.offsetParent !== null; // offsetParent chequea visibilidad
		};
	 
		if (isDateVisible()) { // Campos de fecha VISIBLES
		    const diaVal = document.getElementById('diaSelect').value;
		    const mesVal = document.getElementById('mesSelect').value;
		    const anioVal = document.getElementById('anioSelect').value;
		    const fechaCompleta = diaVal !== "0" && mesVal !== "0" && anioVal !== "0";
		    
		    fechaCompleta 
			   ? setTimeout(()=> window.location.href = 'ty-no-cliente.html',600)
			   : setTimeout(()=> window.location.href = 'ty-cliente.html',600);
		    
		} else { // Campos de fecha OCULTOS
			setTimeout(()=> window.location.href = 'ty-cliente.html',600)
		}
	 }

	 function validaFecha(dia, mes, anio) {
		// Si los campos no existen, retornar true para no bloquear el envío
		if (!document.getElementById('diaSelect')) return true; 
		
		// Resto de tu lógica actual...
		if (dia === "0" || mes === "0" || anio === "0") return false;
		
		const fecha = new Date(anio, mes - 1, dia);
		return fecha.getDate() == dia && fecha.getMonth() + 1 == mes && fecha.getFullYear() == anio;
	 }

	function armarFormulario(token){
		var formData = new FormData();
		if (document.getElementById('avisoPrivacidad').checked){
			formData.append('aviso', 'si');
		} else {
			formData.append('aviso', 'no');
		}
	
		var materno =  document.getElementById('txbApMaterno').value;;
	
		if (materno.length < 3) {
			materno = "N/A";
		}
	
		var correo = document.getElementById('txbCorreoElectronico').value;
	
		if (correo.length < 3) {
			correo = "N/A";
		}
		
		formData.append('nombre',document.getElementById('txbNombre').value);
		formData.append('aPaterno', document.getElementById('txbApPaterno').value);
		formData.append('aMaterno', materno);
		formData.append('correo', correo);
		formData.append('telNum', document.getElementById('txbNumeroTel').value.replaceAll("-","").replaceAll(" ","").replaceAll("+","").trim());
		var genero = $("input[name='rbSexo']:checked").val();
		if(genero === undefined){
			genero = 'N/A';
		}
		formData.append('genero',genero);		

		formData.append('negocio', tienesNegocio);
		formData.append('antiguedad', antiguedadSeisMeses);	
		formData.append('tipoCredito', tipoCredito); 
		formData.append('productoAdicional', productoAdicional);
		localStorage.setItem ("nombreProspecto", document.getElementById('txbNombre').value);
		localStorage.setItem ("negocio", tienesNegocio);
		localStorage.setItem ("antiguedad", antiguedadSeisMeses );
		localStorage.setItem ("tipoCredito", tipoCredito);
		localStorage.setItem ("productoAdicional", productoAdicional);
		const horaSeleccionada = document.getElementById('horaSelect').value;
		const horaSelect = (horaSeleccionada === "0") ? "N/A" : horaSeleccionada;
		formData.append('horario',horaSelect);
		var creditoGrupal = document.getElementById('tipoCreditoGrupal').value;
		formData.append('cliente', cliente );
		
	/* 	if (document.getElementById("antiguedad").style.display == "block"){
			if (document.getElementById('rbTimeCDSi').checked){
				formData.append('antiguedad', 'Si');
			} else if (document.getElementById('rbTimeCDNo').checked) {
				formData.append('antiguedad', 'No');
			}
		}else
			formData.append('antiguedad', 'N/A');
		 */


		var  txbFechaNac = document.getElementById('anioSelect').value +"/" + document.getElementById('mesSelect').value +"/" + document.getElementById('diaSelect').value;	
		formData.append('fechaN', txbFechaNac);	
		formData.append('codigoPostal', document.getElementById('txbCP').value);
		
		let vars = utms();
		if(vars.length>0){
			formData.append('source',((vars["utm_source"].trim()=='' )? 'N/A': vars["utm_source"]));
			formData.append('medium',((vars["utm_medium"].trim() =='' )? 'N/A': vars["utm_medium"]));
			formData.append('campaign',((vars["utm_campaign"].trim() =='' )? 'N/A': vars["utm_campaign"]));
			formData.append('content',((vars["utm_content"].trim() =='')? 'N/A': vars["utm_content"]));
		}
		else{
			formData.append('source','N/A');
			formData.append('medium','N/A');
			formData.append('campaign','N/A');
			formData.append('content','N/A');
		}
		
		formData.append('token', token);
		return formData;
	}

	$('#tipoCreditoGrupal').on('change', function() {
		var valor = $(this).val(); 
		validateQ4_1();
	});
	
	$('#tipoCreditoIndividual').on('change', function() {
		var valor = $(this).val(); 
		validateQ4_1();
	});


});

function muestraAviso() {
    document.getElementById('divAvisoPri').style.display = 'flex';  // Muestra el pop-up
}

// Función para cerrar el aviso de privacidad
function cerrarAviso() {
    document.getElementById('divAvisoPri').style.display = 'none';  // Oculta el pop-up
}

function spinnerOn(mensaje){
	$.blockUI({
	  css: { 
		border: 'none', 
		padding: '15px', 
		backgroundColor: '#000', 
		'-webkit-border-radius': '10px', 
		'-moz-border-radius': '10px',
		opacity: .7, 
		color: '#fff'
	  },
	  fadeIn: 0,
	  message: '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'+mensaje,
	  baseZ: 99995,
	  overlayCSS:  {
		backgroundColor: '#000',
		opacity: 0.7,
		cursor: 'wait'
	  }
	});
}

function spinnerOff(){
if ($(".blockUI").length != 0){
	$.unblockUI();
}
}

function utms(){
    var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
		if (hash[0]=='utm_source' || hash[0]=='utm_medium' || hash[0]=='utm_content' || hash[0]=='utm_campaign' ){
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
    }
    return vars;
}


function clearForm(){
	$('input').val("");
	$('select').val(0);
	$('input[type=checkbox]').prop('checked',false);		
	$('input[type=radio]').prop('checked',false);
	formDisable();
}


var clickAll = 0;

function gestionaError(data){
	var msjError = '';
	if (data.codigo){
		if (data.codigo == -1){
			msjError = MSG_ERROR_GRAL;
			msErrorsend(msjError);
		} else if (data.codigo == -2){
			msjError = 'No se pudo enviar la información. Favor de llenar todos los campos obligatorios.';
			msErrorsend(msjError);
		} else if (data.codigo == -4){
			msjError = 'Formato de número telefónico incorrecto.';
			var idCampo = getCampoTel(data.respuesta);
			$(idCampo).addClass('req_field');
		} else if (data.codigo == -5){
			msjError = 'El número telefónico que ingresaste no es válido.';
			var idCampo = getCampoTel(data.respuesta);
			$(idCampo).addClass('req_field');
		} else {
			msjError = MSG_ERROR_GRAL;
		}
    } else {
    	msjError = MSG_ERROR_GRAL;
    }    
	msErrorsend(msjError);
	dataLayer.push({
		'event': 'error_lead',
		'CDFunnel': (localStorage.getItem('cliente') == 'Si') ? 'Cliente' : 'No cliente',
		'CDCategory': localStorage.getItem('tipoCredito'),
		'CDLabel': localStorage.getItem('productoAdicional'),
		'CDAction': 'Intento de registro',
		'submit_result': 'Error',
		'detail': msjError
	});
}

function msErrorsend(msg){
	//formSubmitDatosPersonales("error",msg);
	$('#msError').text(msg);
	$('#msError').show();	
	var etop = $('#msError').offset().top;
		$('html, body').animate({
		  scrollTop: etop
		}, 1000);
	//grecaptcha.reset();
}

function agregarTipoCreditoGrupal(answer){
		
	$('#tipoCreditoGrupal').val(answer);
	$('#tipoCreditoGrupal').trigger('change');
	

}

function agregarTipoIndividual(answer){
		
	$('#tipoCreditoIndividual').val(answer);
	$('#tipoCreditoIndividual').trigger('change');
	

}

function agregarTipoCreditoGrupal(answer) {
    console.log("Tipo de crédito seleccionado:", answer); // Depuración

    // Convertimos la opción seleccionada a minúsculas para evitar errores en comparación
    let selectedAnswer = answer.toLowerCase();

    // Redirigir según la opción seleccionada
    if (selectedAnswer === "cuenta a mi favor") {
        window.location.href = "ty-cuenta-a-mi-favor.html";
        return; // Detiene la ejecución
    }

    if (selectedAnswer === "inversiones") {
        window.location.href = "ty-inversiones-compartamos.html";
        return; // Detiene la ejecución
    }

    // Si es cualquier otro crédito, ejecuta la lógica original
    $('#tipoCreditoGrupal').val(answer);
    $('#tipoCreditoGrupal').trigger('change');
}

 
 





