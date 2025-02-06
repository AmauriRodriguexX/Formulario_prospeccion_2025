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
      linkText = linkText.replace('Disponible en ', '').replace('Consíguelo en el ', '').replace('Explóralo en ', '');
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
          'CDSource': ssSource,
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
      console.log("✅ DataLayer Push: form_field (Nombre)");
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

  // Función simulada de envío AJAX (adapta esta función a tu implementación real)
  function enviarFormularioAJAX(callback) {
    console.log("Simulando envío AJAX...");
    // Aquí se simula una respuesta exitosa después de 1 segundo.
    setTimeout(function() {
      callback({ status: 200 });
    }, 1000);
  }

});
