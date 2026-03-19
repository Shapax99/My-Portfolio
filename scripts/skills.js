// ANIMACIONES DE HABILIDADES TÉCNICAS

// Función para animar las barras de progreso
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 300);
    });
}

// Observer para las categorías de habilidades - solo animar una vez
let skillBarsAnimated = false;
const skillsCategories = document.querySelectorAll('.skills-category');

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("aparicion");

            // Animar las barras solo la primera vez que cualquier categoría sea visible
            if (!skillBarsAnimated) {
                skillBarsAnimated = true;
                setTimeout(animateSkillBars, 500);
            }

            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

skillsCategories.forEach(category => skillsObserver.observe(category));
