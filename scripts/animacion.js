// Scroll al inicio al recargar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('loaded');

  // Animación hero
  setTimeout(() => {
    const elementsToAnimate = document.querySelectorAll('.hero h1, .hero p, .btn');
    elementsToAnimate.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up');
      }, index * 200);
    });
  }, 500);
});


const contactBtn = document.querySelector('.btn[href="#contacto"]');
if (contactBtn) {
  contactBtn.addEventListener('click', (e) => {
    e.target.classList.add('animate-fade');
    setTimeout(() => e.target.classList.remove('animate-fade'), 500);
  });
}


// Observer para ".about"
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

// Parallax hero (throttled)
let heroScrollTicking = false;
window.addEventListener('scroll', () => {
  if (!heroScrollTicking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const heroH1 = document.querySelector('.hero h1');
      const heroP = document.querySelector('.hero p');
      const heroBtn = document.querySelector('.hero .btn');
      const scrollIndicator = document.getElementById('scroll-indicator');
      const viewportHeight = window.innerHeight;

      if (hero) {
        // Parallax background shift
        hero.style.transform = `translateY(${scrolled * -0.3}px)`;

        // Progress 0→1 through the hero
        const progress = Math.min(scrolled / (viewportHeight * 0.4), 1);

        // Each layer fades and rises at a different rate
        if (heroH1) {
          const p = Math.min(progress * 2.4, 1);
          heroH1.style.opacity = 1 - p;
          heroH1.style.transform = `translateY(${-scrolled * 0.45}px)`;
        }
        if (heroP) {
          const p = Math.min(progress * 2.0, 1);
          heroP.style.opacity = 1 - p;
          heroP.style.transform = `translateY(${-scrolled * 0.32}px)`;
        }
        if (heroBtn) {
          const p = Math.min(progress * 1.6, 1);
          heroBtn.style.opacity = 1 - p;
          heroBtn.style.transform = `translateY(${-scrolled * 0.2}px)`;
        }

        // Hide scroll indicator quickly
        if (scrollIndicator) {
          if (scrolled > 50) {
            scrollIndicator.classList.add('hidden');
          } else {
            scrollIndicator.classList.remove('hidden');
          }
        }
      }
      heroScrollTicking = false;
    });
    heroScrollTicking = true;
  }
});

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.02)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});
