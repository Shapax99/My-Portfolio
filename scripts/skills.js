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

// Observer para las categorías de habilidades
const skillsCategories = document.querySelectorAll('.skills-category');

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Añadir delay escalonado para efecto más elegante
            setTimeout(() => {
                entry.target.classList.add("aparicion");
                entry.target.classList.add("animate-slide-up");
                
                // Animar las barras de progreso cuando la sección sea visible
                if (index === 0) { // Solo ejecutar una vez
                    setTimeout(animateSkillBars, 500);
                }
            }, index * 200);
        } else {
            entry.target.classList.remove("aparicion");
            entry.target.classList.remove("animate-slide-up");
        }
    });
}, {
    threshold: 0.3
});

skillsCategories.forEach(category => skillsObserver.observe(category));

// Función para resetear animaciones de habilidades
function resetSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

// Resetear cuando las secciones salen de vista
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const resetObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                resetSkillAnimations();
            }
        });
    }, {
        threshold: 0.1
    });
    
    resetObserver.observe(skillsSection);
}
