// Código mejorado para el slider
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
  
  // Función para mostrar un slide específico
  function showSlide(n) {
      if (isTransitioning) return;
      isTransitioning = true;
      
      // Eliminar la clase active de todos los slides e indicadores
      slides.forEach(slide => {
          slide.classList.remove('active');
          slide.style.opacity = '0';
      });
      
      indicators.forEach(indicator => {
          indicator.classList.remove('active');
      });
      
      // Añadir la clase active al slide actual y su indicador
      setTimeout(() => {
          slides[n].classList.add('active');
          indicators[n].classList.add('active');
          
          // Fade in del nuevo slide
          setTimeout(() => {
              slides[n].style.opacity = '1';
              isTransitioning = false;
          }, 50);
      }, 300);  // Pequeño retraso para la transición
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
      slideInterval = setInterval(nextSlide, 8000);
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
          if (currentSlide !== index) {
              currentSlide = index;
              showSlide(currentSlide);
              resetInterval();
          }
      });
  });
  
  // Detener/reanudar automáticamente cuando el mouse entra/sale del slider
  if (slider) {
      slider.addEventListener('mouseenter', function() {
          clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', function() {
          resetInterval();
      });
  }
  
  // Iniciar el slider y el intervalo automático
  showSlide(currentSlide);
  resetInterval();
  
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
});