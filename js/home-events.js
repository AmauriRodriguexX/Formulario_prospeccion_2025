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

document.addEventListener("DOMContentLoaded", function() {
  // Usamos ssSource o un valor por defecto
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

  // a) Cuando aparece la pregunta inicial (#q1)
  waitForElement("#q1", function(questionContainer) {
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
    console.log("✅ DataLayer Push: form_start (pregunta inicial)");
  });

  // b) Al hacer clic en "Sí, ya tengo uno" o "No, pero quiero uno" (input[name='rbCliente'])
  // Escuchamos clics en todo el documento
document.addEventListener("click", function(event) {
  // Buscamos el elemento contenedor con la clase completa
  const container = event.target.closest(".radioButonsForm.answer");
  if (container) {
    // Obtenemos el radio interno dentro del contenedor
    const radioButton = container.querySelector("input[name='rbCliente']");
    if (radioButton) {
      // Si no está seleccionado, lo marcamos
      if (!radioButton.checked) {
        radioButton.checked = true;
      }
      
      // Configuramos los parámetros según el valor del radio
      const CDFunnel = radioButton.value === "Si" ? "cliente" : "no_cliente";
      const CDCategory = radioButton.value === "Si" ? "credito_individual" : "NA";
      const fieldValue = radioButton.value;
      
      // Enviamos la información al dataLayer
      dataLayer.push({
        'event': 'form_field_steps',
        'CDCategory': CDCategory,
        'CDFunnel': CDFunnel,
        'CDSource': ssSource,
        'pantalla': 'pantalla_1-0%',
        'field_name': '01. ¿Tienes un crédito activo con Compartamos Banco?',
        'field_value': fieldValue
      });
      console.log("✅ DataLayer Push: form_field_steps (crédito activo)", dataLayer);
    }
  }
});


  // c) Evento para la pregunta "¿Tienes un negocio?" (excluyendo la sección #q3_1)
  document.addEventListener("click", function(event) {
    const container = event.target.closest(".radioButonsForm");
    // Si el clic es dentro de #q3_1, se ignora aquí
    if (container && container.closest("#q3_1")) {
      return;
    }
    if (container && container.querySelector("input[name='rbNegocio']")) {
      const radioButton = container.querySelector("input[name='rbNegocio']");
      let fieldValue = radioButton.value;
      dataLayer.push({
        'event': 'form_field_steps',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_1-30%',
        'field_name': '02. ¿Tienes un negocio?',
        'field_value': fieldValue
      });
      console.log("✅ DataLayer Push: form_field_steps (¿Tienes un negocio?)", dataLayer);
    }
  });

  // d) Evento para la pregunta "¿Tu negocio tiene más de 6 meses?" en la sección #q3_1
  document.addEventListener("click", function(event) {
    const questionSection = event.target.closest("#q3_1");
    if (questionSection) {
      const radioContainer = event.target.closest(".radioButonsForm");
      if (radioContainer && radioContainer.querySelector("input[name='rbNegocio']")) {
        const radioButton = radioContainer.querySelector("input[name='rbNegocio']");
        let valueLower = radioButton.value.toLowerCase();
        dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': 'NA',
          'CDFunnel': 'no_cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-60%',
          'field_name': '03. ¿Tu negocio tiene más de 6 meses?',
          'field_value': valueLower === "si" ? "si" : "no"
        });
        console.log("✅ DataLayer Push: form_field_steps (¿Tu negocio tiene más de 6 meses?)", dataLayer);
      }
    }
  });

  // e) Evento para selección de tipo de crédito (input[name='rbCredito'])
  document.addEventListener("change", function(event) {
    if (event.target.matches("input[name='rbCredito']")) {
      let CDCategory = event.target.value === "Individual" ? "credito_individual" : "credito_grupal";
      let formattedFieldValue = event.target.value === "Individual" ? "Crédito Individual" : "Crédito Grupal";
      dataLayer.push({
        'event': 'form_field_steps',
        'CDCategory': CDCategory,
        'CDFunnel': 'cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_1-30%',
        'field_name': '02. ¿Qué tipo de crédito tienes?',
        'field_value': formattedFieldValue
      });
      console.log("✅ DataLayer Push: form_field_steps (tipo de crédito)");
    }
  });

  // f) Evento para selección de producto en el carrusel
  document.addEventListener("click", function(event) {
    if (event.target.closest(".card")) {
      let fieldValue = event.target.closest(".card").querySelector(".card_footer-name").innerText;
      dataLayer.push({
        'event': 'form_field_steps',
        'CDCategory': 'credito_grupal',
        'CDFunnel': 'cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_1-60%',
        'field_name': '03. Producto seleccionado',
        'field_value': fieldValue
      });
      console.log("✅ DataLayer Push: form_field_steps (producto seleccionado)");
    }
  });

  // g) Evento para clics en botones "Ir a blog" y "Sitio oficial"
  document.addEventListener("click", function(event) {
    if (event.target.matches(".finance-btn")) {
      let linkText = event.target.innerText.trim();
      dataLayer.push({
        'event': 'click_element',
        'CDAction': 'Clic ' + linkText,
        'CDCategory': 'credito_individual',
        'CDFunnel': 'cliente',
        'CDLabel': 'Crédito crece y mejora',
        'link_text': linkText
      });
      console.log("✅ DataLayer Push: click_element (" + linkText + ")");
    }
  });

  // h) Evento para descargas de la app (botones de .store-buttons a)
  document.addEventListener("click", function(event) {
    if (event.target.closest(".store-buttons a")) {
      const img = event.target.closest("a").querySelector("img");
      let linkText = img ? img.getAttribute("alt") : 'Sin texto';
      linkText = linkText.replace('Disponible en ', '')
                           .replace('Consíguelo en el ', '')
                           .replace('Explóralo en ', '');
      dataLayer.push({
        'event': 'click_element',
        'CDAction': 'Clic ' + linkText,
        'CDCategory': 'credito_individual',
        'CDFunnel': 'cliente',
        'CDLabel': 'Crédito crece y mejora',
        'link_text': linkText
      });
      console.log("✅ DataLayer Push: click_element (" + linkText + ")");
    }
  });

  // i) Evento para cuando el usuario inicia el registro en el formulario (sección #q3_2)
  waitForElement("#q3_2", function(registrationForm) {
    registrationForm.addEventListener("focusin", function() {
      dataLayer.push({
        'event': 'form_start',
        'CDCategory': 'credito_individual',
        'CDFunnel': 'cliente',
        'CDSource': ssSource,
        'pantalla': 'pantalla_4-90%',
        'CDLabel': 'Crédito crece y mejora'
      });
      console.log("✅ DataLayer Push: form_start (registro pantalla_4-90%)");
    });
  });



  // ====================================================
  // Sección 2: Formulario "Información cliente" (sección #q3_2)
  // ====================================================

  // 1. Evento para el campo "Nombre" (input con id "txbNombre")
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


  // ====================================================
  // Sección 2.1: DataLayer para cada campo del formulario "Información cliente"
  // ====================================================

  // 01. Nombre (ya definido arriba)
  // 02. Primer apellido
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

  // 03. Segundo apellido
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

  // 04. Fecha nacimiento - Día
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

  // 05. Fecha nacimiento - Mes
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

  // 06. Fecha nacimiento - Año
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

  // 07. Género (radio buttons)
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

  // 08. Tipo Teléfono
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

  // 09. Teléfono
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

  // Función simulada de envío AJAX (adapta esta función a tu implementación real)
  function enviarFormularioAJAX(callback) {
    console.log("Simulando envío AJAX...");
    // Se simula una respuesta exitosa después de 1 segundo.
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
        'CDValue': 'OK',
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
        'CDValue': 'nombre_test',
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





//error event cuando presionamos Sí, ya tengo uno
function validateQ3_2() {
  if (bandContinuar == false) {
      // Muestra el mensaje de error
      $('#msgDatosIncorrectos')
          .html('Verifica que todos los datos sean correctos.')
          .show();
      
      // Dispara el dataLayer con el objeto de error
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          'event': 'generate_lead',
          'CDCategory': 'NA',   
          'CDFunnel': 'no_cliente',
          'CDSource': ssSource,         // Asegúrate de que ssSource esté definido (global o en el scope adecuado)
          'CDAction': 'nombre test', 
          'pantalla': 'pantalla_2',
          'CDValue': '',
          'negocio': 'si',
          'duracion_negocio': '6 meses',
          'tipo_telefono': 'fijo',
          'horario_llamada': 'Vespertino (3:00 pm a 8:00 pm)',
          'lead_id': '',
          'submit_result': 'Error',
          'detail': 'No se pudo mandar la información. Inténtelo más tarde'
      });
      console.log("✅ DataLayer error event pushed");

      // Oculta el mensaje después de 7 segundos
      setTimeout(function() {
          $('#msgDatosIncorrectos').fadeOut();
      }, 7000);

      return false;
  }
  
  // Si no hay error, se oculta el mensaje y se procede con el envío
  $('#msgDatosIncorrectos').hide();
  sendData('');
}




