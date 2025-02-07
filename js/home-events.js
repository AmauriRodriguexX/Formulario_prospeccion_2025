/**
 * 📌 form_start - Primer data layer
 *
 * 🔹 Descripción:  
 * Se activa cuando el usuario llega al formulario de registro y comienza a interactuar.
 *
 * 🔹 Evento relacionado:
 * - `form_start`
 */


document.addEventListener("DOMContentLoaded", function () {
  let ssSource = window.ssSource || 'default_tracking_source';
  let formStartTriggered = false;
  let clientFormStartTriggered = false; // ✅ Ahora está correctamente definido una sola vez


  function pushDataLayer(eventName, additionalData = {}) {
      window.dataLayer = window.dataLayer || [];
      let data = {
          'event': eventName,
          'CDCategory': 'NA',
          'CDFunnel': document.querySelector("input[name='rbCliente']:checked")?.value === "Si" ? 'cliente' : 'no_cliente',
          'CDSource': ssSource,
          ...additionalData
      };
      window.dataLayer.push(data);
      console.log(`✅ DataLayer Push: ${eventName}`, data);
  }


  function handleFormStart() {
      document.querySelectorAll(".radioButonsForm").forEach(option => {
          option.addEventListener("click", function () {
              let radio = option.querySelector("input[type='radio']");
              if (radio) {
                  radio.checked = true;
                  if (!formStartTriggered) {
                      pushDataLayer('form_start', { 'pantalla': 'pantalla_1-0%' });
                      formStartTriggered = true;
                  }
              }
          });
      });
  }


  /**
 * 📌 form_field_steps - Data Layer Unificado (2, 3, 4, 9 y 10)
 *
 * 🔹 **Descripción:**
 * Se activa cuando el usuario elige opciones en los campos relevantes y presiona "Continuar".
 *
 * 🔹 **Condiciones:**
 * - Se ejecuta cuando el usuario selecciona una opción y da clic en "Continuar".
 * - Captura el tipo de crédito del usuario (Grupal o Individual).
 * - **Optimización total:** Reduce repeticiones y mantiene código limpio.
 *
 * 🔹 **Eventos relacionados:**
 * - `form_field_steps`
 */


function handleFormFieldSteps() {
  let btnContinue = document.getElementById("btnContinue");


  if (!btnContinue) {
      console.error("❌ Botón 'Continuar' no encontrado.");
      return;
  }


  btnContinue.addEventListener("click", function () {
      console.log("🎯 Botón 'Continuar' presionado.");


      // 📌 **1️⃣ ¿Tienes un crédito activo con Compartamos Banco?** (Data Layer 9)
      let selectedCliente = document.querySelector("input[name='rbCliente']:checked");
      if (selectedCliente) {
          pushDataLayer("form_field_steps", {
              'pantalla': 'pantalla_1-0%',
              'field_name': '01. ¿Tienes un crédito activo con Compartamos Banco?',
              'field_value': selectedCliente.value
          });
      } else {
          console.warn("⚠️ No se seleccionó '¿Tienes un crédito activo con Compartamos Banco?'.");
      }


      // 📌 **2️⃣ ¿Tienes un negocio?** (Data Layer 2)
      let selectedNegocio = document.querySelector("input[name='rbNegocio']:checked");
      if (selectedNegocio) {
          pushDataLayer("form_field_steps", {
              'pantalla': 'pantalla_1-30%',
              'field_name': '02. ¿Tienes un negocio?',
              'field_value': selectedNegocio.value
          });
      } else {
          console.warn("⚠️ No se seleccionó '¿Tienes un negocio?'.");
      }


      // 📌 **3️⃣ ¿Tu negocio tiene más de 6 meses?** (Data Layer 3)
      let selectedTiempoNegocio = document.querySelector("#q3_1 input[name='rbNegocio']:checked");
      if (selectedTiempoNegocio) {
          pushDataLayer("form_field_steps", {
              'pantalla': 'pantalla_1-60%',
              'field_name': '03. ¿Tu negocio tiene más de 6 meses?',
              'field_value': selectedTiempoNegocio.value
          });
      } else {
          console.warn("⚠️ No se seleccionó '¿Tu negocio tiene más de 6 meses?'.");
      }


      // 📌 **4️⃣ Tipo de crédito** (Data Layer 4)
      let selectedCredito = document.querySelector("input[name='rbCredito']:checked");
      if (selectedCredito) {
          pushDataLayer("form_field_steps", {
              'field_name': '04. Tipo de crédito',
              'field_value': selectedCredito.value
          });
      } else {
          console.warn("⚠️ No se seleccionó 'Tipo de crédito'.");
      }


      // 📌 **5️⃣ Nuevo: ¿Qué tipo de crédito tienes?** (Data Layer 10)
      let selectedTipoCredito = document.querySelector("input[name='rbCredito']:checked");
      if (selectedTipoCredito) {
          pushDataLayer("form_field_steps", {
              'pantalla': 'pantalla_1-30%',
              'field_name': '02. ¿Qué tipo de crédito tienes?',
              'field_value': selectedTipoCredito.value
          });
      } else {
          console.warn("⚠️ No se seleccionó '¿Qué tipo de crédito tienes?'.");
      }


      // 📌 **Validaciones de Depuración en Consola**
      console.log("📢 Validaciones finalizadas. Si hay mensajes de advertencia (⚠️), revisa los campos faltantes.");
  });
}


// 📌 **Ejecutamos la función cuando el DOM esté completamente cargado**
document.addEventListener("DOMContentLoaded", function () {
  console.log("📢 Cargando evento para 'Continuar' en form_field_steps...");
  handleFormFieldSteps();
});






  /**
   * 📌 form_start - Quinto data layer (Optimizado para evitar bloqueos)
   *
   * 🔹 Descripción:  
   * Se activa una sola vez cuando el usuario interactúa con cualquier campo dentro de `q3_2`.
   *
   * 🔹 Evento relacionado:
   * - `form_start`
   */
  function handleClientInfoFormStart() {
      let clientInfoSection = document.getElementById("q3_2");


      if (!clientInfoSection) {
          console.error("❌ No se encontró la sección q3_2.");
          return;
      }


      console.log("📢 Sección q3_2 detectada, añadiendo eventos.");


      function triggerClientFormStart() {
          if (!clientFormStartTriggered && typeof pushDataLayer === "function") { // ✅ Validamos que la función existe
              setTimeout(() => {
                  pushDataLayer("form_start", {
                      'pantalla': 'pantalla_2-90%'
                  });
                  clientFormStartTriggered = true;
                  console.log("✅ DataLayer Push: form_start (pantalla_2-90%)");
              }, 50); // ✅ Pequeño retraso para evitar lag
          }
      }


      // ✅ Evento para detectar el primer clic dentro de la sección
      clientInfoSection.addEventListener("click", triggerClientFormStart, { once: true });


      // ✅ Evento para detectar el primer focus en cualquier input o select dentro de q3_2
      document.querySelectorAll("#q3_2 input, #q3_2 select").forEach(element => {
          element.addEventListener("focus", triggerClientFormStart, { once: true });
      });
  }


  // 📌 Llamamos a las funciones después de que el DOM esté completamente cargado
  handleFormStart();
  handleFormFieldSteps();
  handleClientInfoFormStart();
});




/**
 * 📌 form_field - Sexto Data Layer (Optimizado)
 *
 * 🔹 Descripción:
 * Se dispara cuando el usuario interactúa con los campos del formulario en la pantalla "pantalla_2-80%".
 *
 * 🔹 Evento relacionado:
 * - `form_field`
 */


document.addEventListener("DOMContentLoaded", function () {
  let fieldMapping = {
      "txbNombre": "01. Nombre",
      "txbApPaterno": "02. Primer apellido",
      "txbApMaterno": "03. Segundo apellido",
      "diaSelect": "04. Fecha nacimiento - Día",
      "mesSelect": "05. Fecha nacimiento - Mes",
      "anioSelect": "06. Fecha nacimiento - Año",
      "rbFemenino": "07. Género",
      "rbMasculino": "07. Género",
      "telefonoSelect": "08. Tipo Teléfono",
      "txbNumeroTel": "09. Teléfono",
      "horaSelect": "10. Horario",
      "txbCP": "11. Código Postal",
      "txbCorreoElectronico": "12. Correo electrónico",
      "avisoPrivacidad": "13. Aviso privacidad"
  };


  function pushDataLayerField(event) {
      let field = event.target;
      let fieldName = fieldMapping[field.id];


      if (fieldName && !field.dataset.tracked) { // Evita duplicados
          window.dataLayer.push({
              'event': 'form_field',
              'CDCategory': 'NA',
              'CDFunnel': 'no_cliente',
              'CDSource': window.ssSource || 'default_tracking_source',
              'pantalla': 'pantalla_2-80%',
              'field_name': fieldName
          });


          console.log(`✅ DataLayer Push: form_field -> ${fieldName}`);
          field.dataset.tracked = "true"; // Marca el campo como rastreado
      }
  }


  // 📌 **Evento Delegado para Optimizar**
  document.addEventListener("focusin", function(event) {
      let field = event.target;
      if (field.id in fieldMapping) {
          pushDataLayerField(event);
      }
  });


  document.addEventListener("click", function(event) {
      let field = event.target;
      if (field.id in fieldMapping) {
          pushDataLayerField(event);
      }
  });


  console.log("📢 Eventos de seguimiento asignados a los campos de q3_2.");
});




/*
  ----------------------------------------------------------------------
  Script Unificado - generate_lead_cliente & generate_lead 7 y 14
  Descripción:
    - Se ejecuta cuando el usuario responde la primera pregunta (rbCliente)
      con "Sí, ya tengo uno" o "No, pero quiero uno".
     
    - Si el usuario selecciona "Sí, ya tengo uno" (Script 13 - generate_lead_cliente):
        - Al hacer clic en "Continuar", se empuja el evento "generate_lead_cliente"
          al dataLayer.
        - Omite validaciones de campos (nombre, teléfono, correo, aviso).
         
    - Si el usuario selecciona "No, pero quiero uno" (Script 7 - generate_lead):
        - Al hacer clic en "Continuar", se empuja el evento "generate_lead" al dataLayer
          (previa validación de que los campos clave estén llenos).
        - Se evita que el evento se dispare múltiples veces.
  ----------------------------------------------------------------------
*/


document.addEventListener("DOMContentLoaded", function () {
  var ssSource = window.ssSource || 'default_tracking_source';
  // Variable unificada para guardar la selección: "Si" o "No"
  var clientSelected = null;
  console.log("Script Unificado - generate_lead_cliente & generate_lead cargado.");


  // 1. Asignar event listeners a todos los radios del grupo rbCliente
  var clienteRadios = document.querySelectorAll("input[name='rbCliente']");
  for (var i = 0; i < clienteRadios.length; i++) {
    clienteRadios[i].addEventListener("click", function () {
      clientSelected = this.value;  // Se guarda "Si" o "No"
      console.log("Radio seleccionado: " + this.value + " → clientSelected =", clientSelected);
    });
  }


  // 2. Función para disparar el Data Layer para "Sí, ya tengo uno" (Script 13)
  function pushGenerateLeadCliente() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'generate_lead_cliente',
      'CDCategory': 'credito_individual',
      'CDFunnel': 'cliente',
      'CDSource': ssSource,
      'CDAction': 'Registro exitoso - OK',
      'pantalla': 'pantalla_2',
      'CDValue': 'nombre_test',   // Valor genérico o dinámico según necesites
      'CDLabel': 'credito_individual',
      'lead_id': '1234567890',      // Opcional
      'submit_result': 'OK',
      'detail': 'sin error'
    });
    console.log("DataLayer Push: generate_lead_cliente (Clientes) disparado.");
  }


  // 3. Función para disparar el Data Layer para "No, pero quiero uno" (Script 7)
  function pushGenerateLead() {
    // Validación básica de campos (puedes ampliar la lógica según tus necesidades)
    let dia = document.getElementById("diaSelect")?.value.trim() || "0";
    let mes = document.getElementById("mesSelect")?.value.trim() || "0";
    let anio = document.getElementById("anioSelect")?.value.trim() || "0";
    let fechaValida = (dia !== "0" && mes !== "0" && anio !== "0");
    let horarioValido = document.getElementById("horaSelect")?.value.trim() !== "0";
    let aviso = document.getElementById("avisoPrivacidad")?.checked || false;


    if (!fechaValida || !horarioValido || !aviso) {
      console.warn("Validación fallida para generate_lead.");
      return;
    }


    var formData = {
      negocio: document.querySelector("input[name='rbNegocio']:checked")?.value || "no",
      duracion_negocio: document.querySelector("#q3_1 input[name='rbNegocio']:checked")?.value === "Si" ? "6 meses" : "menos de 6 meses",
      tipo_telefono: document.getElementById("telefonoSelect")?.value || "no_definido",
      horario_llamada: document.getElementById("horaSelect")?.value || "no_definido",
      lead_id: "1234567890"
    };


    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'generate_lead',
      'CDCategory': 'NA',
      'CDFunnel': 'no_cliente',
      'CDSource': ssSource,
      'CDAction': 'Registro exitoso - OK',
      'pantalla': 'pantalla_2',
      'CDValue': document.getElementById("txbNombre")?.value || "nombre_test",
      'negocio': formData.negocio,
      'duracion_negocio': formData.duracion_negocio,
      'tipo_telefono': formData.tipo_telefono,
      'horario_llamada': formData.horario_llamada,
      'lead_id': formData.lead_id,
      'submit_result': 'OK',
      'detail': 'sin error'
    });
    console.log("DataLayer Push: generate_lead (No Cliente) disparado.");
  }


  // 4. Función unificada que decide qué Data Layer disparar según la selección
  function pushUnifiedDataLayer() {
    console.log("En pushUnifiedDataLayer, clientSelected =", clientSelected);
    if (clientSelected === "Si") {
      pushGenerateLeadCliente();
    } else if (clientSelected === "No") {
      pushGenerateLead();
    } else {
      console.warn("No se ha seleccionado ninguna opción en rbCliente.");
    }
  }


  // 5. Asignar event listener al botón "Continuar"
  function waitForButtonAndBindEvent() {
    var btnContinue = document.getElementById("btnContinue");
    if (!btnContinue) {
      console.warn("Botón 'Continuar' no encontrado. Esperando...");
      setTimeout(waitForButtonAndBindEvent, 500);
      return;
    }
    console.log("Botón 'Continuar' detectado. Añadiendo evento.");


    btnContinue.addEventListener("click", function () {
      console.log("Clic en 'Continuar'. Valor de clientSelected en el momento:", clientSelected);
      pushUnifiedDataLayer();
    });
  }


  waitForButtonAndBindEvent();
});






/**
 * 📌 form_field_steps - Data Layer 11 (Créditos Adicionales en Carrusel)
 *
 * 🔹 **Descripción:**
 * Se activa cuando el usuario selecciona un producto de **Créditos adicionales** en el carrusel.
 *
 * 🔹 **Condiciones:**
 * - Se ejecuta cuando el usuario hace clic en una card.
 * - Captura el nombre del producto seleccionado.
 * - **No modifica la estructura del carrusel**.
 *
 * 🔹 **Eventos relacionados:**
 * - `form_field_steps`
 */


document.addEventListener("DOMContentLoaded", function () {
  console.log("📢 Cargando eventos para capturar créditos adicionales...");


  function agregarTipoCreditoGrupal(productoSeleccionado) {
      console.log(`🎯 Producto seleccionado: ${productoSeleccionado}`);


      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          'event': 'form_field_steps',
          'CDCategory': 'credito_grupal', // Se puede cambiar dinámicamente si aplica
          'CDFunnel': 'cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_1-60%',
          'field_name': '03. Producto seleccionado',
          'field_value': productoSeleccionado
      });


      console.log(`✅ DataLayer Push: form_field_steps (Producto: ${productoSeleccionado})`);
  }


  // 🎯 Agregar eventos a cada card sin modificar su estructura
  document.querySelectorAll(".carousel .card").forEach(card => {
      card.addEventListener("click", function () {
          let productoSeleccionado = this.querySelector(".card_footer-name").innerText.trim();
          agregarTipoCreditoGrupal(productoSeleccionado);
      });
  });


  console.log("✅ Listos los eventos de los cards del carrusel.");
});






/**
 * 📌 form_start - Data Layer 12 (Corregido)
 *
 * 🔹 Descripción:
 * Se activa cuando el usuario llega al formulario de registro desde "Crédito Individual" o "Crédito Crece y Mejora".
 *
 * 🔹 Condiciones:
 * - El usuario debe haber seleccionado "Sí, ya tengo uno".
 * - Se ejecuta cuando el usuario interactúa con un input en el formulario.
 * - Debe capturar el tipo de crédito seleccionado.
 *
 * 🔹 Evento relacionado:
 * - `form_start`
 */


document.addEventListener("DOMContentLoaded", function () {
  let clienteSeleccionado = false;
  let formStartTriggered = false;
  let selectedCredito = null;


  // Detectar si el usuario eligió "Sí, ya tengo uno"
  document.querySelectorAll("input[name='rbCliente']").forEach(function (radio) {
      radio.addEventListener("change", function () {
          clienteSeleccionado = (radio.value === "Si");
          console.log(`🎯 Opción seleccionada: ${radio.value} → clienteSeleccionado = ${clienteSeleccionado}`);
      });
  });


  // Capturar el tipo de crédito seleccionado
  document.querySelectorAll("input[name='rbCredito']").forEach(function (radio) {
      radio.addEventListener("change", function () {
          selectedCredito = radio.value;
          console.log(`📌 Tipo de crédito seleccionado: ${selectedCredito}`);
      });
  });


  function triggerFormStart() {
      if (!clienteSeleccionado || formStartTriggered || !selectedCredito) {
          console.warn("⚠️ No se cumplen las condiciones para disparar form_start.");
          return;
      }


      let ssSource = window.ssSource || 'default_tracking_source';


      formStartTriggered = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          'event': 'form_start',
          'CDCategory': selectedCredito === "Crédito crece y mejora" ? 'credito_grupal' : 'credito_individual',
          'CDFunnel': 'cliente',
          'CDSource': ssSource,
          'pantalla': 'pantalla_4-90%',
          'CDLabel': selectedCredito
      });
      console.log(`✅ DataLayer Push: form_start (${selectedCredito})`);
  }


  // Detectar interacción con cualquier input dentro del formulario
  document.querySelectorAll("#pantalla_4 input").forEach(input => {
      input.addEventListener("focus", triggerFormStart);
  });
});






/*
  ----------------------------------------------------------------------
  Script 14 - click_element (Clic en "Ir al blog" o "Sitio oficial")
  Descripción:
    - Se ejecuta cuando el usuario hace clic en los botones:
      "Ir al blog" o "Sitio oficial".
    - Captura el tipo de crédito elegido y si el usuario es cliente o no.
    - Envía el evento "click_element" al dataLayer.
  ----------------------------------------------------------------------
*/


document.addEventListener("DOMContentLoaded", function () {
  var ssSource = window.ssSource || 'default_tracking_source';


  console.log("📢 Script 14 (click_element) cargado.");


  /**
   * 📌 Función para empujar el evento al DataLayer
   */
  function pushClickDataLayer(action, linkText) {
    var tipoCredito = document.querySelector("input[name='rbCredito']:checked")?.value || "credito_individual";
    var isCliente = document.querySelector("input[name='rbCliente']:checked")?.value === "Si" ? "cliente" : "no_cliente";


    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'click_element',
      'CDAction': action,
      'CDCategory': tipoCredito,
      'CDFunnel': isCliente,
      'CDLabel': tipoCredito === "credito_individual" ? "Crédito crece y mejora" : "NA",
      'link_text': linkText
    });


    console.log(`✅ DataLayer Push: click_element (${action})`, {
      CDAction: action,
      CDCategory: tipoCredito,
      CDFunnel: isCliente,
      CDLabel: tipoCredito === "credito_individual" ? "Crédito crece y mejora" : "NA",
      link_text: linkText
    });
  }


  /**
   * 📌 Detectar clic en "Ir al blog"
   */
  document.querySelector(".finance-btn.primary-btn")?.addEventListener("click", function () {
    pushClickDataLayer("Clic Ir a blog", "Ir a blog");
  });


  /**
   * 📌 Detectar clic en "Sitio oficial"
   */
  document.querySelector(".finance-btn.secondary-btn")?.addEventListener("click", function () {
    pushClickDataLayer("Clic Sitio oficial", "Sitio oficial");
  });
});




/*
  ----------------------------------------------------------------------
  Script 15 - click_element (Descarga de App)
  Descripción:
    - Se ejecuta cuando el usuario hace clic en los botones:
      "Google Play", "AppGallery" o "App Store" para descargar la app.
    - Captura el tipo de crédito elegido y si el usuario es cliente.
    - Envía el evento "click_element" al dataLayer.
  ----------------------------------------------------------------------
*/


document.addEventListener("DOMContentLoaded", function () {
  var ssSource = window.ssSource || 'default_tracking_source';


  console.log("📢 Script 15 (click_element - Descarga de App) cargado.");


  /**
   * 📌 Función para empujar el evento al DataLayer
   */
  function pushDownloadDataLayer(action, linkText) {
    var tipoCredito = document.querySelector("input[name='rbCredito']:checked")?.value || "credito_individual";
    var isCliente = document.querySelector("input[name='rbCliente']:checked")?.value === "Si" ? "cliente" : "no_cliente";


    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'click_element',
      'CDAction': action,
      'CDCategory': tipoCredito,
      'CDFunnel': isCliente,
      'CDLabel': "Cuenta A Mi Favor",
      'link_text': linkText
    });


    console.log(`✅ DataLayer Push: click_element (${action})`, {
      CDAction: action,
      CDCategory: tipoCredito,
      CDFunnel: isCliente,
      CDLabel: "Cuenta A Mi Favor",
      link_text: linkText
    });
  }


  /**
   * 📌 Detectar clic en "Google Play"
   */
  document.querySelector("a[href*='play.google.com']")?.addEventListener("click", function () {
    pushDownloadDataLayer("Clic Descarga App", "Google Play");
  });


  /**
   * 📌 Detectar clic en "AppGallery (Huawei)"
   */
  document.querySelector("a[href*='appgallery.huawei.com']")?.addEventListener("click", function () {
    pushDownloadDataLayer("Clic Descarga App", "AppGallery");
  });


  /**
   * 📌 Detectar clic en "App Store (Apple)"
   */
  document.querySelector("a[href*='apps.apple.com']")?.addEventListener("click", function () {
    pushDownloadDataLayer("Clic Descarga App", "App Store");
  });
});











