let ssSource = '';
let productoSeleccionado;
window.addEventListener('DOMContentLoaded', function () {
  nombre_cliente = this.localStorage.getItem("CompartamosNombre");
  $('#gracias_cliente').text('¡Gracias ' + nombre_cliente + '!');

  const gtmSource = sessionStorage.getItem('gtm_source');
  ssSource = (gtmSource != null && gtmSource != '') ? gtmSource : '';

  /* Landing page - Si se arma */ 
  const stringSiSeArma = sessionStorage.getItem('step-1');
  if (stringSiSeArma != null && stringSiSeArma != '') {
      const objectSiSeArma = JSON.parse(stringSiSeArma);
      const SSArmaCredito = objectSiSeArma['question-1'];
      const SSArmaMonto = objectSiSeArma['question-2'];
      if (ssSource === '') {
          ssSource = `LPInst:${SSArmaCredito}-Monto:${SSArmaMonto}`;
      } else {
          ssSource = `${ssSource}|LPInst:${SSArmaCredito}-Monto:${SSArmaMonto}`;
      }
  }
  /* End Landing page - Si se arma */
  
 });
/**
 * 📌 form_start - Primer data layers
 *
 * 🔹 Descripción:  
 * Se activa cuando el usuario llega al formulario de registro y comienza a interactuar.
 *
 * 🔹 Evento relacionado:
 * - `form_start`
 */
function pushDataLayer(eventName, additionalData = {}, category = 'NA') {
  window.dataLayer = window.dataLayer || [];
  let data = {
      'event': eventName,
      'CDCategory': category,
      'CDFunnel': document.querySelector("input[name='rbCliente']:checked")?.value === "Si" ? 'cliente' : 'no_cliente',
      'CDSource': ssSource,
      ...additionalData
  };
  window.dataLayer.push(data);
  //console.log(`✅ DataLayer Push: ${eventName}`, data);
}

document.addEventListener("DOMContentLoaded", function () {
  let formStartTriggered = false;
  let clientFormStartTriggered = false; // ✅ Ahora está correctamente definido una sola vez

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
          //console.error("❌ No se encontró la sección q3_2.");
          return;
      }


      //console.log("📢 Sección q3_2 detectada, añadiendo eventos.");


      function triggerClientFormStart() {
          if (!clientFormStartTriggered && typeof pushDataLayer === "function") { // ✅ Validamos que la función existe
              setTimeout(() => {
                  if(document.getElementsByName("answer_question_2_1")[0].value == '')
                  {
                    pushDataLayer("form_start", {
                        'pantalla': 'pantalla_2-90%'
                    });
                    //console.log("✅ DataLayer Push: form_start (pantalla_2-90%)");
                  }
                  else
                  {
                    window.dataLayer.push({
                        'event': 'form_start',
                        'CDCategory': document.getElementsByName("answer_question_2_1")[0].value,
                        'CDFunnel': 'cliente',
                        'CDSource': ssSource,
                        'pantalla': 'pantalla_4-90%',
                        'CDLabel': document.getElementsByName("answer_question_4_1")[0].value
                    });
                    //console.log(`✅ DataLayer Push: form_start (${document.getElementsByName("answer_question_2_1")[0].value})`);
                  }
                  clientFormStartTriggered = true;
              }, 50); // ✅ Pequeño retraso para evitar lag
          }
      }


      // ✅ Evento para detectar el primer clic dentro de la sección
      clientInfoSection.addEventListener("click", triggerClientFormStart, { once: true });
  }


  // 📌 Llamamos a las funciones después de que el DOM esté completamente cargado
  handleFormStart();
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
    if(document.getElementsByName("answer_question_2_1")[0].value == '')
    {
      let field = event.target;
      let fieldName = fieldMapping[field.id];
      let category = document.getElementsByName("answer_question_2_1")[0].value;

      if (fieldName && !field.dataset.tracked) { // Evita duplicados
          window.dataLayer.push({
              'event': 'form_field',
              'CDCategory': category == '' ? 'NA' : category,
              'CDFunnel': 'no_cliente',
              'CDSource': window.ssSource || '',
              'pantalla': 'pantalla_2-80%',
              'field_name': fieldName
          });

          //console.log(`✅ DataLayer Push: form_field -> ${fieldName}`);
          field.dataset.tracked = "true"; // Marca el campo como rastreado
      }
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


  //console.log("📢 Eventos de seguimiento asignados a los campos de q3_2.");
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

  // 2. Función para disparar el Data Layer para "Sí, ya tengo uno" (Script 13)
  function pushGenerateLeadCliente() {
    let leadType = 'Registro exitoso - OK', leadName = '';
    if(document.getElementById('txbNombre') != null){
      let tmNameValue = document.getElementById('txbNombre').value;
      if((tmNameValue.toLowerCase().includes('prueba') || tmNameValue.toLowerCase().includes('test'))){
        leadType = 'Test exitoso - prueba';
        leadName = tmNameValue;
      }
    }
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'generate_lead_cliente',
      'CDCategory': document.getElementsByName("answer_question_2_1")[0].value,
      'CDFunnel': 'cliente',
      'CDSource': ssSource,
      'CDAction': leadType,
      'pantalla': 'pantalla_2',
      'CDValue': leadName,
      'CDLabel': document.getElementsByName("answer_question_4_1")[0].value,
      'lead_id': localStorage.getItem('lead_id'),
      'submit_result': 'OK',
      'detail': 'sin error'
    });
    //console.log("DataLayer Push: generate_lead_cliente (Clientes) disparado.");
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
    let category = document.getElementsByName("answer_question_2_1")[0].value;


    if (!fechaValida || !horarioValido || !aviso) {
        const validations = [
          { value: fechaValida, message: "Fecha invalida." },
          { value: horarioValido, message: "Horario invalido." },
          { value: aviso, message: "Aviso no seleccionado." }
      ];
      return;
    }


    var formData = {
      negocio: document.querySelector("input[name='rbNegocio']:checked")?.value || "no",
      duracion_negocio: document.querySelector("#q3_1 input[name='rbNegocio']:checked")?.value === "Si" ? "6 meses" : "menos de 6 meses",
      tipo_telefono: document.getElementById("telefonoSelect")?.value || "no_definido",
      horario_llamada: document.getElementById("horaSelect")?.value || "no_definido",
      lead_id: localStorage.getItem('lead_id')
    };

    let leadType = 'Registro exitoso - OK', leadName = '';
    if(document.getElementById('txbNombre') != null){
      let tmNameValue = document.getElementById('txbNombre').value;
      if((tmNameValue.toLowerCase().includes('prueba') || tmNameValue.toLowerCase().includes('test'))){
        leadType = 'Test exitoso - prueba';
        leadName = tmNameValue;
      }
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'generate_lead',
      'CDCategory': 'NA',
      'CDFunnel': 'no_cliente',
      'CDSource': ssSource,
      'CDAction': leadType,
      'pantalla': 'pantalla_2',
      'CDValue': leadName,
      'negocio': formData.negocio,
      'duracion_negocio': formData.duracion_negocio,
      'tipo_telefono': formData.tipo_telefono,
      'horario_llamada': formData.horario_llamada,
      'lead_id': formData.lead_id,
      'submit_result': 'OK',
      'detail': 'sin error'
    });
    //console.log("DataLayer Push: generate_lead (No Cliente) disparado.");
  }
  // 4. Función unificada que decide qué Data Layer disparar según la selección
  function pushUnifiedDataLayer() {
    const select = document.getElementById("horaSelect");
    if (select.value  != "0") {
      pushGenerateLead();
    } else {
      pushGenerateLeadCliente(); 
    }  
  }

function clickSenderDatakayer()
{
    const select = document.getElementById("txbNombre");
    if (select.value  != ""){
      pushUnifiedDataLayer();
    } 
}


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

  //console.log("📢 Script 14 (click_element) cargado.");


  /**
   * 📌 Función para empujar el evento al DataLayer
   */
  function pushClickDataLayer(action, linkText) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'click_element',
      'CDAction': action,
      'CDCategory': localStorage.getItem('tipoCredito'),
      'CDFunnel': (localStorage.getItem('cliente') == 'Si') ? 'Cliente' : 'No cliente',
      'CDLabel': localStorage.getItem('productoAdicional'),
      'link_text': linkText
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


  /**
   * 📌 Función para empujar el evento al DataLayer
   */
  function pushDownloadDataLayer(action, linkText) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'click_element',
      'CDAction': action,
      'CDCategory': localStorage.getItem('tipoCredito'),
      'CDFunnel': (localStorage.getItem('cliente') == 'Si') ? 'Cliente' : 'No cliente',
      'CDLabel': localStorage.getItem('productoAdicional'),
      'link_text': linkText
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