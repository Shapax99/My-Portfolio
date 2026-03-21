// Filtros de proyectos

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectAnimations();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            setTimeout(() => {
                card.classList.remove('filtered');
                card.style.display = 'block';
            }, index * 100);
        } else {
            card.classList.add('filtered');
            setTimeout(() => {
                if (card.classList.contains('filtered')) {
                    card.style.display = 'none';
                }
            }, 400);
        }
    });
    
    updateProjectCount(filter, projectCards);
}

function updateProjectCount(filter, projectCards) {
    const visibleCount = Array.from(projectCards).filter(card => {
        const category = card.dataset.category;
        return filter === 'all' || category === filter;
    }).length;
    
    console.log(`Showing ${visibleCount} projects`);
}

function initProjectAnimations() {
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        projectObserver.observe(card);
    });
    
    projectCards.forEach(card => {
        const techTags = card.querySelectorAll('.tech-tag');
        
        card.addEventListener('mouseenter', function() {
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.background = 'var(--accent-color)';
                    tag.style.color = 'white';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.background = 'var(--bg-primary)';
                tag.style.color = 'var(--text-primary)';
            });
        });
    });
    
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.position = 'absolute';
            ripple.style.animation = 'project-ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log('Opening project:', this.closest('.project-card').querySelector('h3').textContent);
        });
    });
}

function initProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tags.some(tag => tag.includes(searchTerm));
            
            if (matches) {
                card.style.display = 'block';
                card.classList.remove('filtered');
            } else {
                card.style.display = 'none';
                card.classList.add('filtered');
            }
        });
    });
}

const projectStyle = document.createElement('style');
projectStyle.textContent = `
    @keyframes project-ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    .project-card {
        will-change: transform, opacity;
    }
    
    .tech-tag {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .filter-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .filter-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(projectStyle);
