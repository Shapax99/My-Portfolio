// Actualizar año
document.getElementById('year').textContent = new Date().getFullYear();

// VALIDACIÓN DEL FORMULARIO
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = form.querySelector('.submit-btn');

function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

nameInput.addEventListener('input', () => {
    if (validateName(nameInput.value)) {
        showSuccess(nameInput);
    } else if (nameInput.value.length > 0) {
        showError(nameInput, 'Name must be at least 2 characters long');
    }
});

emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value)) {
        showSuccess(emailInput);
    } else if (emailInput.value.length > 0) {
        showError(emailInput, 'Please enter a valid email address');
    }
});

messageInput.addEventListener('input', () => {
    if (validateMessage(messageInput.value)) {
        showSuccess(messageInput);
    } else if (messageInput.value.length > 0) {
        showError(messageInput, 'Message must be at least 10 characters long');
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar todos los campos
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter your full name');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        showSuccess(messageInput);
    }
    
    if (isValid) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            alert('Message sent successfully! Thank you for contacting me.');
            form.reset();
            
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
        }, 2000);
    }
});

document.querySelector("#language-toggle").addEventListener("click", () => {
    window.location.href = "index_ES.html"
});

// NAVEGACIÓN
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navigation = document.getElementById('navigation');

const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
navigation.appendChild(scrollProgress);

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Scroll en navegación
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Sección activa
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');
const sideNav = document.getElementById('side-nav');
const sideNavItems = document.querySelectorAll('.side-nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    const heroBottom = document.getElementById('hero').offsetTop + document.getElementById('hero').offsetHeight;

    if (window.scrollY > heroBottom - 200) {
        sideNav.classList.add('visible');
    } else {
        sideNav.classList.remove('visible');
    }
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    sideNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

sideNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(item.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});