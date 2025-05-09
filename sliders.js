// Código mejorado para el slider con animaciones y funcionalidad
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.slider-indicator');
    const slider = document.querySelector('.slider');
    
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Función para mostrar un slide específico con animación mejorada
    function showSlide(n) {
      if (isTransitioning) return;
      isTransitioning = true;
      
      // Obtener el slide anterior que estaba activo
      const previousActiveSlide = document.querySelector('.slide.active');
      
      // Eliminar la clase active de todos los indicadores
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      // Añadir la clase active al indicador correspondiente
      indicators[n].classList.add('active');
      
      // Fade out del slide activo actual
      if (previousActiveSlide) {
        previousActiveSlide.style.opacity = '0';
        previousActiveSlide.style.transform = 'translateX(-50px)';
        
        // Pequeño retraso antes de quitar la clase active
        setTimeout(() => {
          previousActiveSlide.classList.remove('active');
          
          // Preparar y mostrar el nuevo slide
          slides[n].style.transform = 'translateX(50px)';
          slides[n].classList.add('active');
          
          // Animar la entrada del nuevo slide
          setTimeout(() => {
            slides[n].style.opacity = '1';
            slides[n].style.transform = 'translateX(0)';
            
            // Volver a permitir transiciones cuando termine la animación
            setTimeout(() => {
              isTransitioning = false;
            }, 500);
          }, 50);
        }, 300);
      } else {
        // Si no hay slide activo (primera carga)
        slides[n].classList.add('active');
        slides[n].style.opacity = '1';
        slides[n].style.transform = 'translateX(0)';
        isTransitioning = false;
      }
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Reiniciar el intervalo automático
    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 7000); // 7 segundos entre slides
    }
    
    // Configurar eventos para botones de navegación
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
        resetInterval();
      });
      
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
        resetInterval();
      });
    }
    
    // Configurar eventos para indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        if (currentSlide !== index && !isTransitioning) {
          currentSlide = index;
          showSlide(currentSlide);
          resetInterval();
        }
      });
    });
    
    // Funcionalidad de gestos táctiles (swipe)
    if (slider) {
      slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});
      
      slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, {passive: true});
      
      // Detener/reanudar automáticamente cuando el mouse entra/sale del slider
      slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', function() {
        resetInterval();
      });
    }
    
    // Manejar gestos de deslizamiento
    function handleSwipe() {
      const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
      
      // Si el gesto fue suficientemente largo
      if (Math.abs(touchEndX - touchStartX) > swipeThreshold) {
        // Swipe izquierda -> siguiente slide
        if (touchEndX < touchStartX) {
          nextSlide();
        }
        // Swipe derecha -> slide anterior
        else if (touchEndX > touchStartX) {
          prevSlide();
        }
        resetInterval();
      }
    }
    
    // Manejar eventos de teclado para accesibilidad
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
      }
    });
    
    // Auto iniciar el slider
    showSlide(currentSlide);
    resetInterval();
    
    // Pausa automática cuando la página no está visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        clearInterval(slideInterval);
      } else {
        resetInterval();
      }
    });
    
    // Agregar titulos y etiquetas a los slides dinámicamente
    const colecciones = ["Colección Exótica", "Edición Limitada", "Diseño Exclusivo", "Nueva Temporada"];
    const nombres = ["Bolso Cocodrilo Verde", "Bolso Serpiente Amber", "Clutch Leopardo", "Bandolera Zebra"];
    
    slides.forEach((slide, index) => {
      // Crear y añadir etiqueta de colección
      const coleccionTag = document.createElement('div');
      coleccionTag.className = 'coleccion-tag';
      coleccionTag.textContent = colecciones[index];
      slide.appendChild(coleccionTag);
      
      // Crear y añadir el nombre del producto
      const nombreProducto = document.createElement('h3');
      nombreProducto.className = 'nombre-producto';
      nombreProducto.textContent = nombres[index];
      
      // Insertar el nombre antes de la descripción
      const descripcion = slide.querySelector('.descripcion-bolso');
      if (descripcion) {
        slide.insertBefore(nombreProducto, descripcion);
      }
    });
  });