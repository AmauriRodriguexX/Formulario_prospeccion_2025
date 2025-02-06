// ====================================================
// 1) CÓDIGO DE GOOGLE TAG MANAGER
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
// 2) CÓDIGO UNIFICADO: Todo en un único bloque
// ====================================================
document.addEventListener("DOMContentLoaded", function() {
  // Variables generales
  let ssSource = window.ssSource || 'default_tracking_source';
  console.log("📢 Valor de ssSource:", ssSource);
  window.dataLayer = window.dataLayer || [];

  // Banderas de control
  let formStartTriggered = false;   // Para form_start
  let clientSelected = false;       // "Sí, ya tengo uno"
  let noClientSelected = false;     // "No, pero quiero uno"

  // Banderas para evitar doble disparo
  let eventPushedCliente = false;   // Para generate_lead_cliente
  let eventPushedNo = false;        // Para generate_lead (no_cliente)
  let errorDataLayerPushed = false; // Para error

  // ------------------------------------------------------------
  // Función para esperar a que un elemento esté en el DOM
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // form_start: Se dispara al detectar la primera interacción en #q1
  // ------------------------------------------------------------
  function handleFirstInteraction() {
    if (formStartTriggered) return;
    let CDFunnel = clientSelected ? "cliente" : "no_cliente";
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

  // Esperar #q1 para disparar form_start
  waitForElement("#q1", function(questionContainer) {
    const options = questionContainer.querySelectorAll(".radioButonsForm");
    options.forEach(option => {
      option.addEventListener("click", function firstClickListener() {
        handleFirstInteraction();
        options.forEach(opt => opt.removeEventListener("click", firstClickListener));
      });
    });
  });

  // ------------------------------------------------------------
  // Escucha de radios "rbCliente" para actualizar banderas
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // Funciones de validación
  // ------------------------------------------------------------
  function checkFormCompletionCliente() {
    let nombre   = document.getElementById("txbNombre")?.value.trim() || "";
    let apellido = document.getElementById("txbApPaterno")?.value.trim() || "";
    let telefono = document.getElementById("txbNumeroTel")?.value.trim() || "";
    let cp       = document.getElementById("txbCP")?.value.trim() || "";
    let aviso    = document.getElementById("avisoPrivacidad")?.checked || false;
    console.log("Validación form cliente:", {nombre, apellido, telefono, cp, aviso});
    return (nombre !== "" && apellido !== "" && telefono !== "" && cp !== "" && aviso);
  }

  function checkFormCompletionNoCliente() {
    let dia  = document.getElementById("diaSelect")?.value.trim() || "";
    let mes  = document.getElementById("mesSelect")?.value.trim() || "";
    let anio = document.getElementById("anioSelect")?.value.trim() || "";
    let fechaValida = (dia !== "0" && mes !== "0" && anio !== "0");
    let horaSelect = document.getElementById("horaSelect")?.value.trim() || "";
    let horarioValido = (horaSelect !== "0");
    let aviso = document.getElementById("avisoPrivacidad")?.checked || false;
    console.log("Validación reducida No-Cliente:", {dia, mes, anio, fechaValida, horaSelect, horarioValido, aviso});
    return (fechaValida && horarioValido && aviso);
  }

  // ------------------------------------------------------------
  // Evento para el botón "Continuar"
  // ------------------------------------------------------------
  let btnContinue = document.getElementById("btnContinue");
  if (btnContinue) {
    btnContinue.addEventListener("click", function() {
      console.log("Se hizo clic en Continuar.");

      // Dispara form_start si aún no se disparó y se seleccionó "Sí"
      if (clientSelected && !formStartTriggered) {
        handleFirstInteraction();
      }

      // Registrar form_field_steps:
      // (a) Pregunta 1: ¿Tienes un crédito activo con Compartamos Banco?
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
        console.log("✅ DataLayer Push: form_field_steps (crédito activo)");
      }

      // (b) Pregunta 2: ¿Tienes un negocio? (fuera de #q3_1)
      let radioNegocio = null;
      document.querySelectorAll("input[name='rbNegocio']").forEach(function(radio) {
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
        console.log("✅ DataLayer Push: form_field_steps (¿Tienes un negocio?)");
      }

      // (c) Pregunta 3: ¿Tu negocio tiene más de 6 meses? (#q3_1)
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
        console.log("✅ DataLayer Push: form_field_steps (¿Tu negocio tiene más de 6 meses?)");
      }

      // (d) Disparar generate_lead_cliente si se seleccionó "Sí, ya tengo uno"
      if (clientSelected && !eventPushedCliente) {
        if (checkFormCompletionCliente()) {
          eventPushedCliente = true;
          dataLayer.push({
            'event': 'generate_lead_cliente',
            'CDCategory': 'credito_individual',
            'CDFunnel': 'cliente',
            'CDSource': ssSource,
            'CDValue': 'OK',
            'CDLabel': 'Crédito crece y mejora',
            'submit_result': 'OK'
          });
          
          console.log("✅ Disparó generate_lead_cliente");
        } else {
          console.log("❌ No se cumple validación para 'Sí, ya tengo uno'.");
        }
      }

      // (e) Disparar generate_lead si se seleccionó "No, pero quiero uno"
      if (noClientSelected && !eventPushedNo) {
        if (checkFormCompletionNoCliente()) {
          eventPushedNo = true;
          dataLayer.push({
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
          console.log("✅ Disparó generate_lead para 'No, pero quiero uno'");
        } else {
          console.log("❌ No se cumple validación para 'No, pero quiero uno'.");
        }
      }
    });
  }

  // ------------------------------------------------------------
  // Función global para los cards (productos)
  // Se llama desde el HTML con: onclick="agregarTipoCreditoGrupal('Valor')"
  // ------------------------------------------------------------
  window.agregarTipoCreditoGrupal = function(answer) {
    console.log("Función agregarTipoCreditoGrupal INICIADA con:", answer);
    dataLayer.push({
      'event': 'form_field_steps',
      'CDCategory': 'credito_grupal',
      'CDFunnel': 'cliente',
      'CDSource': ssSource,
      'pantalla': 'pantalla_1-60%',
      'field_name': '03. Producto seleccionado',
      'field_value': answer
    });
    console.log("✅ DataLayer Push: Producto seleccionado", answer);
    console.log("Terminé de empujar al dataLayer, voy a seguir con la navegación");
    // Lógica adicional, por ejemplo:
    $('#tipoCreditoGrupal').val(answer);
    $('#tipoCreditoGrupal').trigger('change');
    // O redirigir a un ID:
    // window.location.hash = "idDelFormulario";
  };

  // ------------------------------------------------------------
  // Disparo de eventos "form_field" en cada input
  // ------------------------------------------------------------
  // Ejemplo: Nombre
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

  // Primer apellido
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

  // Segundo apellido
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

  // Fecha nacimiento - Día
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

  // Fecha nacimiento - Mes
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

  // Fecha nacimiento - Año
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

  // Género
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

  // Tipo Teléfono
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

  // Teléfono
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

  // Horario
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

  // Código Postal
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

  // Correo electrónico
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

  // Aviso privacidad (checkbox)
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

  // ------------------------------------------------------------
  // Función simulada de envío AJAX (opcional)
  // ------------------------------------------------------------
  function enviarFormularioAJAX(callback) {
    console.log("Simulando envío AJAX...");
    setTimeout(function() {
      callback({ status: 200 });
    }, 1000);
  }

  // ------------------------------------------------------------
  // Sección de validación de error en campos (Nombre y Primer Apellido)
  // ------------------------------------------------------------
  function isValidName(name) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name);
  }
  function checkErrorValidation() {
    let nombre = document.getElementById("txbNombre")?.value.trim() || "";
    let apellido = document.getElementById("txbApPaterno")?.value.trim() || "";
    console.log("Validando campos:", { nombre, apellido });
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
  function pushErrorDataLayer() {
    console.log("Intentando disparar dataLayer de error...");
    if (!errorDataLayerPushed && checkErrorValidation()) {
      errorDataLayerPushed = true;
      dataLayer.push({
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
  
  // Exponemos la función de error globalmente para pruebas
  window.pushErrorDataLayer = pushErrorDataLayer;
  
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
