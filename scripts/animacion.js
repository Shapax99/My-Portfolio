// Forzar scroll al inicio al recargar la página
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('loaded');

  // Animación de entrada para elementos del hero
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
const contactBtn = document.querySelector('.btn[href="#contacto"]');
if (contactBtn) {
  contactBtn.addEventListener('click', (e) => {
    e.target.classList.add('animate-fade');
    setTimeout(() => e.target.classList.remove('animate-fade'), 500);
  });
}


// Animacion para vista de ".about"
const aboutElement = document.querySelector(".about");

if (aboutElement) {
  const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutElement.classList.add("aparicion");
        aboutElement.classList.add("animate-slide-up");
        aboutObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  aboutObserver.observe(aboutElement);
}

// Efecto parallax suave para el hero (throttled)
let heroScrollTicking = false;
window.addEventListener('scroll', () => {
  if (!heroScrollTicking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }
      heroScrollTicking = false;
    });
    heroScrollTicking = true;
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
