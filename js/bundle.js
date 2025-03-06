
document.addEventListener("DOMContentLoaded", function () {
     const titleElement = document.querySelector(".home__title"); // Selecciona el <h1>
     const sectionQ3_2 = document.getElementById("q3_2"); // Sección q3_2
     const paragraphQ3_2 = sectionQ3_2?.querySelector("p.question.c-center"); // <p> en q3_2
     const spanQ3_2 = sectionQ3_2?.querySelector("span.p-title.text-mobiel-form"); // <span> en q3_2

     // Radio buttons
     const radioNo = document.getElementById("rbCNo"); // "No, pero quiero uno"
     const radioSi = document.getElementById("rbCSi"); // "Sí, ya tengo uno"

     // Definimos las secciones y sus títulos correspondientes
     const sectionTitles = {
         "q2_1": "Ofertas para clientes",
         "q3_2": "Solicitud crédito adicional",
         "q4_1": "Crédito grupal",
         "q4_2": "Crédito individual"
     };

     function updateTitle() {
         let newTitle = "Tramita tu crédito"; // Título por defecto
         let newSpanText = "Déjanos tus datos para que nuestro agente se contacte contigo y te haga saber la oferta que te tenemos."; // Texto por defecto

         for (let sectionId in sectionTitles) {
             const section = document.getElementById(sectionId);
             if (section && section.offsetParent !== null) {
                 newTitle = sectionTitles[sectionId];
                 break; // Detiene la búsqueda al encontrar la primera sección visible
             }
         }

         // Si estamos en q3_2 y el usuario seleccionó "No, pero quiero uno"
         if (sectionQ3_2 && sectionQ3_2.offsetParent !== null && radioNo?.checked) {
             newTitle = "Tramita tu crédito";
             if (paragraphQ3_2) {
                 paragraphQ3_2.textContent = "Información personal";
             }
         } else if (sectionQ3_2 && sectionQ3_2.offsetParent !== null && radioSi?.checked) {
             if (paragraphQ3_2) {
                 paragraphQ3_2.textContent = "Información cliente"; // Mantener el texto original
             }
         }

         // Si el título es "Solicitud crédito adicional", actualizamos el span
         if (newTitle === "Solicitud crédito adicional" && spanQ3_2) {
             newSpanText = "Déjanos tus datos. Le haremos saber a tu Promotor que estás interesado en este crédito para iniciar el trámite.";
         }

         titleElement.textContent = newTitle;
         if (spanQ3_2) {
             spanQ3_2.textContent = newSpanText;
         }
     }

     // Observer para detectar cambios en el DOM
     const observer = new MutationObserver(updateTitle);
     observer.observe(document.body, { childList: true, subtree: true });

     // Detectar cambios en los radio buttons
     if (radioNo) {
         radioNo.addEventListener("change", updateTitle);
     }
     if (radioSi) {
         radioSi.addEventListener("change", updateTitle);
     }

     updateTitle(); // Verifica el estado inicial
 });

 document.addEventListener("DOMContentLoaded", function () {
     // Solo se ejecuta en resoluciones de escritorio (>=768px)
     if (window.innerWidth < 768) return;

     // Obtener ambas secciones
     const section1 = document.getElementById("q4_1");
     const section2 = document.getElementById("q4_2");

     // Otros elementos a modificar
     const mainElement = document.querySelector(".main");
     const mainContent = document.querySelector(".main__content");
     const carouselCards = document.querySelectorAll("#previous-winners .carousel .card");
     const wrapperElement = document.querySelector(".wrapper");
     const homeTitle = document.querySelector(".home__title");
     const questionElement = document.querySelector(".question");
     const flexColumnElements = document.querySelectorAll(".flex-column");

     // Función que aplica o restaura los estilos
     function updateStyles() {
         // Verificar si alguna de las secciones (q4_1 o q4_2) existe y está visible
         const section1Visible = section1 && window.getComputedStyle(section1).display !== "none";
         const section2Visible = section2 && window.getComputedStyle(section2).display !== "none";

         if (section1Visible || section2Visible) {
             // Se aplica la modificación de estilos, por ejemplo, quitar el fondo de .main
             if (mainElement) {
                 mainElement.style.background = "none";
                 mainElement.style.boxShadow = "none";
                 if (window.innerWidth >= 1024) {
                     mainElement.style.maxWidth = "100%";
                 } else {
                     mainElement.style.width = "100%";
                 }
             }

             // Modificar estilos para .main__content
             if (mainContent) {
                // mainContent.style.width = "50%";  Se removio por que en movil queda a la mitad
             }

             // Modificar estilos para las cards del carrusel
             if (carouselCards.length > 0) {
                 carouselCards.forEach((card) => {
                     card.style.flex = "auto";
                 });
             }

             // Modificar estilos para .wrapper en pantallas grandes
             if (wrapperElement && window.innerWidth >= 1024) {
                 wrapperElement.style.maxWidth = "1240px";
                 wrapperElement.style.display = "flex";
                 wrapperElement.style.justifyContent = "center";
             }

             // Centrar el texto en .home__title y .question para resoluciones >=1024px
             if (homeTitle && window.innerWidth >= 1024) {
                 homeTitle.style.textAlign = "center";
             }
             if (questionElement && window.innerWidth >= 1024) {
                 questionElement.style.textAlign = "center";
             }

             // Modificar estilos para elementos .flex-column
             if (flexColumnElements.length > 0) {
                 flexColumnElements.forEach((element) => {
                     element.style.flexDirection = "column";
                     element.style.textAlign = "center";
                 });
             }

             console.log("Estilos aplicados para q4_1 o q4_2 en escritorio.");
         } else {
             // Restaurar estilos originales

             if (mainElement) {
                 mainElement.style.background = "#fff";
                 mainElement.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.1)";
                 mainElement.style.maxWidth = "";
                 mainElement.style.width = "";
             }

             if (mainContent) {
                 mainContent.style.width = "";
             }

             if (carouselCards.length > 0) {
                 carouselCards.forEach((card) => {
                     card.style.flex = "";
                 });
             }

             if (wrapperElement) {
                 wrapperElement.style.maxWidth = "";
                 wrapperElement.style.display = "";
                 wrapperElement.style.justifyContent = "";
             }

             if (homeTitle) {
                 homeTitle.style.textAlign = "";
             }

             if (questionElement) {
                 questionElement.style.textAlign = "";
             }

             if (flexColumnElements.length > 0) {
                 flexColumnElements.forEach((element) => {
                     element.style.flexDirection = "";
                     element.style.textAlign = "";
                 });
             }

             console.log("Estilos restaurados para escritorio.");
         }
     }

     // Usamos un MutationObserver para detectar cambios en el DOM y actualizar estilos
     const observer = new MutationObserver(updateStyles);
     observer.observe(document.body, { childList: true, subtree: true });
 });


 document.addEventListener("DOMContentLoaded", function () {
     const observer = new MutationObserver(() => {
         aplicarEstilosQ3_2();
     });

     function aplicarEstilosQ3_2() {
         const contenedorFormulario = document.querySelector("#q3_2 .d-flex.flex-column.pt-3");
         const mainContent = document.querySelector("#q3_2 .main");

         if (contenedorFormulario) {
             if (window.innerWidth >= 1024) {
                 // Vista de escritorio
                 contenedorFormulario.style.display = "grid";
                 contenedorFormulario.style.gridTemplateColumns = "1fr 1fr";
                 contenedorFormulario.style.gap = "0px";

                 // Ajustar elementos que ocupan todo el ancho
                 const elementosFullWidth = [
                     "#q3_2 .progress",
                     "#q3_2 .progress__label",
                     "#q3_2 .home__line",
                     "#q3_2 .question",
                     "#q3_2 .contenidoGeneralForm"
                 ];
                 elementosFullWidth.forEach(selector => {
                     document.querySelectorAll(selector).forEach(el => {
                         el.style.gridColumn = "span 2";
                     });
                 });

                 // Ajustar el ancho de .main en % (en escritorio)
                 if (mainContent) {
                     mainContent.style.maxWidth = "40%";
                 }
             } else {
                 // Pantallas pequeñas
                 contenedorFormulario.style.display = "flex";
                 contenedorFormulario.style.flexDirection = "column";

                 // Restaurar a 500px en pantallas pequeñas
                 if (mainContent) {
                     mainContent.style.maxWidth = "500px";
                 }
             }
         }
     }

     // Ejecutar al cargar y al redimensionar la ventana
     aplicarEstilosQ3_2();
     window.addEventListener("resize", aplicarEstilosQ3_2);

     // Observar cambios en el DOM (por si algo se inyecta dinámicamente)
     observer.observe(document.body, { childList: true, subtree: true });
 });

 
  //MARK:  BG color en desktop y mobile 
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
  
    // --- Elementos de los radio buttons ---
    const rbSiContainer = document.getElementById('DrbCSi');
    const rbNoContainer = document.getElementById('DrbCNo');
  
    const rbGrupalContainer = document.getElementById('DrbCGrupal');
    const rbIndividualContainer = document.getElementById('DrbIndividual');
  
    const rbSiNegocioContainer = document.getElementById('DrbSi');
    const rbNoNegocioContainer = document.getElementById('DrbNo');
  
    const rbSiMesesContainer = document.querySelector('#q3_1 #DrbSi');
    const rbNoMesesContainer = document.querySelector('#q3_1 #DrbNo');
  
    // --- Secciones del formulario ---
    const q2_1 = document.getElementById('q2_1');
    const q2_2 = document.getElementById('q2_2');
    const q3_1 = document.getElementById('q3_1');
    const q3_2 = document.getElementById('q3_2');
    const q4_1 = document.getElementById('q4_1');
    const q4_2 = document.getElementById('q4_2'); // Sección para ocultar fondo
  
    // --- Elementos para modificar clases (usados en q3_2) ---
    const mainElement = document.querySelector('.main');
    const mainContent = document.querySelector('.main__content');
    const wrapper = document.querySelector('.wrapper');
    const homeTitle = document.querySelector('.home__title');
  
    // Estilos base para el <body>
    Object.assign(body.style, {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      transition: 'background-image 0.5s ease-in-out'
    });
  
    /**
     * Retorna el nombre de la imagen de fondo según la sección visible
     * y las opciones seleccionadas, adaptando los nombres para desktop o mobile.
     */
    function getCurrentBackground() {
      const isDesktop = window.innerWidth >= 1024;
  
      // PRIORIDAD: Si q4_2 está visible => sin fondo
      if (q4_2 && q4_2.offsetParent !== null) {
        return 'none';
      }
  
      // 1) Si q4_1 está visible => sin fondo (blanco)
      if (q4_1 && q4_1.offsetParent !== null) {
        return 'none';
      }
  
      // 2) Si q3_1 está visible => según "más de 6 meses" o no
      if (q3_1 && q3_1.offsetParent !== null) {
        const rbSiMeses = document.getElementById('rbSiNegocio');
        const rbNoMeses = document.getElementById('rbNoNegocio');
  
        if (rbNoMeses?.checked) {
          return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
        } else if (rbSiMeses?.checked) {
          return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
        }
      }
  
      // 3) Si q3_2 está visible => revisa origen (q2_2 o q3_1) esta parte solo altera a los formularios
      if (q3_2 && q3_2.offsetParent !== null) {
        const rbNo2_2 = document.getElementById('rbNo'); // opción de q2_2
        const rbSiMeses = document.getElementById('rbSiNegocio');
        const rbNoMeses = document.getElementById('rbNoNegocio');
  
        if (rbNo2_2?.checked || rbNoMeses?.checked) {
          if (!isDesktop) {
            // En mobile se asigna fondo con propiedades especiales
            body.style.background = "url(assets/images/BG-rosa-mobile.png) no-repeat center 244px scroll";
            body.style.backgroundSize = "cover";
            return 'BG-rosa-mobile.png';
          } else {
            return 'bg-gris-mangenta.png';
          }
        }
        if (rbSiMeses?.checked) {
          if (!isDesktop) {
            body.style.background = "url(assets/images/BG-rosa-mobile.png) no-repeat center 244px scroll";
            body.style.backgroundSize = "cover";
            return 'BG-rosa-mobile.png';
          } else {
            return 'bg-gris-mangenta.png';
          }
        }
        return isDesktop ? 'BG-amarillo-opacy.png' : 'BG-amarillo-mobile-opacy.png';
      }
  
      // 4) Si q2_2 está visible => "¿Tienes un negocio?"
      if (q2_2 && q2_2.offsetParent !== null) {
        const rbSi2_2 = document.getElementById('rbSi');
        const rbNo2_2 = document.getElementById('rbNo');
  
        if (rbSi2_2?.checked) {
          return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
        } else if (rbNo2_2?.checked) {
          return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
        } else {
          return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
        }
      }
  
      // 5) Si q2_1 está visible => "Crédito grupal/individual"
      if (q2_1 && q2_1.offsetParent !== null) {
        const rbGrupal = document.getElementById('rbGrupalSi');
        const rbIndividual = document.getElementById('rbIndividualNo');
  
        if (rbGrupal?.checked) {
          return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
        } else if (rbIndividual?.checked) {
          return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
        } else {
          return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
        }
      }
  
      // 6) Fuera de las secciones anteriores: se revisan los radios "Sí/No"
      const rbSi = document.getElementById('rbCSi');
      const rbNo = document.getElementById('rbCNo');
  
      if (rbSi?.checked) {
        return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
      } else if (rbNo?.checked) {
        return isDesktop ? 'BG-blue.png' : 'BG-blue-mobile.png';
      }
  
      // 7) Por defecto
      return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
    }
  
    /**
     * Aplica el fondo al <body> según la imagen recibida.
     * Si es 'none', se quita el fondo.
     */
    function changeBackground(image) {
      if (image === 'none') {
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = '#fff';
        return;
      }
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        body.style.backgroundImage = `url('assets/images/${image}')`;
        body.style.backgroundColor = '';
        document.documentElement.style.height = '100%';
        body.style.minHeight = '100vh';
      } else {
        if (image === 'BG-rosa-mobile.png') {
          body.style.background = "url(assets/images/BG-rosa-mobile.png) no-repeat center 244px scroll";
          body.style.backgroundSize = "cover";
        } else {
          body.style.backgroundImage = `url('assets/images/${image}')`;
        }
        body.style.backgroundColor = '';
        document.documentElement.style.height = '';
        body.style.minHeight = '';
      }
    }
  
    // Al cargar la página se aplica el fondo inicial
    changeBackground(getCurrentBackground());
  
    // ----------------------------
    // Eventos para los radio buttons
    // ----------------------------
    if (rbSiContainer && rbNoContainer) {
      rbSiContainer.addEventListener('click', () => {
        document.getElementById('rbCSi').checked = true;
        changeBackground(getCurrentBackground());
      });
  
      rbNoContainer.addEventListener('click', () => {
        document.getElementById('rbCNo').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
  
    if (rbGrupalContainer && rbIndividualContainer) {
      rbGrupalContainer.addEventListener('click', () => {
        document.getElementById('rbGrupalSi').checked = true;
        changeBackground(getCurrentBackground());
      });
  
      rbIndividualContainer.addEventListener('click', () => {
        document.getElementById('rbIndividualNo').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
  
    if (rbSiNegocioContainer) {
      rbSiNegocioContainer.addEventListener('click', () => {
        document.getElementById('rbSi').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
    if (rbNoNegocioContainer) {
      rbNoNegocioContainer.addEventListener('click', () => {
        document.getElementById('rbNo').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
  
    if (rbSiMesesContainer) {
      rbSiMesesContainer.addEventListener('click', () => {
        document.getElementById('rbSiNegocio').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
    if (rbNoMesesContainer) {
      rbNoMesesContainer.addEventListener('click', () => {
        document.getElementById('rbNoNegocio').checked = true;
        changeBackground(getCurrentBackground());
      });
    }
  
    // ----------------------------
    // Eventos de cambio de tamaño y orientación
    // ----------------------------
    window.addEventListener('resize', () => {
      changeBackground(getCurrentBackground());
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        changeBackground(getCurrentBackground());
      }, 100);
    });
  
    // ----------------------------
    // IntersectionObservers para cambiar el fondo según la visibilidad de secciones
    // ----------------------------
    if (q4_1) {
      const observerQ4_1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            changeBackground('none');
          } else {
            changeBackground(getCurrentBackground());
          }
        });
      });
      observerQ4_1.observe(q4_1);
    }
  
    if (q4_2) {
      const observerQ4_2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            changeBackground('none');
          } else {
            changeBackground(getCurrentBackground());
          }
        });
      });
      observerQ4_2.observe(q4_2);
    }
  
    if (q3_2) {
      const observerQ3_2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            mainElement?.classList.add('main-visible-q3_2');
            mainContent?.classList.add('main-content-visible-q3_2');
            wrapper?.classList.add('wrapper-visible-q3_2');
            homeTitle?.classList.add('home-title-visible-q3_2');
          } else {
            mainElement?.classList.remove('main-visible-q3_2');
            mainContent?.classList.remove('main-content-visible-q3_2');
            wrapper?.classList.remove('wrapper-visible-q3_2');
            homeTitle?.classList.remove('home-title-visible-q3_2');
          }
        });
      });
      observerQ3_2.observe(q3_2);
    }
  
    if (q3_1) {
      const observerQ3_1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          changeBackground(getCurrentBackground());
        });
      });
      observerQ3_1.observe(q3_1);
    }
  
    if (q2_2) {
      const observerQ2_2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          changeBackground(getCurrentBackground());
        });
      });
      observerQ2_2.observe(q2_2);
    }
    if (q2_1) {
      const observerQ2_1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          changeBackground(getCurrentBackground());
        });
      });
      observerQ2_1.observe(q2_1);
    }
  });
  
  
  

 document.querySelectorAll('a[href^="#"]').forEach(a => {
     a.addEventListener('click', function (e) {
         e.preventDefault();
         const id = this.getAttribute('href');
         const target = document.getElementById(id);
         if (target) {
             window.scrollTo({
                 top: target.offsetTop,
                 behavior: 'smooth'
             });
         }
     });
 });

 document.addEventListener("DOMContentLoaded", function () {
     const carousels = document.querySelectorAll("[data-carousel]");

     carousels.forEach((carouselSection) => {
         const carousel = carouselSection.querySelector(".carousel");
         const cards = carousel.querySelectorAll(".card");
         const dots = carouselSection.querySelectorAll(".dot");
         const prevButton = carouselSection.querySelector(".carousel-prev");
         const nextButton = carouselSection.querySelector(".carousel-next");

         if (cards.length === 0) return; // Evita errores si no hay cards

         let currentIndex = 0;
         const threshold = 50; // Distancia mínima de swipe para cambiar de slide
         let startX = 0;
         let isDragging = false;

         function getCardWidth() {
             return carousel.scrollWidth / cards.length;
         }

         function updateButtons() {
             if (currentIndex === 0) {
                 prevButton.style.backgroundColor = "#D8D8D8"; // Gris
                 prevButton.style.color = "#333";

                 nextButton.style.backgroundColor = "#CE0058"; // Magenta
                 nextButton.style.color = "white";
             } else if (currentIndex === 1) {
                 prevButton.style.backgroundColor = "#CE0058"; // Magenta
                 prevButton.style.color = "white";

                 nextButton.style.backgroundColor = "#D8D8D8"; // Gris
                 nextButton.style.color = "#333";
             }
         }

         function moveSlide(event, direction) {
             event.preventDefault();
             const cardWidth = getCardWidth();
             currentIndex += direction;

             if (currentIndex < 0) {
                 currentIndex = 0;
             } else if (currentIndex >= cards.length) {
                 currentIndex = cards.length - 1;
             }

             carousel.scrollTo({
                 left: currentIndex * cardWidth,
                 behavior: "smooth"
             });

             updateButtons();
             updateDots();
         }

         function goToSlide(event, index) {
             event.preventDefault();
             currentIndex = index;

             carousel.scrollTo({
                 left: currentIndex * getCardWidth(),
                 behavior: "smooth"
             });

             updateButtons();
             updateDots();
         }

         function updateDots() {
             dots.forEach((dot, index) => {
                 dot.classList.toggle("active", index === currentIndex);
             });
         }

         prevButton.addEventListener("click", (event) => moveSlide(event, -1));
         nextButton.addEventListener("click", (event) => moveSlide(event, 1));

         dots.forEach((dot, index) => {
             dot.addEventListener("click", (event) => goToSlide(event, index));
         });

         // --- SWIPE SUAVE Y PRECISO ---
         carousel.addEventListener("touchstart", (event) => {
             isDragging = true;
             startX = event.touches[0].clientX;
         });

         carousel.addEventListener("touchmove", (event) => {
             if (!isDragging) return;
             event.preventDefault(); // Evita interferencias con el scroll de la página
         });

         carousel.addEventListener("touchend", (event) => {
             if (!isDragging) return;
             isDragging = false;

             const endX = event.changedTouches[0].clientX;
             const diffX = startX - endX;

             if (diffX > threshold) {
                 // Swipe a la izquierda (siguiente slide)
                 moveSlide(event, 1);
             } else if (diffX < -threshold) {
                 // Swipe a la derecha (slide anterior)
                 moveSlide(event, -1);
             }
         });

         // Asegurar que los botones tengan el color correcto al inicio
         updateButtons();
     });
 });


 document.addEventListener("DOMContentLoaded", function () {
     if (window.innerWidth > 768) return; // Solo ejecuta el script en dispositivos móviles

     let btn = document.querySelector(".btnContinuarInicio");
     let targetSection = document.getElementById("q3_2");

     if (!btn || !targetSection) return; // Evita errores si los elementos no existen

     let observer = new IntersectionObserver(
         (entries) => {
             entries.forEach((entry) => {
                 if (entry.isIntersecting) {
                     if (btn.style.position !== "relative") {
                         btn.style.position = "relative";
                     }
                 } else {
                     if (btn.style.position !== "fixed") {
                         btn.style.position = "fixed";
                     }
                 }
             });
         },
         { threshold: 0.2 } // Detectar cuando al menos el 20% de la sección es visible
     );

     observer.observe(targetSection);
 });



//MARK: ROMULARIOS - DESHABILITAR Y HABILITAR CAMPOS
document.addEventListener("DOMContentLoaded", function() {
    // Inyecta estilos para que los campos deshabilitados muestren el texto y placeholder en #5E6A71,
    // y para que las etiquetas de los radios de género deshabilitados tengan el estilo deseado.
    var customStyle = document.createElement("style");
    customStyle.innerHTML = `
      /* Estilos generales para inputs, selects y elementos con .disableForm deshabilitados */
      .campoFormulario input:disabled,
      .select-container select:disabled,
      .disableForm:disabled {
        color: #5E6A71 !important;
        background-color: #D8DADA !important;
      }
      .campoFormulario input:disabled::placeholder,
      .campoFormulario input:disabled::-webkit-input-placeholder,
      .campoFormulario input:disabled:-ms-input-placeholder,
      .select-container select:disabled::placeholder,
      .select-container select:disabled::-webkit-input-placeholder,
      .select-container select:disabled:-ms-input-placeholder,
      .disableForm:disabled::placeholder,
      .disableForm:disabled::-webkit-input-placeholder,
      .disableForm:disabled:-ms-input-placeholder {
        color: #5E6A71 !important;
      }
      /* Estilos específicos para las etiquetas de radios de género cuando el input está deshabilitado */
      .radio-button input.genero:disabled + label.genero {
        background-color: #F3F3F2 !important;
        border: 1px solid #D8DADA !important;
        color: #949C9F !important;
      }
    `;
    document.head.appendChild(customStyle);
  
    // Función de ayuda para habilitar un campo por su ID
    function enableField(id) {
      var field = document.getElementById(id);
      if (field && field.disabled) {
        field.disabled = false;
        field.style.color = "";
      }
    }
  
    // Lista de campos a deshabilitar inicialmente (todos excepto "txbNombre")
    // Incluye los radios de género: rbFemenino y rbMasculino.
    var fields = [
      "txbApPaterno",
      "txbApMaterno",
      "rbFemenino",
      "rbMasculino",
      "diaSelect",
      "mesSelect",
      "anioSelect",
      "telefonoSelect",
      "txbNumeroTel",
      "horaSelect",
      "txbCP",
      "txbCorreoElectronico"
    ];
    
    fields.forEach(function(id) {
      var elem = document.getElementById(id);
      if (elem) {
        elem.disabled = true;
        // Para los radios, si deseas asignarles también estilos inline (además de la regla inyectada)
        if (elem.type === "radio") {
          elem.style.backgroundColor = "#F3F3F2";
          elem.style.color = "#949C9F";
          elem.style.border = "1px solid #D8DADA";
        } else {
          elem.style.color = "#5E6A71";
        }
      }
    });
  
    // --- Cadena de habilitación ---
  
    // Paso 1: "txbNombre" (Nombre(s)) ya está habilitado por defecto.
  
    // Paso 2: Cuando se llena "txbNombre", se habilitan "txbApPaterno" y "txbApMaterno"
    var nombreField = document.getElementById("txbNombre");
    if (nombreField) {
      nombreField.addEventListener("input", function() {
        if (nombreField.value.trim() !== "") {
          enableField("txbApPaterno");
          enableField("txbApMaterno");
        }
      });
    }
  
    // Paso 3: Cuando se llena "txbApPaterno", se habilitan:
    // - Fecha de nacimiento: "diaSelect", "mesSelect" y "anioSelect"
    // - Teléfono: "telefonoSelect" y "txbNumeroTel"
    // - Grupo de radios (Género): "rbFemenino" y "rbMasculino"
    var apPaternoField = document.getElementById("txbApPaterno");
    if (apPaternoField) {
      apPaternoField.addEventListener("input", function() {
        if (apPaternoField.value.trim() !== "") {
          enableField("diaSelect");
          enableField("mesSelect");
          enableField("anioSelect");
          enableField("telefonoSelect");
          enableField("txbNumeroTel");
          enableField("rbFemenino");
          enableField("rbMasculino");
        }
      });
    }
  
    // Paso 4: Cuando se llena el campo Teléfono ("txbNumeroTel"),
    // se habilitan "horaSelect" (¿A qué hora te hablamos?) y "txbCP" (Código postal)
    var telField = document.getElementById("txbNumeroTel");
    if (telField) {
      telField.addEventListener("input", function() {
        if (telField.value.trim() !== "") {
          enableField("horaSelect");
          enableField("txbCP");
        }
      });
    }
  
    // Paso 5: Cuando se llena el campo Código postal ("txbCP"),
    // se habilita "txbCorreoElectronico" (Correo electrónico, opcional)
    var cpField = document.getElementById("txbCP");
    if (cpField) {
      cpField.addEventListener("input", function() {
        if (cpField.value.trim() !== "") {
          enableField("txbCorreoElectronico");
        }
      });
    }
  });
 

//MARK: funcion para boton de regresar

document.addEventListener("DOMContentLoaded", function(){
    // Selecciona el botón "arrow_back" (se asume que es el segundo <a> dentro de .header-back-icons)
    var backButton = document.querySelector('.header-back-icons a:nth-child(2)');
    
    function updateBackButton() {
        // Recorre todas las secciones para encontrar la visible
        var sections = document.querySelectorAll('.question__content');
        var visibleSection = null;
        sections.forEach(function(section) {
            var style = window.getComputedStyle(section);
            if (style.display !== "none") {
                visibleSection = section;
            }
        });
        // Si la sección visible es la de id "q1", oculta el botón; de lo contrario, lo muestra.
        if (visibleSection && visibleSection.id === "q1") {
            backButton.style.display = "none";
        } else {
            backButton.style.display = "block";
        }
    }
    
    updateBackButton();
    setInterval(updateBackButton, 300);
});
        

        

        

        



        


 
        

        
