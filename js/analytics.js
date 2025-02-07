if (!sessionStorage.getItem('gtm_source')) {
     sessionStorage.setItem('gtm_source', 'default_tracking_source'); 
 }
 
 // 🔹 Define `ssSource` a nivel global
 window.ssSource = sessionStorage.getItem('gtm_source') || 'default_source';
 console.log("✅ ssSource definido en analytics.js:", window.ssSource);
 
 
 // Verificamos si ya existe un valor en sessionStorage para gtm_source
 if (!sessionStorage.getItem('gtm_source')) {
     sessionStorage.setItem('gtm_source', 'default_tracking_source'); 
 }
 
 // Definimos ssSource de manera global
 window.ssSource = sessionStorage.getItem('gtm_source') || 'default_tracking_source';
 
 // Agregamos un log para verificar su valor
 console.log("✅ ssSource definido en analytics.js:", window.ssSource);
 
 window.addEventListener('DOMContentLoaded', function () {
     // Se usa la variable global window.ssSource
     let ssSource = window.ssSource;
 
     /* Landing page - Si se arma */ 
     const stringSiSeArma = sessionStorage.getItem('step-1');
     if (stringSiSeArma != null && stringSiSeArma != '') {
         const objectSiSeArma = JSON.parse(stringSiSeArma);
         const SSArmaCredito = objectSiSeArma['question-1'];
         const SSArmaMonto = objectSiSeArma['question-2'];
         if (ssSource === 'default_tracking_source') {
             ssSource = `LPInst:${SSArmaCredito}-Monto:${SSArmaMonto}`;
         } else {
             ssSource = `${ssSource}|LPInst:${SSArmaCredito}-Monto:${SSArmaMonto}`;
         }
     }
     /* End Landing page - Si se arma */
 
     // Guardamos ssSource actualizado en window.ssSource para que otros scripts lo usen
     window.ssSource = ssSource;
 
     console.log("📢 ssSource después de Landing Page:", window.ssSource);
 
     /*  formSolicitaCredito(posición,nombre del campo, query js, obligatorio o opcional, ¿Es radio?)  */
     formSolicitaCredito(1, '¿Tienes un crédito activo con Compartamos Banco?', "#DrbCSi, #DrbCNo", 'obligatorio', true);
     formSolicitaCredito(2, '¿Tienes un negocio?', "#DrbSi, #DrbNo", 'obligatorio', true);
     formSolicitaCredito(3, '¿Tu negocio tiene más de 6 meses?', "#DrtimeSi, #DrtimeNo", 'obligatorio', true);
     formSolicitaCredito(4, 'Teléfono: Tipo', "#telefonoSelect", 'obligatorio');
     formSolicitaCredito(5, 'Teléfono: Número', "#txbNumeroTel", 'obligatorio');
     formSolicitaCredito(6, '¿A qué hora deseas recibir nuestra llamada?', "#horaSelect", 'obligatorio');
     formSolicitaCredito(7, 'Correo electrónico', "#txbCorreoElectronico", 'opcional');
     formSolicitaCredito(8, 'Leí y acepto el Aviso de Privacidad', "#avisoPri", 'obligatorio');
 
     formDatosPersonales(1, 'Nombre(s)', "#txbNombre", 'obligatorio');
     formDatosPersonales(2, 'Primer apellido', '#txbApPaterno', 'obligatorio');
     formDatosPersonales(3, 'Segundo apellido', "#txbApMaterno", 'opcional');
     formDatosPersonales(4, 'Fecha de nacimiento: Día', "#diaSelect", 'obligatorio');
     formDatosPersonales(5, 'Fecha de nacimiento: Mes', "#mesSelect", 'obligatorio');
     formDatosPersonales(6, 'Fecha de nacimiento: Año', "#añoSelect", 'obligatorio');
     formDatosPersonales(7, 'Género', "#rdbF, #rdbM", 'obligatorio', true);
     formDatosPersonales(8, 'Código postal', "#txbCP", 'obligatorio');
 
     var btnRegresar = document.querySelector(".btnRegreso");
     if (btnRegresar != null) {
         btnRegresar.addEventListener('click', function () {
             window.dataLayer = window.dataLayer || [];
             window.dataLayer.push({
                 event: 'click',
                 event_category: 'forms',
                 method: 'clic btnRegreso',
                 detail: 'Regreso Pantalla 1',
             });
         });
     }
 });
 
 
 var clickAll = 0;
 var formStart1 = false;
 var formStart2 = false;
 var fieldId = '-';
 var fieldValue = '-';
 var fieldType = '-';
 var creditoFields = 7;
 var creditoFieldsMandatory = 6;
 //Detecta la interacción de los campos de Solicita tu crédito
 function formSolicitaCredito(position,name,query,mandatory,isRadio = false){
     var clickField = 0;
     fields = document.querySelectorAll(query);
     var fieldOptions = (isRadio) ? fields.length : 0;
     for (let index = 0; index < fields.length; index++) {
         fieldEvent = (fields[index].type == 'select-one') ? 'change' : 'click';
         fields[index].addEventListener(fieldEvent,function(){
             clickField++;
             clickAll++;
             if(isRadio){
                 fieldInput = this.querySelector('input');
                 fieldId = fieldInput.id;
                 fieldValue = fieldInput.value;
                 fieldType = 'radio';
             }
             else{
                 fieldId = this.id;
                 fieldValue = (this.type == 'select-one' || this.type == 'checkbox') ? this.value : 'dato personal';
                 fieldOptions = (this.type == 'select-one') ? this.options.length : this.type;
                 fieldType = this.type;
             }
             
             if(!formStart1){
                 formStart1 = true;
                 window.dataLayer = window.dataLayer || [];
                 window.dataLayer.push({
                     event: "form_start",
                     event_category: "forms",
                     form_name: "prospección - solicita tu crédito",
                     form_id: "formularioProspeccion",
                     form_type: "multistep dinámico",
                     form_fields: creditoFields, // número total de campos del formulario, incluídos los checks de permiso
                     n_form_fields: creditoFieldsMandatory, // número total de campos obligatorios en el formulario
                     field_position: position,
                     field_name: name,
                     field_id: fieldId,
                     field_n_options: fieldOptions, // número de valores posibles o tipo de de dato en caso de campos de escritura
                     field_type: fieldType,
                     field_value: fieldValue,
                     pantalla: "pantalla_1",
                     mandatory_field: mandatory,
                     field_clic_n: clickField,
                     step_number: 1,
                     clic_number: clickAll,
                     form_target: "segmentar",
                     CDSource: ssSource
                 });
             }
 
             if(fieldId === 'rbSi'){
                 creditoFields = 8;
                 creditoFieldsMandatory = 7;
             }
 
             var commonDataFormField = {
                 event:"form_field",
                 event_category: "forms",
                 form_name: 'prospección - solicita tu crédito',
                 form_id: "formularioProspeccion",
                 form_type: "multistep dinámico",
                 form_fields: creditoFields, // número total de campos del formulario, incluídos los checks de permiso
                 n_form_fields: creditoFieldsMandatory, // número total de campos obligatorios en el formulario
                 field_position: position,
                 field_name: name,
                 field_id: fieldId,
                 field_n_options: fieldOptions, // número de valores posibles o tipo de de dato en caso de campos de escritura
                 field_type: fieldType,
                 field_value: fieldValue,
                 pantalla: 'pantalla_1',
                 mandatory_field: mandatory,
                 field_clic_n: clickField, // número de veces que se hace clic sobre ese campo antes de cargar otra página
                 step_number: position, // Número teórico que supondría ese paso a la hora de rellenar el formulario
                 clic_number: clickAll, // número incremental de clics realizados en el formulario antes de enviarlo
                 CDSource: ssSource
             };
 
             // ¿Tienes un crédito activo con Compartamos Banco? = Si, se genera la página virtual
             if(fieldId === 'rbCSi'){
                 window.dataLayer = window.dataLayer || [];
                 commonDataFormField.form_target = 'segmentar';
                 window.dataLayer.push(commonDataFormField);
                 /*
                 window.dataLayer = window.dataLayer || [];
                     window.dataLayer.push({
                     event: "virtual_page_view",
                     event_category: "forms",
                     page_location: "https://www.compartamos.com.mx/prospeccion/ya_cliente",
                     page_referrer: "https://www.compartamos.com.mx/prospeccion/",
                     form_name: "prospección - solicita tu crédito",
                     form_id: "formularioProspeccion",
                     form_type: "multistep dinámico",
                     form_fields: 1,
                     n_form_fields: 1,
                     pantalla: "pantalla_1.1",
                     step_number: 2,
                     clic_number: clickAll,
                     form_target: "segmentar"
                 });
                 */
 
                 /* adobeDataLayer */
                 window.adobeDataLayer.push({
                     event:'virtualPage',
                     pageName: "Prospección - Solicita tu crédito - Es cliente",
                     pageUrl:"https://www.compartamos.com.mx/prospeccion/ya_cliente",
                     referringUrl:"https://www.compartamos.com.mx/prospeccion/",
                     primaryCategory:"Landing page - Prospecccion de clientes",
                     domain:window.location.hostname,
                     subcategoryLink:'-',
                     pageInstanceID:"Prospección de clientes",
                 });
             }
             else{
                 // Push al datalayer
                 window.dataLayer = window.dataLayer || [];
                 window.dataLayer.push(commonDataFormField);
             }
         })
     }     
 }
 
 //Detecta la interacción de los campos de Datos personales
 function formDatosPersonales(position,name,query,mandatory,isRadio = false){
     var clickField = 0;
     fields = document.querySelectorAll(query);
     var fieldOptions = (isRadio) ? fields.length : 0;
     for (let index = 0; index < fields.length; index++) {
         fieldEvent = (isRadio || query == "#txbCP") ? 'click' : 'change';
         fields[index].addEventListener(fieldEvent,function(){
             clickField++;
             clickAll++;
             if(isRadio){
                 fieldInput = this.querySelector('input');
                 fieldId = fieldInput.id;
                 fieldType = 'radio';
             }
             else{
                 fieldId = this.id;
                 fieldOptions = (this.type == 'select-one') ? this.options.length : this.type;
                 fieldType = this.type;
             }
             if(!formStart2){
                 formStart2 = true;
                 window.dataLayer = window.dataLayer || [];
                 window.dataLayer.push({
                     event: "form_start",
                     event_category: "forms",
                     form_name: "prospección - datos personales",
                     form_id: "formularioProspeccion",
                     form_type: "multistep dinámico",
                     form_fields: 8, // número total de campos del formulario, incluídos los checks de permiso
                     n_form_fields: 7, // número total de campos obligatorios en el formulario
                     field_position: position,
                     field_name: name,
                     field_id: fieldId,
                     field_n_options: fieldOptions, // número de valores posibles o tipo de de dato en caso de campos de escritura
                     field_type: fieldType,
                     field_value: 'dato personal',
                     pantalla: "pantalla_2",
                     mandatory_field: mandatory,
                     field_clic_n: clickField,
                     step_number: position,
                     clic_number: clickAll,
                     form_target: "lead",
                     CDSource: ssSource
                 });
             }
 
             window.dataLayer = window.dataLayer || [];
             window.dataLayer.push({
                 event:"form_field",
                 event_category: "forms",
                 form_name: "prospección - datos personales",
                 form_id: "formularioProspeccion",
                 form_type: "multistep dinámico",
                 form_fields: 8, // número total de campos del formulario, incluídos los checks de permiso
                 n_form_fields: 7, // número total de campos obligatorios en el formulario
                 field_position: position,
                 field_name: name,
                 field_id: fieldId,
                 field_n_options: fieldOptions, // número de valores posibles o tipo de de dato en caso de campos de escritura
                 field_type: fieldType,
                 field_value: 'dato personal',
                 pantalla: 'pantalla_2',
                 mandatory_field: mandatory,
                 field_clic_n: clickField, // número de veces que se hace clic sobre ese campo antes de cargar otra página
                 step_number: position, // Número teórico que supondría ese paso a la hora de rellenar el formulario
                 clic_number: clickAll, // número incremental de clics realizados en el formulario antes de enviarlo
                 CDSource: ssSource
             });
         })
     }     
 }
 
 
 var clickSiguiente = 0;
 function siguienteCreditoActivoSi(){
     clickAll++;
     clickSiguiente++;
 
     /* Old DataLayer */
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         'event' : 'eventgtm',
         'eventName' :'Siguiente',
         'category' :'prospeccion',
         'eventLabel': 'si'
     });
     /* End old DataLayer */
 
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         event: "form_submit",
         event_category: "forms",
         form_name: "prospección - solicita tu crédito",
         form_id: "formularioProspeccion",
         form_type: "multistep dinámico",
         form_fields: 1,
         n_form_fields: 1,
         field_position: 1,
         field_name: "botón siguiente pantalla 1.1",
         field_id: "botonGeneralDatosContacto",
         field_type: "botón",
         field_value: "siguiente",
         pantalla: "pantalla_1.1",
         field_clic_n: clickSiguiente,
         step_number: 3,
         clic_number: clickAll,
         form_target: "segmentar",
         submit_result: "OK",
         detail: "envío correcto",
         CDSource: ssSource
     });
     /*
     window.dataLayer = window.dataLayer || [];
         window.dataLayer.push({
         event: "form_confirmation",
         event_category: "forms",
         form_name: "prospección - solicita tu crédito",
         form_id: "formularioProspeccion",
         form_type: "multistep dinámico",
         form_fields: 1,
         n_form_fields: 1,
         element_text: "enviar",
         submit_result: "OK",
         detail: "envío correcto",
         step_number: 4,
         credito_activo: "si",
         negocio: "no aplica",
         duracion_negocio: "no aplica",
         tipo_telefono: "no aplica",
         horario_llamada: "no aplica",
         form_target: "segmentar",
         CDSource: ssSource
     });
     */
     sessionStorage.removeItem('step-1');
     sessionStorage.removeItem('gtm_source');
 }
 
 function siguienteCreditoActivoNo(){
     clickAll++;
     clickSiguiente++;
 
     /* Old DataLayer */
     window.dataLayer.push({
         'event' : 'eventgtm',
         'eventName' :'Siguiente',
         'category' :'prospeccion',
         'eventLabel': 'no'
     });
     /* End old DataLayer */
 
     formSubmitSolicitaCredito("OK","envío correcto");
 
     /*
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         event: "virtual_page_view",
         event_category: "forms",
         page_location: "https://www.compartamos.com.mx/prospeccion/datos_personales",
         page_referrer: "https://www.compartamos.com.mx/prospeccion/",
         form_name: "prospección - datos personales",
         form_id: "formularioProspeccion",
         form_type: "multistep dinámico",
         form_fields: 8,
         n_form_fields: 7,
         pantalla: "pantalla_2",
         step_number: 10,
         clic_number: clickAll
     });
     */
 
     /* adobeDataLayer */
     window.adobeDataLayer.push({
         event:'virtualPage',
         pageName: "Prospección - Datos personales",
         pageUrl:"https://www.compartamos.com.mx/prospeccion/datos_personales",
         referringUrl:"https://www.compartamos.com.mx/prospeccion/",
         primaryCategory:"Landing page - Prospecccion de clientes",
         domain:window.location.hostname,
         subcategoryLink:'-',
         pageInstanceID:"Prospección de clientes",
     });
 
     window.adobeDataLayer.push({
         event:"formulario",
         tipoFormulario: "embudo",
         nombreEmbudo: "solicita credito",
         pasoEmbudo:"1",
         nombreFormulario:"solicita tu credito"
     });
 }
 
 function formSubmitSolicitaCredito(status,error){
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         event: "form_submit",
         event_category: "forms",
         form_name: "prospección - solicita tu crédito",
         form_id: "formularioProspeccion",
         form_type: "multistep dinámico",
         form_fields: creditoFields,
         n_form_fields: creditoFieldsMandatory,
         field_position: 9,
         field_name: "botón siguiente pantalla 1",
         field_id: "botonGeneralDatosContacto",
         field_type: "botón",
         field_value: "siguiente",
         pantalla: "pantalla_1",
         field_clic_n: clickSiguiente,
         step_number: 9,
         clic_number: clickAll,
         form_target: "segmentar",
         submit_result: status,
         detail: error,
         CDSource: ssSource
     });
 }
 
 function formSubmitDatosPersonales(status,error){
     window.dataLayer = window.dataLayer || [];
         window.dataLayer.push({
         event: "form_submit",
         event_category: "forms",
         form_name: "prospección - datos personales",
         form_id: "formularioProspeccion",
         form_type: "multistep dinámico",
         form_fields: 9,
         n_form_fields: 8,
         field_position: 9,
         field_name: "Enviar",
         field_id: "botonGeneralDatosPersonales",
         field_type: "botón",
         field_value: "Enviar",
         pantalla: "pantalla_2",
         field_clic_n: 1,
         step_number: 9,
         clic_number: clickAll,
         form_target: "Lead",
         submit_result: status,
         detail: error,
         CDSource: ssSource
     });
 }
 
 function generateLead(dlFolioId){
     let tipoTel = document.getElementById('telefonoSelect');
     let hora = document.getElementById('horaSelect');
     let duracionNegocio = localStorage.getItem("antiguedad");
 /* 	
           if (document.getElementById('rbTimeCDSi').checked){
                duracionNegocio = 'Si';
           } else if (document.getElementById('rbTimeCDNo').checked) {
                duracionNegocio = 'No';
           }
      }else
         duracionNegocio = 'No aplica';
 
  */
     let tmNegocio =  (document.getElementById('rbSi').checked) ? 'Si' : 'No';
 
     /* Identificar si el registro es real o una prueba. */
     let leadType = 'Registro exitoso - OK', leadName = '';
     if(document.getElementById('txbNombre') != null){
         let tmNameVal = document.getElementById('txbNombre').value;
         if((tmNameVal.toLowerCase().includes('prueba') || tmNameVal.toLowerCase().includes('test'))){
             leadType = 'Registro exitoso - TEST';
             leadName = tmNameVal;
         }
     }
 
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         event: "form_complete",
         event_category: "forms",
         CDAction:leadType,
         CDValue:leadName,
         form_name: "prospección",
         form_id: "formularioProspeccion",
         lead_id: dlFolioId,
         form_fields: 16,
         n_form_fields: 14,
         element_text: "enviar",
         submit_result: "OK",
         detail: "Sin error",
         credito_activo:"No",
         negocio: tmNegocio,
         duracion_negocio: duracionNegocio,
         tipo_telefono: tipoTel.options[tipoTel.selectedIndex].text,
         horario_llamada: hora.options[hora.selectedIndex].text,
         CDSource: ssSource
     });
 
     /* adobeDataLayer */
     window.adobeDataLayer.push({
         event:'formulario',
         CDAction:leadType,
         CDValue:leadName,
         tipoFormulario: 'embudo',
         nombreEmbudo: 'datos personales',
         pasoEmbudo:'2',
         nombreFormulario:'solicita tu credito'
     });
 
     sessionStorage.removeItem('step-1');
     sessionStorage.removeItem('gtm_source');
 }
 
 if (ssSource === '') {
     ssSource = 'default_source';
 }