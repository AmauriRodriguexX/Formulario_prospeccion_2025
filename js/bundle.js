// MARK: Actualización dinámica del título 
document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.querySelector(".home__title");
  const sectionQ3_2 = document.getElementById("q3_2");
  const paragraphQ3_2 = sectionQ3_2?.querySelector("p.question.c-center");
  const spanQ3_2 = sectionQ3_2?.querySelector("span.p-title.text-mobiel-form");
  const radioNo = document.getElementById("rbCNo");
  const radioSi = document.getElementById("rbCSi");

  const sectionTitles = {
    "q2_1": "Ofertas para clientes",
    "q3_2": "Solicitud crédito adicional",
    "q4_1": "Crédito grupal",
    "q4_2": "Crédito individual"
  };

  function isVisible(el) {
    return el && el.offsetParent !== null;
  }

  function updateTitle() {
    let newTitle = "Tramita tu crédito";
    let newSpanText = "Déjanos tus datos para que nuestro agente se contacte contigo y te haga saber la oferta que te tenemos.";

    for (let sectionId in sectionTitles) {
      const section = document.getElementById(sectionId);
      if (isVisible(section)) {
        newTitle = sectionTitles[sectionId];
        break;
      }
    }

    if (isVisible(sectionQ3_2) && radioNo?.checked) {
      newTitle = "Tramita tu crédito";
      if (paragraphQ3_2) {
        paragraphQ3_2.textContent = "Información personal";
      }
    } else if (isVisible(sectionQ3_2) && radioSi?.checked) {
      if (paragraphQ3_2) {
        paragraphQ3_2.textContent = "Información cliente";
      }
    }

    if (newTitle === "Solicitud crédito adicional" && spanQ3_2) {
      newSpanText = "Déjanos tus datos. Le haremos saber a tu Promotor que estás interesado en este crédito para iniciar el trámite.";
    }

    titleElement.textContent = newTitle;
    if (spanQ3_2) {
      spanQ3_2.textContent = newSpanText;
    }
  }

  if (radioNo) radioNo.addEventListener("change", updateTitle);
  if (radioSi) radioSi.addEventListener("change", updateTitle);
  window.addEventListener("scroll", () => setTimeout(updateTitle, 100));
  window.addEventListener("resize", () => setTimeout(updateTitle, 100));
  document.addEventListener("click", () => setTimeout(updateTitle, 100));

  updateTitle();
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
      if (rbNoMeses?.checked) return isDesktop ? 'bg-morado' : 'bg-morado-mobile';
      if (rbSiMeses?.checked) return isDesktop ? 'bg-gris' : 'bg-gris-mobile';
    }

    if (isVisible(q3_2)) {
      const rbNo2_2 = document.getElementById('rbNo');
      const rbSiMeses = document.getElementById('rbSiNegocio');
      const rbNoMeses = document.getElementById('rbNoNegocio');
      if (rbNo2_2?.checked || rbNoMeses?.checked || rbSiMeses?.checked) {
        return isDesktop ? 'bg-gris-mangenta' : 'bg-rosa-mobile';
      }
      return isDesktop ? 'bg-amarillo-opacy' : 'bg-amarillo-mobile-opacy';
    }

    if (isVisible(q2_2)) {
      const rbSi2_2 = document.getElementById('rbSi');
      const rbNo2_2 = document.getElementById('rbNo');
      if (rbSi2_2?.checked) return isDesktop ? 'bg-gris' : 'bg-gris-mobile';
      if (rbNo2_2?.checked) return isDesktop ? 'bg-morado' : 'bg-morado-mobile';
      return isDesktop ? 'bg-amarillo' : 'bg-amarillo-mobile';
    }

    if (isVisible(q2_1)) {
      const rbGrupal = document.getElementById('rbGrupalSi');
      const rbIndividual = document.getElementById('rbIndividualNo');
      if (rbGrupal?.checked) return isDesktop ? 'bg-morado' : 'bg-morado-mobile';
      if (rbIndividual?.checked) return isDesktop ? 'bg-gris' : 'bg-gris-mobile';
      return isDesktop ? 'bg-amarillo' : 'bg-amarillo-mobile';
    }

    const rbSi = document.getElementById('rbCSi');
    const rbNo = document.getElementById('rbCNo');
    if (rbSi?.checked) return isDesktop ? 'bg-morado' : 'bg-morado-mobile';
    if (rbNo?.checked) return isDesktop ? 'bg-azul' : 'bg-azul-mobile';

    return isDesktop ? 'bg-amarillo' : 'bg-amarillo-mobile';
  }

  function changeBackground(bgClass) {
    body.className = body.className
      .split(' ')
      .filter(c => !c.startsWith('bg-') && c !== 'no-bg')
      .join(' ');

    if (bgClass === 'none') {
      body.classList.add('no-bg');
    } else {
      body.classList.add(bgClass);
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
  window.addEventListener('scroll', () => setTimeout(updateView, 100));
  document.addEventListener('click', () => setTimeout(updateView, 100));
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
        

        

        

        



        


 
        

        
