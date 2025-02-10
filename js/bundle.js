
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
                 mainContent.style.width = "50%";
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

 document.addEventListener('DOMContentLoaded', () => {
     const body = document.body;

     // --- Radio Buttons "Sí/No" (anteriores) ---
     const rbSiContainer = document.getElementById('DrbCSi');
     const rbNoContainer = document.getElementById('DrbCNo');

     // --- Radio Buttons "Crédito grupal" / "Crédito individual" (#q2_1) ---
     const rbGrupalContainer = document.getElementById('DrbCGrupal');
     const rbIndividualContainer = document.getElementById('DrbIndividual');

     // --- Radio Buttons para "¿Tienes un negocio?" (#q2_2) ---
     const rbSiNegocioContainer = document.getElementById('DrbSi');
     const rbNoNegocioContainer = document.getElementById('DrbNo');

     // --- Radio Buttons para "¿Tu negocio tiene más de 6 meses?" (#q3_1) ---
     const rbSiMesesContainer = document.querySelector('#q3_1 #DrbSi');
     const rbNoMesesContainer = document.querySelector('#q3_1 #DrbNo');

     // Secciones
     const q2_1 = document.getElementById('q2_1');
     const q2_2 = document.getElementById('q2_2');
     const q3_1 = document.getElementById('q3_1');
     const q3_2 = document.getElementById('q3_2');
     const q4_1 = document.getElementById('q4_1');
     // Sección que se desea que no muestre fondo
     const q4_2 = document.getElementById('q4_2');

     // Elementos para modificar clases (usados en q3_2)
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
      * Retorna el nombre de la imagen de fondo correspondiente
      * según la sección visible y los radios seleccionados.
      * Se ha agregado la condición para q4_2 como prioridad.
      */
     function getCurrentBackground() {
        // PRIORIDAD: Si q4_2 (Crédito Individual) está visible, no se muestra ningún fondo.
        if (q4_2 && q4_2.offsetParent !== null) {
            return 'none';
        }
    
        // 1) Si q4_1 está visible => fondo 'none' (blanco)
        if (q4_1 && q4_1.offsetParent !== null) {
            return 'none';
        }
    
        // 2) Si q3_1 está visible => gris si "Sí, más de 6 meses", morado si "No, menos de 6 meses"
        if (q3_1 && q3_1.offsetParent !== null) {
            const rbSiMeses = document.getElementById('rbSiNegocio'); // "Sí, tiene más de 6 meses"
            const rbNoMeses = document.getElementById('rbNoNegocio'); // "No, tiene menos de 6 meses"
    
            if (rbNoMeses?.checked) {
                return 'BG-morado.png'; // Si elige "No, tiene menos de 6 meses"
            } else if (rbSiMeses?.checked) {
                return 'BG-gris.png'; // Si elige "Sí, tiene más de 6 meses"
            }
        }
    
        // 3) Si q3_2 está visible, verificamos el origen (q2_2 o q3_1)
        if (q3_2 && q3_2.offsetParent !== null) {
            const rbNo2_2 = document.getElementById('rbNo'); // "No, tengo" de q2_2
            const rbSiMeses = document.getElementById('rbSiNegocio'); // "Sí, tiene más de 6 meses" de q3_1
            const rbNoMeses = document.getElementById('rbNoNegocio'); // "No, tiene menos de 6 meses" de q3_1
    
            if (rbNo2_2?.checked || rbNoMeses?.checked) {
                return 'BG-morado.png'; // Si viene de "No, tengo" o "No, tiene menos de 6 meses"
            }
            if (rbSiMeses?.checked) {
                return 'BG-gris.png'; // Si viene de "Sí, más de 6 meses"
            }
    
            return 'BG-amarillo.png'; // Si no, fondo amarillo por defecto
        }
    
        // 4) Si q2_2 está visible => checamos radio "Sí, tengo" / "No, tengo"
        if (q2_2 && q2_2.offsetParent !== null) {
            const rbSi2_2 = document.getElementById('rbSi');
            const rbNo2_2 = document.getElementById('rbNo');
    
            if (rbSi2_2?.checked) {
                return 'BG-gris.png';
            } else if (rbNo2_2?.checked) {
                return 'BG-morado.png';
            } else {
                return 'BG-amarillo.png';
            }
        }
    
        // 5) Si q2_1 está visible => "Crédito grupal/individual"
        if (q2_1 && q2_1.offsetParent !== null) {
            const rbGrupal = document.getElementById('rbGrupalSi');
            const rbIndividual = document.getElementById('rbIndividualNo');
    
            if (rbGrupal?.checked) {
                return 'BG-morado.png';
            } else if (rbIndividual?.checked) {
                return 'BG-gris.png';
            } else {
                return 'BG-amarillo.png';
            }
        }
    
        // 6) Fuera de las secciones anteriores, se revisan los radios "Sí/No"
        const rbSi = document.getElementById('rbCSi');
        const rbNo = document.getElementById('rbCNo');
    
        if (rbSi?.checked) {
            return 'BG-morado.png';
        } else if (rbNo?.checked) {
            return 'BG-blue.png';
        }
    
        // 7) Por defecto
        return 'BG-amarillo.png';
    }
    

     /**
      * Aplica el fondo al <body> según la imagen (o 'none').
      * En pantallas >=1024 se aplica la imagen, en menores se omite.
      */
     function changeBackground(image) {
         if (image === 'none') {
             body.style.backgroundImage = 'none';
             body.style.backgroundColor = '#fff';
             return;
         }
         if (window.innerWidth >= 1024) {
             body.style.backgroundImage = `url('assets/images/${image}')`;
             body.style.backgroundColor = '';
             document.documentElement.style.height = '100%';
             body.style.minHeight = '100vh';
         } else {
             body.style.backgroundImage = '';
             body.style.backgroundColor = '';
             document.documentElement.style.height = '';
             body.style.minHeight = '';
         }
     }

     // Al cargar la página, se aplica el fondo inicial
     changeBackground(getCurrentBackground());

     // ---------------------------------------------------
     // 1. Eventos de clic para "Sí/No" (anteriores)
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 2. Eventos de clic para "Crédito grupal/individual" (#q2_1)
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 3. Eventos de clic para #q2_2 => "Sí, tengo" / "No, tengo"
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 4. Eventos de clic para #q3_1 => "Sí, más de 6 meses" / "No, menos de 6 meses"
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 5. Al cambiar tamaño de ventana u orientación
     // ---------------------------------------------------
     window.addEventListener('resize', () => {
         changeBackground(getCurrentBackground());
     });
     window.addEventListener('orientationchange', () => {
         setTimeout(() => {
             changeBackground(getCurrentBackground());
         }, 100);
     });

     // ---------------------------------------------------
     // 6. IntersectionObserver para q4_1 => fondo 'none' si está visible
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 7. IntersectionObserver para q4_2 => cuando esta sección esté visible, se oculta el fondo
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 8. IntersectionObserver para q3_2 => modifica clases en elementos
     // ---------------------------------------------------
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

     // ---------------------------------------------------
     // 9. IntersectionObserver para q3_1 => recalcula fondo al cambiar de visibilidad
     // ---------------------------------------------------
     if (q3_1) {
         const observerQ3_1 = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 changeBackground(getCurrentBackground());
             });
         });
         observerQ3_1.observe(q3_1);
     }

     // ---------------------------------------------------
     // 10. IntersectionObservers opcionales para q2_2 y q2_1
     // ---------------------------------------------------
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

 document.addEventListener('DOMContentLoaded', () => {
    // Ejecuta este script solo si el dispositivo es mobile
    if (window.innerWidth >= 1024) return;

    const body = document.body;

    // --- Radio Buttons "Sí/No" (anteriores) ---
    const rbSiContainer = document.getElementById('DrbCSi');
    const rbNoContainer = document.getElementById('DrbCNo');

    // --- Radio Buttons "Crédito grupal" / "Crédito individual" (#q2_1) ---
    const rbGrupalContainer = document.getElementById('DrbCGrupal');
    const rbIndividualContainer = document.getElementById('DrbIndividual');

    // --- Radio Buttons para "¿Tienes un negocio?" (#q2_2) ---
    const rbSiNegocioContainer = document.getElementById('DrbSi');
    const rbNoNegocioContainer = document.getElementById('DrbNo');

    // --- Radio Buttons para "¿Tu negocio tiene más de 6 meses?" (#q3_1) ---
    const rbSiMesesContainer = document.querySelector('#q3_1 #DrbSi');
    const rbNoMesesContainer = document.querySelector('#q3_1 #DrbNo');

    // Secciones
    const q2_1 = document.getElementById('q2_1');
    const q2_2 = document.getElementById('q2_2');
    const q3_1 = document.getElementById('q3_1');
    const q3_2 = document.getElementById('q3_2');
    const q4_1 = document.getElementById('q4_1');
    const q4_2 = document.getElementById('q4_2'); // Sección que no debe mostrar fondo

    // Estilos base para el <body>
    Object.assign(body.style, {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s ease-in-out'
    });

    /**
     * Retorna el nombre de la imagen de fondo correspondiente
     * según la sección visible y los radios seleccionados.
     */
    function getCurrentBackground() {
        // PRIORIDAD: Si q4_2 (Crédito Individual) está visible, no se muestra ningún fondo.
        if (q4_2 && q4_2.offsetParent !== null) {
            return 'none';
        }

        // 1) Si q4_1 está visible => fondo 'none' (blanco)
        if (q4_1 && q4_1.offsetParent !== null) {
            return 'none';
        }

        // 2) Si q3_1 está visible => gris si "Sí, más de 6 meses", morado si "No, menos de 6 meses"
        if (q3_1 && q3_1.offsetParent !== null) {
            const rbSiMeses = document.getElementById('rbSiNegocio');
            const rbNoMeses = document.getElementById('rbNoNegocio');

            if (rbNoMeses?.checked) {
                return 'BG-morado.png';
            } else if (rbSiMeses?.checked) {
                return 'BG-gris.png';
            }
        }

        // 3) Si q3_2 está visible, verificamos el origen (q2_2 o q3_1)
        if (q3_2 && q3_2.offsetParent !== null) {
            const rbNo2_2 = document.getElementById('rbNo'); 
            const rbSiMeses = document.getElementById('rbSiNegocio'); 
            const rbNoMeses = document.getElementById('rbNoNegocio');

            if (rbNo2_2?.checked || rbNoMeses?.checked) {
                return 'BG-morado.png';
            }
            if (rbSiMeses?.checked) {
                return 'BG-gris.png';
            }

            return 'BG-amarillo.png';
        }

        // 4) Si q2_2 está visible => checamos radio "Sí, tengo" / "No, tengo"
        if (q2_2 && q2_2.offsetParent !== null) {
            const rbSi2_2 = document.getElementById('rbSi');
            const rbNo2_2 = document.getElementById('rbNo');

            if (rbSi2_2?.checked) {
                return 'BG-gris.png';
            } else if (rbNo2_2?.checked) {
                return 'BG-morado.png';
            } else {
                return 'BG-amarillo.png';
            }
        }

        // 5) Por defecto
        return 'BG-amarillo.png';
    }

    /**
     * Aplica el fondo al <body> según la imagen (o 'none').
     */
    function changeBackground(image) {
        if (image === 'none') {
            body.style.backgroundImage = 'none';
            body.style.backgroundColor = '#fff';
            return;
        }
        let mobileImage = image.replace('.png', '-mobile.png');
        body.style.backgroundImage = `url('assets/images/${mobileImage}')`;
        body.style.backgroundColor = '';
        document.documentElement.style.height = '100%';
        body.style.minHeight = '100vh';
    }

    // Aplica el fondo inicial al cargar la página
    changeBackground(getCurrentBackground());

    // Eventos de clic para cambiar el fondo
    [rbSiContainer, rbNoContainer, rbGrupalContainer, rbIndividualContainer, 
     rbSiNegocioContainer, rbNoNegocioContainer, rbSiMesesContainer, rbNoMesesContainer]
    .forEach(container => {
        if (container) {
            container.addEventListener('click', () => {
                changeBackground(getCurrentBackground());
            });
        }
    });

    // Recalcula el fondo al cambiar de tamaño o orientación
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            changeBackground(getCurrentBackground());
        }
    });
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (window.innerWidth < 1024) {
                changeBackground(getCurrentBackground());
            }
        }, 100);
    });

    // Observadores de visibilidad
    [q4_1, q4_2, q3_2, q3_1, q2_2, q2_1].forEach(section => {
        if (section) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    changeBackground(getCurrentBackground());
                });
            });
            observer.observe(section);
        }
    });
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

 
        

        

        

        



        


 
        

        
