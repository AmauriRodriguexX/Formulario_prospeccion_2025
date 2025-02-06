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

  // j) Evento para cuando el usuario finaliza el registro mediante submit (para clientes)
  document.addEventListener("submit", function(event) {
    if (event.target.matches("#submitForm")) {
      event.preventDefault();
      setTimeout(() => {
        dataLayer.push({
          'event': 'generate_lead_cliente',
          'CDCategory': 'credito_individual',
          'CDFunnel': 'cliente',
          'CDSource': ssSource, // ssSource ahora está definida
          'CDValue': 'OK',
          'CDLabel': 'Crédito crece y mejora',
          'submit_result': 'OK'
        });
        console.log("✅ DataLayer Push: generate_lead_cliente (submit)");
        event.target.submit();
      }, 500);
    }
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

  // 2. Envío del formulario vía AJAX para la sección "Información cliente"
  // Se asume que el formulario tiene el id "submitForm"
  waitForElement("#submitForm", function(formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault(); // Interceptamos el envío para manejarlo vía AJAX

      // Llama a la función AJAX (debes adaptar enviarFormularioAJAX a tu lógica real)
      enviarFormularioAJAX(function(response) {
        if (response.status === 200) {  // Éxito en el envío (código 200)
          setTimeout(function() {
            // Si el usuario NO es cliente, se dispara el evento generate_lead
            if (cliente !== "Si") {
              dataLayer.push({
                'event': 'generate_lead',
                'CDCategory': 'NA',
                'CDFunnel': 'no_cliente',
                'CDSource': window.ssSource || 'default_tracking_source',
                'CDAction': 'Registro exitoso - OK',
                'pantalla': 'pantalla_2',
                'CDValue': valorNombre || 'nombre_test',
                'negocio': 'si',
                'duracion_negocio': '6 meses',
                'tipo_telefono': 'fijo',
                'horario_llamada': 'Vespertino (3:00 pm a 8:00 pm)',
                'lead_id': '1234567890',
                'submit_result': 'OK',
                'detail': 'sin error'
              });
              console.log("✅ DataLayer Push: generate_lead (Registro exitoso)");
            } else {
              // Si el usuario es cliente, se dispara generate_lead_cliente
              dataLayer.push({
                'event': 'generate_lead_cliente',
                'CDCategory': 'credito_individual',
                'CDFunnel': 'cliente',
                'CDSource': window.ssSource || 'default_tracking_source',
                'CDValue': 'OK',
                'CDLabel': 'Crédito crece y mejora',
                'submit_result': 'OK'
              });
              console.log("✅ DataLayer Push: generate_lead_cliente (Registro exitoso)");
            }
            // Redirige a la Thank You Page
            window.location.href = "thank-you.html";
          }, 500);
        } else {
          // Caso de error: se dispara el dataLayer de error
          dataLayer.push({
            'event': 'generate_lead',
            'CDCategory': 'NA',
            'CDFunnel': 'no_cliente',
            'CDSource': window.ssSource || 'default_tracking_source',
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
          console.log("❌ DataLayer Push: generate_lead (Error en registro)");
        }
      });
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
  let ssSource = window.ssSource || 'default_tracking_source';
  console.log("📢 Valor de ssSource:", ssSource);

  window.dataLayer = window.dataLayer || [];

  // ✅ Lista de CAMPOS ADICIONALES requeridos para `generate_lead`
  const requiredFieldsSecondLayer = {
    "txbNombre": false,
    "txbApPaterno": false,
    "txbNumeroTel": false,
    "txbCP": false,
    "avisoPrivacidad": false,
    "diaSelect": false,
    "mesSelect": false,
    "anioSelect": false,
    "rbSexo": false,
    "horaSelect": false
  };

  let leadSent = false;

  function areAllAdditionalFieldsFilled() {
    return Object.values(requiredFieldsSecondLayer).every(value => value === true);
  }

  function getFieldValue(selector, defaultValue = "Desconocido") {
    let element = document.querySelector(selector);
    return element ? element.value.trim() || defaultValue : defaultValue;
  }

  function trackAdditionalFieldCompletion(fieldId, value) {
    if (value && value.trim() !== "") {
      requiredFieldsSecondLayer[fieldId] = true;
      console.log(`✅ Campo ${fieldId} completado.`);
    } else {
      requiredFieldsSecondLayer[fieldId] = false;
      console.log(`❌ Campo ${fieldId} aún vacío.`);
    }

    if (areAllAdditionalFieldsFilled() && !leadSent) {
      leadSent = true;
      console.log("🎯 Todos los campos adicionales están completos. Enviando evento generate_lead...");
      dataLayer.push({
        'event': 'generate_lead',
        'CDCategory': 'NA',
        'CDFunnel': 'no_cliente',
        'CDSource': ssSource,
        'CDAction': 'Registro exitoso - OK',
        'pantalla': 'pantalla_2',
        'CDValue': getFieldValue("#txbNombre", "nombre_test"),
        'negocio': 'si',
        'duracion_negocio': '6 meses',
        'tipo_telefono': getFieldValue("#telefonoSelect", "fijo"),
        'horario_llamada': getFieldValue("#horaSelect", "Vespertino (3:00 pm a 8:00 pm)"),
        'lead_id': '1234567890',
        'submit_result': 'OK',
        'detail': 'sin error'
      });
      console.log("✅ DataLayer Push: generate_lead (Registro exitoso)");
    }
  }

  ["txbNombre", "txbApPaterno", "txbNumeroTel", "txbCP"].forEach(fieldId => {
    waitForElement(`#${fieldId}`, function(input) {
      input.addEventListener("focusout", function() {
        trackAdditionalFieldCompletion(fieldId, input.value);
      });
    });
  });

  ["diaSelect", "mesSelect", "anioSelect", "horaSelect"].forEach(fieldId => {
    waitForElement(`#${fieldId}`, function(select) {
      select.addEventListener("change", function() {
        trackAdditionalFieldCompletion(fieldId, select.value);
      });
    });
  });

  document.querySelectorAll("input[name='rbSexo']").forEach(function(radio) {
    radio.addEventListener("click", function() {
      trackAdditionalFieldCompletion("rbSexo", radio.value);
    });
  });

  waitForElement("#avisoPrivacidad", function(checkbox) {
    checkbox.addEventListener("change", function() {
      requiredFieldsSecondLayer["avisoPrivacidad"] = checkbox.checked;
      console.log(`✅ Aviso de privacidad aceptado: ${checkbox.checked}`);
      
      if (areAllAdditionalFieldsFilled() && !leadSent) {
        leadSent = true;
        console.log("🎯 Todos los campos adicionales están completos. Enviando evento generate_lead...");
        dataLayer.push({
          'event': 'generate_lead',
          'CDCategory': 'NA',
          'CDFunnel': 'no_cliente',
          'CDSource': ssSource,
          'CDAction': 'Registro exitoso - OK',
          'pantalla': 'pantalla_2',
          'CDValue': getFieldValue("#txbNombre", "nombre_test"),
          'negocio': 'si',
          'duracion_negocio': '6 meses',
          'tipo_telefono': getFieldValue("#telefonoSelect", "fijo"),
          'horario_llamada': getFieldValue("#horaSelect", "Vespertino (3:00 pm a 8:00 pm)"),
          'lead_id': '1234567890',
          'submit_result': 'OK',
          'detail': 'sin error'
        });
        console.log("✅ DataLayer Push: generate_lead (Registro exitoso)");
      }
    });
  });

});

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




document.addEventListener("DOMContentLoaded", function() {
  let ssSource = window.ssSource || 'default_tracking_source';
  console.log("📢 Valor de ssSource:", ssSource);

  window.dataLayer = window.dataLayer || [];

  // Lista de campos obligatorios
  const requiredFields = {
      "txbNombre": false,
      "txbApPaterno": false,
      "txbNumeroTel": false,
      "txbCP": false,
      "avisoPrivacidad": false,
      "diaSelect": false,
      "mesSelect": false,
      "anioSelect": false,
      "rbSexo": false,
      "horaSelect": false
  };

  function areAllFieldsFilled() {
      return Object.values(requiredFields).every(value => value === true);
  }

  function getDynamicValues() {
      return {
          nombre: document.querySelector("#txbNombre")?.value || "",
          telefonoTipo: document.querySelector("#telefonoSelect")?.value || "",
          horario: document.querySelector("#horaSelect")?.value || "",
          leadId: "1234567890"
      };
  }

  function trackFieldCompletion(fieldId, value) {
      requiredFields[fieldId] = value.trim() !== "";
      
      // Si hay errores, disparamos `generate_lead` con error
      if (!areAllFieldsFilled()) {
          console.log("❌ Error en formulario. Enviando evento generate_lead (Error)");

          let { nombre, telefonoTipo, horario, leadId } = getDynamicValues();

          dataLayer.push({
              'event': 'generate_lead_cliente',
              'CDCategory': 'NA',
              'CDFunnel': 'no_cliente',
              'CDSource': ssSource,
              'CDAction': 'Registro Fallido',
              'pantalla': 'pantalla_2',
              'CDValue': nombre || "nombre_test",
              'negocio': '',
              'duracion_negocio': '',
              'tipo_telefono': telefonoTipo,
              'horario_llamada': horario,
              'lead_id': '',
              'submit_result': 'Error',
              'detail': 'No se pudo mandar la información. Inténtelo más tarde'
          });

          console.log("❌ DataLayer Push: generate_lead (Error en el formulario)");
          return;
      }

      // Si todo está correcto, enviamos `generate_lead_cliente`
      console.log("🎯 Todos los campos requeridos están completos. Enviando evento generate_lead_cliente...");

      dataLayer.push({
          'event': 'generate_lead_cliente',
          'CDCategory': 'credito_individual',
          'CDFunnel': 'cliente',
          'CDSource': ssSource,
          'CDValue': 'OK',
          'CDLabel': 'Crédito crece y mejora',
          'submit_result': 'OK'
      });

      console.log("✅ DataLayer Push: generate_lead_cliente (Registro exitoso)");
  }

  // Eventos para los campos de texto y selects
  ["txbNombre", "txbApPaterno", "txbNumeroTel", "txbCP", "diaSelect", "mesSelect", "anioSelect", "horaSelect"].forEach(fieldId => {
      waitForElement(`#${fieldId}`, function(input) {
          input.addEventListener("focusout", function() {
              trackFieldCompletion(fieldId, input.value);
          });
      });
  });

  // Evento para los radio buttons (Género)
  document.querySelectorAll("input[name='rbSexo']").forEach(function(radio) {
      radio.addEventListener("click", function() {
          trackFieldCompletion("rbSexo", radio.value);
      });
  });

  // Evento para checkbox (Aviso de privacidad)
  waitForElement("#avisoPrivacidad", function(checkbox) {
      checkbox.addEventListener("change", function() {
          requiredFields["avisoPrivacidad"] = checkbox.checked;
          trackFieldCompletion("avisoPrivacidad", checkbox.checked ? "aceptado" : "");
      });
  });
});

/**
* ✅ Esperar a que un elemento esté en el DOM antes de agregar eventos.
*/
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


