(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
  
  document.addEventListener("DOMContentLoaded", function () {
      function isElementVisible(el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      }
  
      let CDSource = (typeof window.ssSource !== 'undefined' && window.ssSource !== null && window.ssSource !== '') 
          ? window.ssSource 
          : 'default_tracking_source';
      console.log("📢 Valor de CDSource:", CDSource);
  
      window.dataLayer = window.dataLayer || [];
  
      const questionContainer = document.getElementById("q1");
      if (questionContainer) {
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      let CDFunnel = 'no_cliente';
                      const radioSi = document.querySelector("input[name='rbCliente']:checked");
                      if (radioSi && radioSi.value === "Si") {
                          CDFunnel = 'cliente';
                      }
                      window.dataLayer.push({
                          'event': 'custom_form_start',
                          'CDCategory': 'NA',
                          'CDFunnel': CDFunnel,
                          'CDSource': CDSource,
                          'pantalla': 'pantalla_1-0%'
                      });
                      console.log("✅ DataLayer Push: custom_form_start", window.dataLayer);
                      observer.disconnect();
                  }
              });
          }, { threshold: 0.5 });
          observer.observe(questionContainer);
      }
  
      document.querySelectorAll("input[name='rbCliente']").forEach(input => {
          input.addEventListener("change", function() {
              let CDFunnel = this.value === "Si" ? "cliente" : "no_cliente";
              let fieldValue = this.value;
              let CDCategory = this.value === "Si" ? "credito_individual" : "NA";
              window.dataLayer.push({
                  'event': 'form_field',
                  'CDCategory': CDCategory,  
                  'CDFunnel': CDFunnel,
                  'CDSource': CDSource,
                  'pantalla': 'pantalla_1-0%',
                  'field_name': '01. ¿Tienes un crédito activo con Compartamos Banco?',
                  'field_value': fieldValue
              });
              console.log("✅ DataLayer Push: form_field", window.dataLayer);
          });
      });
  
      document.querySelectorAll("input[name='rbCredito']").forEach(input => {
          input.addEventListener("change", function() {
              let fieldValue = this.value;
              let CDCategory = fieldValue === "Individual" ? "credito_individual" : "credito_grupal";
              let formattedFieldValue = fieldValue === "Individual" ? "Crédito Individual" : "Crédito Grupal";
              window.dataLayer.push({
                  'event': 'form_field_steps',
                  'CDCategory': CDCategory,  
                  'CDFunnel': 'cliente',
                  'CDSource': CDSource,
                  'pantalla': 'pantalla_1-30%',
                  'field_name': '02. ¿Qué tipo de crédito tienes?',
                  'field_value': formattedFieldValue
              });
              console.log("✅ DataLayer Push: form_field_steps (tipo de crédito)", window.dataLayer);
          });
      });
  
      document.querySelectorAll(".card").forEach(card => {
          card.addEventListener("click", function() {
              let fieldValue = this.querySelector(".card_footer-name").innerText;
              window.dataLayer.push({
                  'event': 'form_field_steps',
                  'CDCategory': 'credito_grupal',  
                  'CDFunnel': 'cliente',
                  'CDSource': CDSource,
                  'pantalla': 'pantalla_1-60%',
                  'field_name': '03. Producto seleccionado',
                  'field_value': fieldValue
              });
              console.log("✅ DataLayer Push: form_field_steps (producto seleccionado)", window.dataLayer);
          });
      });
  
      document.querySelectorAll(".finance-btn, .store-buttons a").forEach(button => {
          button.addEventListener("click", function() {
              let linkText = this.innerText.trim();
              window.dataLayer.push({
                  'event': 'click_element',
                  'CDAction': 'Clic ' + linkText,
                  'CDCategory': 'credito_individual',
                  'CDFunnel': 'cliente',
                  'CDLabel': 'Crédito crece y mejora',
                  'link_text': linkText
              });
              console.log("✅ DataLayer Push: click_element (" + linkText + ")", window.dataLayer);
          });
      });

      document.querySelectorAll(".finance-btn, .store-buttons a").forEach(button => {
        button.addEventListener("click", function() {
            // Obtener el texto alternativo de la imagen
            const img = this.querySelector('img');
            let linkText = img ? img.getAttribute('alt') : 'Sin texto';
            
            // Opcional: Limpiar el texto si es necesario (ej: quitar "Disponible en")
            linkText = linkText.replace('Disponible en ', '')
                               .replace('Consíguelo en el ', '')
                               .replace('Explóralo en ', '');
    
            window.dataLayer.push({
                'event': 'click_element',
                'CDAction': 'Clic ' + linkText,
                'CDCategory': 'credito_individual',
                'CDFunnel': 'cliente',
                'CDLabel': 'Crédito crece y mejora',
                'link_text': linkText
            });
        });
    });
  
      const registrationForm = document.getElementById("q3_2");
      if (registrationForm) {
          registrationForm.addEventListener("focusin", function() {
              window.dataLayer.push({
                  'event': 'form_start',
                  'CDCategory': 'credito_individual',  
                  'CDFunnel': 'cliente',
                  'CDSource': CDSource,
                  'pantalla': 'pantalla_4-90%',
                  'CDLabel': 'Crédito crece y mejora'
              });
              console.log("✅ DataLayer Push: form_start (registro pantalla_4-90%)", window.dataLayer);
          });
      }
  });
  