// Advanced Visual Effects Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visual effects
    initParticleSystem();
    initCustomCursor();
    initScrollEffects();
    initInteractiveAnimations();
});

// Particle System
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.6';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.vx -= (dx / distance) * force * 0.01;
                this.vy -= (dy / distance) * force * 0.01;
            }

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (100 - distance) / 100})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Custom Cursor
function initCustomCursor() {
    // Círculo exterior (seguidor suave)
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    // Punto central (sigue directo al mouse)
    const cursorCore = document.createElement('div');
    cursorCore.classList.add('cursor-core');
    document.body.appendChild(cursorCore);

    // Efecto de trail/rastro
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let trailX = 0, trailY = 0;

    // Movimiento del mouse - solo actualiza posición objetivo
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // El núcleo sigue directamente al mouse (respuesta inmediata)
        cursorCore.style.left = mouseX + 'px';
        cursorCore.style.top = mouseY + 'px';
    });

    // Animación suave para el seguidor y el rastro - velocidad constante
    function animateCursor() {
        // Interpolación suave constante (sin cambios por mousedown)
        const followerSpeed = 0.12;
        const trailSpeed = 0.06;
        
        // Seguidor con interpolación
        followerX += (mouseX - followerX) * followerSpeed;
        followerY += (mouseY - followerY) * followerSpeed;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        // Trail con interpolación
        trailX += (mouseX - trailX) * trailSpeed;
        trailY += (mouseY - trailY) * trailSpeed;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions con elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .project, .skill-item, .timeline-item, .goal-card, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('cursor-hover');
            cursorCore.classList.add('cursor-hover');
            cursorTrail.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('cursor-hover');
            cursorCore.classList.remove('cursor-hover');
            cursorTrail.classList.remove('cursor-hover');
        });
    });

    // Efecto de clic simplificado (solo visual, sin afectar movimiento)
    document.addEventListener('mousedown', () => {
        cursorCore.classList.add('cursor-click');
        cursorFollower.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorCore.classList.remove('cursor-click');
        cursorFollower.classList.remove('cursor-click');
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.parallax');
        
        parallax.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll('section, .project, h1, h2');
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        revealObserver.observe(element);
    });
}

// Interactive Animations
function initInteractiveAnimations() {
    // Floating animation for cards
    const floatingElements = document.querySelectorAll('.project, .competency-item, .skills-category');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('floating');
    });

    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Text typing effect for hero section
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Add CSS for visual effects
const effectsStyle = document.createElement('style');
effectsStyle.textContent = `
    /* Custom Cursor - Mejorado */
    * {
        cursor: none !important;
    }
    
    /* Núcleo del cursor - Punto central que sigue directo al mouse */
    .cursor-core {
        position: fixed;
        width: 12px;
        height: 12px;
        background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b);
        background-size: 300% 300%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10002;
        transform: translate(-50%, -50%);
        box-shadow: 
            0 0 10px rgba(255, 107, 107, 0.6),
            0 0 20px rgba(254, 202, 87, 0.4),
            0 0 30px rgba(72, 219, 251, 0.3);
        animation: gradientShift 3s ease infinite;
        transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    /* Seguidor - Círculo exterior que persigue suavemente */
    .cursor-follower {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 107, 107, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transform: translate(-50%, -50%);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        background: radial-gradient(circle, 
            rgba(255, 107, 107, 0.05) 0%, 
            rgba(254, 202, 87, 0.03) 50%, 
            transparent 70%);
    }

    /* Trail - Efecto de rastro */
    .cursor-trail {
        position: fixed;
        width: 60px;
        height: 60px;
        border: 1px solid rgba(72, 219, 251, 0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        filter: blur(2px);
        opacity: 0.4;
    }
    
    /* Estados hover */
    .cursor-core.cursor-hover {
        width: 16px;
        height: 16px;
        background: linear-gradient(135deg, #ee5a6f, #f79d65, #48dbfb, #ee5a6f);
        box-shadow: 
            0 0 15px rgba(255, 107, 107, 0.8),
            0 0 30px rgba(254, 202, 87, 0.6),
            0 0 45px rgba(72, 219, 251, 0.4);
    }
    
    .cursor-follower.cursor-hover {
        width: 60px;
        height: 60px;
        border-color: rgba(255, 107, 107, 0.8);
        background: radial-gradient(circle, 
            rgba(255, 107, 107, 0.1) 0%, 
            rgba(254, 202, 87, 0.05) 50%, 
            transparent 70%);
    }

    .cursor-trail.cursor-hover {
        width: 80px;
        height: 80px;
        border-color: rgba(72, 219, 251, 0.4);
        opacity: 0.6;
    }

    /* Estado de clic */
    .cursor-core.cursor-click {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cursor-follower.cursor-click {
        transform: translate(-50%, -50%) scale(0.9);
    }
    
    /* Reveal animations */
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .reveal-element.reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Floating animation */
    .floating {
        animation: floating 6s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Ripple effect */
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Disable cursor on mobile */
    @media (max-width: 768px) {
        * {
            cursor: auto !important;
        }
        
        .cursor-core,
        .cursor-follower,
        .cursor-trail {
            display: none;
        }
    }
    
    /* Particle canvas dark mode adjustment */
    [data-theme="dark"] #particle-canvas {
        opacity: 0.4;
    }
    
    [data-theme="light"] #particle-canvas {
        opacity: 0.2;
    }
`;
document.head.appendChild(effectsStyle);
