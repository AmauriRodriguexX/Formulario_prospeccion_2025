// MARK: Actualización dinámica del título 
document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.querySelector(".home__title");
  const sectionQ3_2 = document.getElementById("q3_2");
  const paragraphQ3_2 = sectionQ3_2?.querySelector("p.question.c-center");
  const spanQ3_2 = sectionQ3_2?.querySelector("span.p-title.text-mobiel-form");

  const radioNo = document.getElementById("rbCNo");
  const radioSi = document.getElementById("rbCSi");

  const sectionTitles = {
    q2_1: "Ofertas para clientes",
    q3_2: "Solicitud crédito adicional",
    q4_1: "Crédito grupal",
    q4_2: "Crédito individual"
  };

  function updateTitle() {
    let newTitle = "Tramita tu crédito";
    let newSpanText = "Déjanos tus datos para que nuestro agente se contacte contigo y te haga saber la oferta que te tenemos.";

    for (let sectionId in sectionTitles) {
      const section = document.getElementById(sectionId);
      if (section && section.offsetParent !== null) {
        newTitle = sectionTitles[sectionId];
        break;
      }
    }

    if (sectionQ3_2 && sectionQ3_2.offsetParent !== null) {
      if (radioNo?.checked) {
        newTitle = "Tramita tu crédito";
        if (paragraphQ3_2) paragraphQ3_2.textContent = "Información personal";
      } else if (radioSi?.checked) {
        if (paragraphQ3_2) paragraphQ3_2.textContent = "Información cliente";
      }
    }

    if (newTitle === "Solicitud crédito adicional" && spanQ3_2) {
      newSpanText = "Déjanos tus datos. Le haremos saber a tu Promotor que estás interesado en este crédito para iniciar el trámite.";
    }

    if (titleElement) titleElement.textContent = newTitle;
    if (spanQ3_2) spanQ3_2.textContent = newSpanText;
  }

  // Escuchar cambios en radio buttons
  [radioNo, radioSi].forEach((radio) => {
    if (radio) {
      radio.addEventListener("change", updateTitle);
    }
  });

  // Verificar visibilidad de secciones cuando se hace scroll o cambia viewport
  window.addEventListener("scroll", updateTitle);
  window.addEventListener("resize", updateTitle);
  window.addEventListener("orientationchange", updateTitle);

  updateTitle(); // Estado inicial
});
// MARK: Estilos dinámicos para secciones q4_1 y q4_2 en escritorio (CSS separado, sin observer)
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) return;
  const section1 = document.getElementById("q4_1");
  const section2 = document.getElementById("q4_2");
  const mainElement = document.querySelector(".main");
  const mainContent = document.querySelector(".main__content");
  const carouselCards = document.querySelectorAll("#previous-winners .carousel .card");
  const wrapperElement = document.querySelector(".wrapper");
  const homeTitle = document.querySelector(".home__title");
  const questionElement = document.querySelector(".question");
  const flexColumnElements = document.querySelectorAll(".flex-column");
  function updateStyles() {
    const section1Visible = section1 && section1.offsetParent !== null;
    const section2Visible = section2 && section2.offsetParent !== null;
    if (section1Visible || section2Visible) {
      mainElement?.classList.add("main-no-style");
      mainElement?.classList.remove("main-default-style");
      wrapperElement?.classList.add("wrapper-custom");
      homeTitle?.classList.add("text-center");
      questionElement?.classList.add("text-center");
      carouselCards.forEach((card) => card.classList.add("card-flex-auto"));
      flexColumnElements.forEach((el) => el.classList.add("flex-column-center"));
    } else {
      mainElement?.classList.remove("main-no-style");
      mainElement?.classList.add("main-default-style");
      wrapperElement?.classList.remove("wrapper-custom");
      homeTitle?.classList.remove("text-center");
      questionElement?.classList.remove("text-center");
      carouselCards.forEach((card) => card.classList.remove("card-flex-auto"));
      flexColumnElements.forEach((el) => el.classList.remove("flex-column-center"));
    }
  }
  updateStyles();
  setTimeout(updateStyles, 50);
  window.addEventListener("resize", updateStyles);
  window.addEventListener("orientationchange", () => setTimeout(updateStyles, 100));
  window.addEventListener("scroll", updateStyles);
  document.addEventListener("click", () => setTimeout(updateStyles, 100));
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
  const q4_2 = document.getElementById('q4_2');

  // --- Elementos visuales ---
  const mainElement = document.querySelector('.main');
  const mainContent = document.querySelector('.main__content');
  const wrapper = document.querySelector('.wrapper');
  const homeTitle = document.querySelector('.home__title');

  function isVisible(el) {
    return el && el.offsetParent !== null;
  }

  function getCurrentBackground() {
    const isDesktop = window.innerWidth >= 1024;
    if (isVisible(q4_2) || isVisible(q4_1)) return 'none';

    if (isVisible(q3_1)) {
      const rbSiMeses = document.getElementById('rbSiNegocio');
      const rbNoMeses = document.getElementById('rbNoNegocio');
      if (rbNoMeses?.checked) return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
      if (rbSiMeses?.checked) return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
    }

    if (isVisible(q3_2)) {
      const rbNo2_2 = document.getElementById('rbNo');
      const rbSiMeses = document.getElementById('rbSiNegocio');
      const rbNoMeses = document.getElementById('rbNoNegocio');
      if (rbNo2_2?.checked || rbNoMeses?.checked || rbSiMeses?.checked) {
        return isDesktop ? 'bg-gris-mangenta.png' : 'BG-rosa-mobile.png';
      }
      return isDesktop ? 'BG-amarillo-opacy.png' : 'BG-amarillo-mobile-opacy.png';
    }

    if (isVisible(q2_2)) {
      const rbSi2_2 = document.getElementById('rbSi');
      const rbNo2_2 = document.getElementById('rbNo');
      if (rbSi2_2?.checked) return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
      if (rbNo2_2?.checked) return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
      return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
    }

    if (isVisible(q2_1)) {
      const rbGrupal = document.getElementById('rbGrupalSi');
      const rbIndividual = document.getElementById('rbIndividualNo');
      if (rbGrupal?.checked) return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
      if (rbIndividual?.checked) return isDesktop ? 'BG-gris.png' : 'BG-gris-mobile.png';
      return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
    }

    const rbSi = document.getElementById('rbCSi');
    const rbNo = document.getElementById('rbCNo');
    if (rbSi?.checked) return isDesktop ? 'BG-morado.png' : 'BG-morado-mobile.png';
    if (rbNo?.checked) return isDesktop ? 'BG-blue.png' : 'BG-blue-mobile.png';

    return isDesktop ? 'BG-amarillo.png' : 'BG-amarillo-mobile.png';
  }

  function changeBackground(image) {
    body.className = body.className
      .split(' ')
      .filter(c => !c.startsWith('bg-') && c !== 'no-bg')
      .join(' ');

    if (image === 'none') {
      body.classList.add('no-bg');
      return;
    }

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop && image === 'BG-rosa-mobile.png') {
      body.classList.add('bg-rosa-mobile');
    } else {
      const className = 'bg-' + image.replace('.png', '').toLowerCase();
      body.classList.add(className);
    }
  }

  function updateClasses() {
    const visible = isVisible(q3_2);
    mainElement?.classList.toggle('main-visible-q3_2', visible);
    mainContent?.classList.toggle('main-content-visible-q3_2', visible);
    wrapper?.classList.toggle('wrapper-visible-q3_2', visible);
    homeTitle?.classList.toggle('home-title-visible-q3_2', visible);
  }

  function updateView() {
    updateClasses();
    changeBackground(getCurrentBackground());
  }

  updateView();

  const actions = [
    [rbSiContainer, 'rbCSi'],
    [rbNoContainer, 'rbCNo'],
    [rbGrupalContainer, 'rbGrupalSi'],
    [rbIndividualContainer, 'rbIndividualNo'],
    [rbSiNegocioContainer, 'rbSi'],
    [rbNoNegocioContainer, 'rbNo'],
    [rbSiMesesContainer, 'rbSiNegocio'],
    [rbNoMesesContainer, 'rbNoNegocio']
  ];

  actions.forEach(([container, inputId]) => {
    container?.addEventListener('click', () => {
      const input = document.getElementById(inputId);
      if (input) input.checked = true;
      updateView();
    });
  });

  window.addEventListener('resize', updateView);
  window.addEventListener('orientationchange', () => setTimeout(updateView, 100));
});

//MARK:  scroll suave
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

// MARK: Carrusel interactivo con botones, dots y swipe
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
    backgroundAttachment: 'scroll',
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



// MARK: Alterna posición del botón según visibilidad de la sección 
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 768) return; // Solo ejecuta en móvil
  const btn = document.querySelector(".btnContinuarInicio");
  const targetSection = document.getElementById("q3_2");
  if (!btn || !targetSection) return;
  function updateButtonPosition() {
    const rect = targetSection.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    btn.classList.toggle("btn-fixed", !visible);
    btn.classList.toggle("btn-relative", visible);
  }

  window.addEventListener("scroll", updateButtonPosition);
  window.addEventListener("resize", updateButtonPosition);

  updateButtonPosition(); 
});

//MARK: ROMULARIOS - DESHABILITAR Y HABILITAR CAMPOS
document.addEventListener("DOMContentLoaded", function() {
  function enableField(id) {
    var field = document.getElementById(id);
    if (field && field.disabled) {
      field.disabled = false;
    }
  }
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
    }
  });
  var nombreField = document.getElementById("txbNombre");
  if (nombreField) {
    nombreField.addEventListener("input", function() {
      if (nombreField.value.trim() !== "") {
        enableField("txbApPaterno");
        enableField("txbApMaterno");
      }
    });
  }
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
  var telField = document.getElementById("txbNumeroTel");
  if (telField) {
    telField.addEventListener("input", function() {
      if (telField.value.trim() !== "") {
        enableField("horaSelect");
        enableField("txbCP");
      }
    });
  }
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
    var backButton = document.querySelector('.header-back-icons div#btnBack');
    function updateBackButton() {
        var sections = document.querySelectorAll('.question__content');
        var visibleSection = null;
        sections.forEach(function(section) {
            var style = window.getComputedStyle(section);
            if (style.display !== "none") {
                visibleSection = section;
            }
        });
        if (visibleSection && visibleSection.id === "q1") {
            backButton.style.display = "none";
        } else {
            backButton.style.display = "block";
        }
    }
    
    updateBackButton();
    setInterval(updateBackButton, 300);
});
        

        

        

        



        


 
        

        
