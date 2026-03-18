// Actualizar año automáticamente
document.getElementById('year').textContent = new Date().getFullYear();

// SISTEMA DE TEMA OSCURO/CLARO
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Obtener tema guardado o usar preferencia del sistema
const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Función para cambiar tema
function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Añadir animación
    themeToggle.classList.add('theme-toggle-animation');
    
    // Cambiar tema
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remover animación después de completarse
    setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-animation');
    }, 500);
}

// Event listener para el botón de tema
themeToggle.addEventListener('click', switchTheme);

// Detectar cambios en la preferencia del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// VALIDACIÓN Y MANEJO DEL FORMULARIO MEJORADO
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = form.querySelector('.submit-btn');

// Funciones de validación
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

// Función para mostrar errores
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = message;
}

// Función para mostrar éxito
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

// Validación en tiempo real
nameInput.addEventListener('input', () => {
    if (validateName(nameInput.value)) {
        showSuccess(nameInput);
    } else if (nameInput.value.length > 0) {
        showError(nameInput, 'El nombre debe tener al menos 2 caracteres');
    }
});

emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value)) {
        showSuccess(emailInput);
    } else if (emailInput.value.length > 0) {
        showError(emailInput, 'Por favor ingresa un correo electrónico válido');
    }
});

messageInput.addEventListener('input', () => {
    if (validateMessage(messageInput.value)) {
        showSuccess(messageInput);
    } else if (messageInput.value.length > 0) {
        showError(messageInput, 'El mensaje debe tener al menos 10 caracteres');
    }
});

// Manejo del envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar todos los campos
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Por favor ingresa tu nombre completo');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Por favor ingresa un correo electrónico válido');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    } else {
        showSuccess(messageInput);
    }
    
    if (isValid) {
        // Simular envío
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            alert('¡Mensaje enviado exitosamente! Gracias por contactarme.');
            form.reset();
            
            // Limpiar estados de validación
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
        }, 2000);
    }
});

// Boton de redireccionar
document.querySelector("#language-toggle").addEventListener("click", () => {
    window.location.href = "index_EN.html"
});

// NAVEGACIÓN MÓVIL
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navigation = document.getElementById('navigation');

// Crear barra de progreso de scroll
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
navigation.appendChild(scrollProgress);

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Efecto scroll mejorado en navegación
window.addEventListener('scroll', () => {
    // Añadir clase scrolled
    if (window.scrollY > 50) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }

    // Actualizar barra de progreso
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Indicador de sección activa
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
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
});