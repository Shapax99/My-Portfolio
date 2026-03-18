document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('loaded'); // animación inicial
  
  // Añadir animación de entrada a elementos
  setTimeout(() => {
    const elementsToAnimate = document.querySelectorAll('.hero h1, .hero p, .btn');
    elementsToAnimate.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up');
      }, index * 200);
    });
  }, 500);
});


// Contacto animación mejorada
document.querySelector('.btn[href="#contacto"]').addEventListener('click', (e) => {
  console.log("Navegando a contacto")
  e.target.classList.add('animate-fade');
  setTimeout(() => e.target.classList.remove('animate-fade'), 500);
});


// Animacion para vista de ".proyect" mejorada
const elemento = document.querySelectorAll(".project");

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Añadir delay escalonado para efecto más elegante
      setTimeout(() => {
        entry.target.classList.add("aparicion");
        entry.target.classList.add("animate-slide-up");
      }, index * 100);
      // Dejar de observar para que la animación solo ocurra una vez
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3 // Para cuando el elemento esté 30% visible (más accesible)
})
  elemento.forEach(el => observer.observe(el));


 // Animacion para vista de ".about" mejorada
const elemento2 = document.querySelector(".about");

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      elemento2.classList.add("aparicion");
      elemento2.classList.add("animate-slide-up");
      // Dejar de observar para que la animación solo ocurra una vez
      observer2.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3 // Para cuando el elemento esté 30% visible (más accesible)
})
 observer2.observe(elemento2);

// Efecto parallax suave para el hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Añadir efecto hover mejorado a los botones
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});

