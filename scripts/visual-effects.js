// Efectos visuales

document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (!prefersReducedMotion && !isMobile) {
        initParticleSystem();
        initCustomCursor();
    }
    initScrollEffects();
    initInteractiveAnimations();
});

// Partículas
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.6';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationId = null;
    let isVisible = true;

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible && !animationId) animate();
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 200);
    });

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

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 10000) { // 100^2
                const distance = Math.sqrt(distSq);
                const force = (100 - distance) / 100;
                this.vx -= (dx / distance) * force * 0.01;
                this.vy -= (dy / distance) * force * 0.01;
            }

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
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

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        if (!isVisible) { animationId = null; return; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 10000) { // 100^2
                    const distance = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (100 - distance) / 100})`;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// Cursor personalizado
function initCustomCursor() {
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    const cursorCore = document.createElement('div');
    cursorCore.classList.add('cursor-core');
    document.body.appendChild(cursorCore);

    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let trailX = 0, trailY = 0;
    let coreX = 0, coreY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const coreSpeed = 0.85;
        const followerSpeed = 0.35;
        const trailSpeed = 0.18;

        coreX += (mouseX - coreX) * coreSpeed;
        coreY += (mouseY - coreY) * coreSpeed;
        cursorCore.style.left = coreX + 'px';
        cursorCore.style.top = coreY + 'px';

        followerX += (mouseX - followerX) * followerSpeed;
        followerY += (mouseY - followerY) * followerSpeed;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        trailX += (mouseX - trailX) * trailSpeed;
        trailY += (mouseY - trailY) * trailSpeed;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

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

    document.addEventListener('mousedown', () => {
        cursorCore.classList.add('cursor-click');
        cursorFollower.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorCore.classList.remove('cursor-click');
        cursorFollower.classList.remove('cursor-click');
    });
}

// Scroll
function initScrollEffects() {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelectorAll('.parallax');
                parallax.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
}

// Animaciones interactivas
function initInteractiveAnimations() {
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
}

// CSS para efectos
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
`;
document.head.appendChild(effectsStyle);
