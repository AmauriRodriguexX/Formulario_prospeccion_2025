// ====================================================
// Código de GTM
// ====================================================
(function(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-XXXXXXX');

// ====================================================
// Código para esperar elementos y manejo de form_start
// ====================================================
document.addEventListener("DOMContentLoaded", function() {
  let ssSource = window.ssSource || 'default_tracking_source';
  console.log("📢 Valor de ssSource:", ssSource);
  window.dataLayer = window.dataLayer || [];

  // Función para esperar a que un elemento esté en el DOM
  function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      new MutationObserver((mutations, observer) => {
        if (document.querySelector(selector)) {
          callback(document.querySelector(selector));
          observer.disconnect();
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  // ====================================================
  // Sección 1: Pregunta inicial y selección de crédito/negocio
  // ====================================================

  // Bandera para saber si ya se disparó el evento form_start
  let formStartTriggered = false;
  // Función que dispara el evento form_start (únicamente una vez)
  function handleFirstInteraction() {
    if (formStartTriggered) return;
    let CDFunnel = 'no_cliente';
    const radioSi = document.querySelector("input[name='rbCliente']:checked");
    if (radioSi && radioSi.value === "Si") {
      CDFunnel = 'cliente';
    }
    dataLayer.push({
      'event': 'form_start',
      'CDCategory': 'NA',
      'CDFunnel': CDFunnel,
      'CDSource': ssSource,
      'pantalla': 'pantalla_1-0%'
    });
    console.log("✅ DataLayer Push: form_start (primer interacción)");
    formStartTriggered = true;
  }

  // a) Esperamos que aparezca la pregunta inicial (#q1) para disparar form_start en el primer tap
  waitForElement("#q1", function(questionContainer) {
    const options = questionContainer.querySelectorAll(".radioButonsForm");
    options.forEach(option => {
      option.addEventListener("click", function firstClickListener() {
        handleFirstInteraction();
        options.forEach(opt => {
          opt.removeEventListener("click", firstClickListener);
        });
      });
    });
  });

  // **IMPORTANTE:**  
  // Se han comentado (o eliminado) los listeners que enviaban de inmediato los eventos 
  // form_field_steps al hacer clic sobre cada opción.  
  // Ahora, estos eventos se enviarán junto con los demás al hacer clic en el botón "Continuar".

  // ====================================================
  // Sección 2: Registro y envío de eventos al hacer clic en "Continuar"
  // ====================================================
  
  // Variables para determinar qué opción eligió el usuario en la pregunta 1 (rbCliente)
  let clientSelected = false;
  let noClientSelected = false;
  
  // Listener para los radio buttons de la pregunta 1
  document.querySelectorAll("input[name='rbCliente']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      if (radio.value === "Si") {
        clientSelected = true;
        noClientSelected = false;
        console.log("✅ Opción 'Sí, ya tengo uno' seleccionada.");
      } else {
        clientSelected = false;
        noClientSelected = true;
        console.log("✅ Opción 'No, pero quiero uno' seleccionada.");
      }
    });
  });
  
  // Listener del botón "Continuar" para enviar todos los eventos form_field_steps de una sola vez
  let btnContinue = document.getElementById("btnContinue");
  if (btnContinue) {
    btnContinue.addEventListener("click", function() {
      console.log("Se hizo clic en Continuar.");
      
      // Para el flujo cliente, nos aseguramos de disparar form_start si no se disparó ya
      if (clientSelected && !formStartTriggered) {
        handleFirstInteraction();
      }
      
      // --- Form Field Steps ---
      // 1. Pregunta 1: ¿Tienes un crédito activo con Compartamos Banco?
      const radioCliente = document.querySelector("input[name='rbCliente']:checked");
      if (radioCliente) {
        let fieldValue1 = radioCliente.value;
        let CDFunnel1 = (fieldValue1 === "Si") ? "cliente" : "no_cliente";
        let CDCategory1 = (fieldValue1 === "Si") ? "credito_individual" : "NA";
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': CDCategory1,
          'CDFunnel': CDFunnel1,
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-0%',
          'field_name': '01. ¿Tienes un crédito activo con Compartamos Banco?',
          'field_value': fieldValue1
        });
        console.log("✅ DataLayer Push: form_field_steps (crédito activo)", dataLayer);
      }
      
      // 2. Pregunta 2: ¿Tienes un negocio?  
      // (Consideramos solo el radio fuera de #q3_1)
      let radioNegocio = null;
      document.querySelectorAll("input[name='rbNegocio']").forEach(function(radio) {
        // Si el radio no está dentro de #q3_1, lo tomamos para la pregunta 2.
        if (!radio.closest("#q3_1") && radio.checked) {
          radioNegocio = radio;
        }
      });
      if (radioNegocio) {
        let fieldValue2 = radioNegocio.value;
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': 'NA',
          'CDFunnel': 'no_cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-30%',
          'field_name': '02. ¿Tienes un negocio?',
          'field_value': fieldValue2
        });
        console.log("✅ DataLayer Push: form_field_steps (¿Tienes un negocio?)", dataLayer);
      }
      
      // 3. Pregunta 3: ¿Tu negocio tiene más de 6 meses? (dentro de #q3_1)
      let radioNegocio6meses = document.querySelector("#q3_1 input[name='rbNegocio']:checked");
      if (radioNegocio6meses) {
        let fieldValue3 = radioNegocio6meses.value.toLowerCase();
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': 'NA',
          'CDFunnel': 'no_cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-60%',
          'field_name': '03. ¿Tu negocio tiene más de 6 meses?',
          'field_value': (fieldValue3 === "si" ? "si" : "no")
        });
        console.log("✅ DataLayer Push: form_field_steps (¿Tu negocio tiene más de 6 meses?)", dataLayer);
      }
      
      // 4. Pregunta 4: Selección de tipo de crédito (input[name='rbCredito'])
      const radioCredito = document.querySelector("input[name='rbCredito']:checked");
      if (radioCredito) {
        let fieldValue4 = (radioCredito.value === "Individual") ? "Crédito Individual" : "Crédito Grupal";
        let CDCategory4 = (radioCredito.value === "Individual") ? "credito_individual" : "credito_grupal";
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': CDCategory4,
          'CDFunnel': 'cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-30%',
          'field_name': '02. ¿Qué tipo de crédito tienes?',
          'field_value': fieldValue4
        });
        console.log("✅ DataLayer Push: form_field_steps (tipo de crédito)", dataLayer);
      }
      
      // 5. Pregunta 5: Selección de producto en el carrusel  
      // Para este caso, asumiendo que se almacena la opción seleccionada en un elemento oculto o variable global.
      // Por ejemplo, si al hacer clic en el carrusel se guarda en un input hidden con id "productoSeleccionado"
      let productoSeleccionadoElem = document.getElementById("productoSeleccionado");
      if (productoSeleccionadoElem && productoSeleccionadoElem.value) {
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': 'credito_grupal',
          'CDFunnel': 'cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-60%',
          'field_name': '03. Producto seleccionado',
          'field_value': productoSeleccionadoElem.value
        });
        console.log("✅ DataLayer Push: form_field_steps (producto seleccionado)", dataLayer);
      }
      
      // ====================================================
      // Sección 2: Información del formulario del cliente
      // ====================================================
      // Aquí podrías hacer lo mismo: leer los valores actuales de los inputs y, si es necesario, 
      // enviar eventos form_field (por ejemplo, si deseas enviar todos los datos de registro).
      // En este ejemplo dejamos los eventos form_field que se disparan al focusin (ya configurados)
      // y asumimos que estos se dispararon a medida que el usuario completaba el formulario.
      
      // Finalmente, continuar con el envío o navegación del formulario...
      console.log("Todos los eventos form_field_steps han sido enviados al hacer clic en Continuar.");
    });
  }
  
  // ====================================================
  // (Resto del código: eventos form_field para cada input en el formulario "Información cliente")
  // ====================================================
  // Se mantienen los listeners de focusin para los campos de la sección 2.
  
  // 1. Evento para el campo "Nombre"
  waitForElement("#txbNombre", function(nombreField) {
    nombreField.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-90%',
        'field_name': '01. Nombre'
      });
      console.log("✅ DataLayer Push: form_field (01. Nombre)");
    });
  });
  
  // 2. Primer apellido
  waitForElement("#txbApPaterno", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '02. Primer apellido'
      });
      console.log("✅ DataLayer Push: form_field (02. Primer apellido)");
    });
  });
  
  // 3. Segundo apellido
  waitForElement("#txbApMaterno", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '03. Segundo apellido'
      });
      console.log("✅ DataLayer Push: form_field (03. Segundo apellido)");
    });
  });
  
  // 4. Fecha nacimiento - Día
  waitForElement("#diaSelect", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '04. Fecha nacimiento - Día'
      });
      console.log("✅ DataLayer Push: form_field (04. Fecha nacimiento - Día)");
    });
  });
  
  // 5. Fecha nacimiento - Mes
  waitForElement("#mesSelect", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '05. Fecha nacimiento - Mes'
      });
      console.log("✅ DataLayer Push: form_field (05. Fecha nacimiento - Mes)");
    });
  });
  
  // 6. Fecha nacimiento - Año
  waitForElement("#anioSelect", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '06. Fecha nacimiento - Año'
      });
      console.log("✅ DataLayer Push: form_field (06. Fecha nacimiento - Año)");
    });
  });
  
  // 7. Género
  document.querySelectorAll("input[name='rbSexo']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '07. Género'
      });
      console.log("✅ DataLayer Push: form_field (07. Género)");
    });
  });
  
  // 8. Tipo Teléfono
  waitForElement("#telefonoSelect", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '08. Tipo Teléfono'
      });
      console.log("✅ DataLayer Push: form_field (08. Tipo Teléfono)");
    });
  });
  
  // 9. Teléfono
  waitForElement("#txbNumeroTel", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '09. Teléfono'
      });
      console.log("✅ DataLayer Push: form_field (09. Teléfono)");
    });
  });
  
  // 10. Horario
  waitForElement("#horaSelect", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '10. Horario'
      });
      console.log("✅ DataLayer Push: form_field (10. Horario)");
    });
  });
  
  // 11. Código Postal
  waitForElement("#txbCP", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '11. Código Postal'
      });
      console.log("✅ DataLayer Push: form_field (11. Código Postal)");
    });
  });
  
  // 12. Correo electrónico
  waitForElement("#txbCorreoElectronico", function(field) {
    field.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '12. Correo electrónico'
      });
      console.log("✅ DataLayer Push: form_field (12. Correo electrónico)");
    });
  });
  
  // 13. Aviso privacidad (checkbox)
  waitForElement("#avisoPrivacidad", function(field) {
    field.addEventListener("click", function() {
      dataLayer.push({
        'event': 'form_field',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_2-80%',
        'field_name': '13. Aviso privacidad'
      });
      console.log("✅ DataLayer Push: form_field (13. Aviso privacidad)");
    });
  });
  
  // (Opcional) Función simulada de envío AJAX
  function enviarFormularioAJAX(callback) {
    console.log("Simulando envío AJAX...");
    setTimeout(function() {
      callback({ status: 200 });
    }, 1000);
  }
});





document.addEventListener("DOMContentLoaded", function() {
  // Variable de tracking de origen, definida o por defecto
  let ssSource = window.ssSource || 'default_tracking_source';
  
  // Bandera para saber si se seleccionó "Sí, ya tengo uno"
  let clientSelected = false;
  
  // Bandera para evitar disparar el evento más de una vez
  let eventPushed = false;

  // Función que verifica si se han completado todos los campos requeridos
  function checkFormCompletion() {
    let nombre    = document.getElementById("txbNombre") ? document.getElementById("txbNombre").value.trim() : "";
    let apellido  = document.getElementById("txbApPaterno") ? document.getElementById("txbApPaterno").value.trim() : "";
    let telefono  = document.getElementById("txbNumeroTel") ? document.getElementById("txbNumeroTel").value.trim() : "";
    let cp        = document.getElementById("txbCP") ? document.getElementById("txbCP").value.trim() : "";
    let aviso     = document.getElementById("avisoPrivacidad") ? document.getElementById("avisoPrivacidad").checked : false;
    
    console.log("Validación form cliente:", {nombre, apellido, telefono, cp, aviso});
    return (nombre !== "" && apellido !== "" && telefono !== "" && cp !== "" && aviso);
  }

  // Función para disparar el dataLayer push para "Sí, ya tengo uno"
  function pushDataLayerEvent() {
    if (clientSelected && checkFormCompletion() && !eventPushed) {
      eventPushed = true;
      window.dataLayer = window.dataLayer || [];
      
      window.dataLayer.push({
        'event': 'generate_lead_cliente',
        'CDCategory': 'credito_individual',  
        'CDFunnel': 'cliente',
        'CDSource': ssSource,
        'CDValue': 'registro_completado',
        'CDLabel': 'Crédito crece y mejora',
        'submit_result': 'OK'
      });
      
      console.log("✅ DataLayer event 'generate_lead_cliente' disparado");
    } else {
      console.log("No se cumple la validación o ya se disparó el evento.");
    }
  }

  // Listener para los radio buttons con name="rbCliente"
  // Esto actualiza la variable clientSelected
  document.querySelectorAll("input[name='rbCliente']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      if (radio.value === "Si") {
        clientSelected = true;
        console.log("✅ Opción 'Sí, ya tengo uno' seleccionada.");
      } else {
        clientSelected = false;
        console.log("❌ Opción 'No, pero quiero uno' seleccionada.");
      }
    });
  });

  // Listener para el botón Continuar
  let btnContinue = document.getElementById("btnContinue");
  if (btnContinue) {
    btnContinue.addEventListener("click", function() {
      console.log("Se hizo clic en Continuar.");
      // Solo si se seleccionó "Sí, ya tengo uno", se evalúa la validación
      if (clientSelected) {
        pushDataLayerEvent();
      } else {
        console.log("La opción seleccionada no es 'Sí, ya tengo uno'.");
      }
      // Aquí puedes continuar con el flujo normal (navegación, etc.)
    });
  }
});




document.addEventListener("DOMContentLoaded", function() {
  // Variable de tracking de origen, definida o por defecto.
  let ssSource = window.ssSource || 'default_tracking_source';
  
  // Bandera para saber si se seleccionó "No, pero quiero uno"
  let noClientSelected = false;
  
  // Bandera para evitar disparar el evento más de una vez
  let eventPushedNo = false;
  
  // Función de validación reducida para "No, pero quiero uno"
  // Se valida que los selects de día, mes y año tengan valores distintos de "0",
  // que el select de hora tenga un valor distinto de "0", y que el checkbox esté marcado.
  function checkNoClienteCompletion() {
    // Validar la fecha de nacimiento usando los select de día, mes y año.
    let dia = document.getElementById("diaSelect") ? document.getElementById("diaSelect").value.trim() : "";
    let mes = document.getElementById("mesSelect") ? document.getElementById("mesSelect").value.trim() : "";
    let anio = document.getElementById("anioSelect") ? document.getElementById("anioSelect").value.trim() : "";
    let fechaValida = (dia !== "0" && mes !== "0" && anio !== "0");
    
    // Validar el horario (select)
    let horaSelect = document.getElementById("horaSelect") ? document.getElementById("horaSelect").value.trim() : "";
    let horarioValido = (horaSelect !== "0");
    
    // Validar el checkbox de aviso
    let aviso = document.getElementById("avisoPrivacidad") ? document.getElementById("avisoPrivacidad").checked : false;
    
    console.log("Validación reducida No-Cliente:", {
      dia, mes, anio, fechaValida, horaSelect, horarioValido, aviso
    });
    
    return (fechaValida && horarioValido && aviso);
  }
  
  // Función para disparar el dataLayer push para "No, pero quiero uno"
  function pushDataLayerNoEvent() {
    if (noClientSelected && checkNoClienteCompletion() && !eventPushedNo) {
      eventPushedNo = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'generate_lead',
        'CDCategory': 'NA',  
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'CDAction': 'Registro exitoso - OK',
        'pantalla': 'pantalla_2',
        'CDValue': 'registro_completado',
        'negocio': 'si',
        'duracion_negocio': '6 meses',
        'tipo_telefono': 'fijo',
        'horario_llamada': 'Vespertino (3:00 pm a 8:00 pm)',
        'lead_id': '1234567890',
        'submit_result': 'OK',
        'detail': 'sin error'
      });
      console.log("✅ DataLayer event 'generate_lead' disparado para no_cliente");
    } else {
      console.log("No se cumple la validación o el evento ya se disparó.");
    }
  }
  
  // Listener para los radio buttons con name="rbCliente"
  // Actualiza la variable noClientSelected según la opción seleccionada.
  document.querySelectorAll("input[name='rbCliente']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      if (radio.value === "No") {
        noClientSelected = true;
        console.log("✅ Opción 'No, pero quiero uno' seleccionada.");
      } else {
        noClientSelected = false;
        console.log("❌ Opción 'Sí, ya tengo uno' seleccionada.");
      }
    });
  });
  
  // (Opcional) Puedes agregar listeners a los selects o checkbox para actualizar los valores,
  // pero en este caso el dataLayer se disparará únicamente al hacer clic en el botón "Continuar".
  
  // Listener para el botón "Continuar"
  let btnContinue = document.getElementById("btnContinue");
  if (btnContinue) {
    btnContinue.addEventListener("click", function() {
      console.log("Se hizo clic en el botón Continuar.");
      if (noClientSelected) {
        console.log("Validando datos para 'No, pero quiero uno'...");
        pushDataLayerNoEvent();
      } else {
        console.log("La opción seleccionada no es 'No, pero quiero uno'; se ignora.");
      }
    });
  }
});





