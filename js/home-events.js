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
  document.addEventListener("click", function(event) {
    const radioButton = event.target.closest("input[name='rbCliente']");
    if (radioButton) {
      let CDFunnel = radioButton.value === "Si" ? "cliente" : "no_cliente";
      let CDCategory = radioButton.value === "Si" ? "credito_individual" : "NA";
      let fieldValue = radioButton.value;
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




// data layer generate_lead_client
document.addEventListener("DOMContentLoaded", function() {
  // Variable de tracking de origen, definida o por defecto
  let ssSource = window.ssSource || 'default_tracking_source';
  
  // Bandera para saber si el usuario seleccionó "Sí, ya tengo uno"
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
    
    return (nombre !== "" && apellido !== "" && telefono !== "" && cp !== "" && aviso);
  }

  // Función para disparar el dataLayer push
  function pushDataLayerEvent() {
    // Se dispara únicamente si el usuario seleccionó "Sí, ya tengo uno", 
    // se completaron los campos y aún no se ha enviado el evento
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
    }
  }

  // Escuchar la selección de los radio buttons
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

  // Se agregan listeners a cada uno de los campos requeridos para validar su completitud
  const fieldIds = ["txbNombre", "txbApPaterno", "txbNumeroTel", "txbCP"];
  fieldIds.forEach(function(id) {
    let element = document.getElementById(id);
    if (element) {
      // Usamos 'blur' e 'input' para detectar cambios
      element.addEventListener("blur", pushDataLayerEvent);
      element.addEventListener("input", pushDataLayerEvent);
    }
  });

  // Listener para el checkbox de Aviso de Privacidad
  let avisoCheckbox = document.getElementById("avisoPrivacidad");
  if (avisoCheckbox) {
    avisoCheckbox.addEventListener("change", pushDataLayerEvent);
  }
});







// Data layer para "No, pero quiero uno"
document.addEventListener("DOMContentLoaded", function() {
  // Variable de tracking de origen, definida o por defecto.
  let ssSource = window.ssSource || 'default_tracking_source';

  // Bandera para saber si se seleccionó "No, pero quiero uno"
  let noClientSelected = false;

  // Bandera para evitar disparar el evento más de una vez
  let eventPushedNo = false;

  // Función de validación para "No, pero quiero uno"
  function checkNoFormCompletion() {
    // Campos comunes
    let nombre    = document.getElementById("txbNombre") ? document.getElementById("txbNombre").value.trim() : "";
    let apellido  = document.getElementById("txbApPaterno") ? document.getElementById("txbApPaterno").value.trim() : "";
    let telefono  = document.getElementById("txbNumeroTel") ? document.getElementById("txbNumeroTel").value.trim() : "";
    let cp        = document.getElementById("txbCP") ? document.getElementById("txbCP").value.trim() : "";
    let aviso     = document.getElementById("avisoPrivacidad") ? document.getElementById("avisoPrivacidad").checked : false;
    
    // Campos adicionales para "No, pero quiero uno"
    let fechaNacimiento = document.getElementById("fechaNacimiento") ? document.getElementById("fechaNacimiento").value.trim() : "";
    let horaSelect      = document.getElementById("horaSelect") ? document.getElementById("horaSelect").value.trim() : "";
    
    // Verificar que se haya seleccionado al menos un género (grupo de radio con name="rbSexo")
    let generoSeleccionado = false;
    document.querySelectorAll("input[name='rbSexo']").forEach(function(radio) {
      if (radio.checked) {
        generoSeleccionado = true;
      }
    });
    
    console.log("Validación No-Cliente:", { nombre, apellido, telefono, cp, aviso, fechaNacimiento, horaSelect, generoSeleccionado });
    return (
      nombre !== "" &&
      apellido !== "" &&
      telefono !== "" &&
      cp !== "" &&
      aviso &&
      fechaNacimiento !== "" &&
      horaSelect !== "" &&
      generoSeleccionado
    );
  }

  // Función para disparar el dataLayer push para "No, pero quiero uno"
  function pushDataLayerNoEvent() {
    if (noClientSelected && checkNoFormCompletion() && !eventPushedNo) {
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
    }
  }

  // Escuchar la selección de los radio buttons (name="rbCliente")
  document.querySelectorAll("input[name='rbCliente']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      if (radio.value === "No") {
        noClientSelected = true;
        console.log("✅ Opción 'No, pero quiero uno' seleccionada.");
        // Llamada inmediata: si el formulario ya está completo, se dispara el push
        pushDataLayerNoEvent();
      } else {
        noClientSelected = false;
        console.log("❌ Opción 'Sí, ya tengo uno' seleccionada.");
      }
    });
  });

  // Agregar listeners a los campos comunes
  const commonFieldIds = ["txbNombre", "txbApPaterno", "txbNumeroTel", "txbCP"];
  commonFieldIds.forEach(function(id) {
    let element = document.getElementById(id);
    if (element) {
      element.addEventListener("blur", function() {
        if (noClientSelected) { pushDataLayerNoEvent(); }
      });
      element.addEventListener("input", function() {
        if (noClientSelected) { pushDataLayerNoEvent(); }
      });
    }
  });

  // Agregar listeners a los campos adicionales
  const extraFieldIds = ["fechaNacimiento", "horaSelect"];
  extraFieldIds.forEach(function(id) {
    let element = document.getElementById(id);
    if (element) {
      element.addEventListener("blur", function() {
        if (noClientSelected) { pushDataLayerNoEvent(); }
      });
      element.addEventListener("input", function() {
        if (noClientSelected) { pushDataLayerNoEvent(); }
      });
    }
  });

  // Listener para el grupo de radio de género (name="rbSexo")
  document.querySelectorAll("input[name='rbSexo']").forEach(function(radio) {
    radio.addEventListener("change", function() {
      if (noClientSelected) { pushDataLayerNoEvent(); }
    });
  });

  // Listener para el checkbox de Aviso de Privacidad
  let avisoCheckbox = document.getElementById("avisoPrivacidad");
  if (avisoCheckbox) {
    avisoCheckbox.addEventListener("change", function() {
      if (noClientSelected) { pushDataLayerNoEvent(); }
    });
  }
});




document.addEventListener("DOMContentLoaded", function() {
  let ssSource = window.ssSource || 'default_tracking_source';
  let noClientSelected = false;
  let eventPushedNo = false;

  // Función de validación actualizada para "No, pero quiero uno"
  function checkNoClienteCompletion() {
    // Validar la fecha de nacimiento usando los select de día, mes y año.
    let dia = document.getElementById("diaSelect") ? document.getElementById("diaSelect").value.trim() : "";
    let mes = document.getElementById("mesSelect") ? document.getElementById("mesSelect").value.trim() : "";
    let anio = document.getElementById("anioSelect") ? document.getElementById("anioSelect").value.trim() : "";
    let fechaValida = (dia !== "0" && mes !== "0" && anio !== "0");
    
    // Validar el horario (select)
    let horaSelect = document.getElementById("horaSelect") ? document.getElementById("horaSelect").value.trim() : "";
    let horarioValido = (horaSelect !== "0");
    
    // Validar el checkbox
    let aviso = document.getElementById("avisoPrivacidad") ? document.getElementById("avisoPrivacidad").checked : false;
    
    console.log("Validación reducida No-Cliente:", {
      dia, mes, anio, fechaValida, horaSelect, horarioValido, aviso
    });
    
    return (fechaValida && horarioValido && aviso);
  }

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
  document.querySelectorAll("input[name='rbCliente']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      if (radio.value === "No") {
        noClientSelected = true;
        console.log("✅ Opción 'No, pero quiero uno' seleccionada.");
        pushDataLayerNoEvent();
      } else {
        noClientSelected = false;
        console.log("❌ Opción 'Sí, ya tengo uno' seleccionada.");
      }
    });
  });

  // Listeners para los select de fecha (día, mes y año)
  ["diaSelect", "mesSelect", "anioSelect"].forEach(function(id) {
    let element = document.getElementById(id);
    if (element) {
      element.addEventListener("change", function() {
        if (noClientSelected) { pushDataLayerNoEvent(); }
      });
    }
  });

  // Listener para el select de hora
  let horaSelectEl = document.getElementById("horaSelect");
  if (horaSelectEl) {
    horaSelectEl.addEventListener("change", function() {
      if (noClientSelected) { pushDataLayerNoEvent(); }
    });
  }

  // Listener para el checkbox de Aviso de Privacidad
  let avisoCheckbox = document.getElementById("avisoPrivacidad");
  if (avisoCheckbox) {
    avisoCheckbox.addEventListener("change", function() {
      if (noClientSelected) { pushDataLayerNoEvent(); }
    });
  }
});





document.addEventListener("DOMContentLoaded", function() {
  let ssSource = window.ssSource || 'default_tracking_source';
  let errorDataLayerPushed = false;

  // Función que valida que el nombre solo contenga letras y espacios.
  function isValidName(name) {
    // Permite letras (incluyendo acentos y ñ) y espacios.
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name);
  }

  // Función que revisa si hay error en los campos obligatorios: Nombre y Primer Apellido.
  function checkErrorValidation() {
    let nombre = document.getElementById("txbNombre") ? document.getElementById("txbNombre").value.trim() : "";
    let apellido = document.getElementById("txbApPaterno") ? document.getElementById("txbApPaterno").value.trim() : "";
    
    console.log("Validando campos:", { nombre: nombre, apellido: apellido });
    
    if (nombre === "" || !isValidName(nombre)) {
      console.log("Error: El campo Nombre está vacío o contiene caracteres inválidos.");
      return true;
    }
    if (apellido === "") {
      console.log("Error: El campo Primer Apellido está vacío.");
      return true;
    }
    return false;
  }

  // Función para disparar el dataLayer de error
  function pushErrorDataLayer() {
    console.log("Intentando disparar dataLayer de error...");
    if (!errorDataLayerPushed && checkErrorValidation()) {
      errorDataLayerPushed = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'generate_lead',
        'CDCategory': 'NA',   
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
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
    } else {
      console.log("No se disparó el error. O bien ya se disparó o la validación no detectó errores.");
    }
  }
  
  // Para facilitar la prueba, exponemos la función al objeto global
  window.pushErrorDataLayer = pushErrorDataLayer;
  
  // Agregar listeners en los campos de Nombre y Primer Apellido
  let nombreField = document.getElementById("txbNombre");
  if (nombreField) {
    nombreField.addEventListener("blur", pushErrorDataLayer);
    nombreField.addEventListener("input", pushErrorDataLayer);
  }
  
  let apellidoField = document.getElementById("txbApPaterno");
  if (apellidoField) {
    apellidoField.addEventListener("blur", pushErrorDataLayer);
    apellidoField.addEventListener("input", pushErrorDataLayer);
  }
});
