// Actualizar año
document.getElementById('year').textContent = new Date().getFullYear();

// FORMULARIO DE CONTACTO
const WEB3FORMS_ACCESS_KEY = '7f7af657-6724-4be5-b6ce-a0951f06480f';

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const reasonSelect = document.getElementById('reason');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitBtn = form.querySelector('.submit-btn');
const honeypot = document.getElementById('botcheck');
const statusEl = document.getElementById('form-status');
const statusText = statusEl.querySelector('.form-status__text');
const charCount = document.getElementById('message-count');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let submitted = false;

function isValid(input) {
    const v = input.value.trim();
    if (input === nameInput) return v.length >= 2;
    if (input === emailInput) return EMAIL_RE.test(v);
    if (input === messageInput) return v.length >= 10;
    if (input === reasonSelect) return v !== '';
    return true;
}

function setFieldState(input, ok) {
    const group = input.closest('.form-group');
    if (!group) return;
    if (input.value.trim() === '' && !submitted) {
        group.classList.remove('success', 'error');
        input.setAttribute('aria-invalid', 'false');
        return;
    }
    group.classList.toggle('success', ok);
    group.classList.toggle('error', !ok);
    input.setAttribute('aria-invalid', String(!ok));
}

[nameInput, emailInput, messageInput, reasonSelect].forEach((input) => {
    const evt = input === reasonSelect ? 'change' : 'input';
    input.addEventListener(evt, () => setFieldState(input, isValid(input)));
});

reasonSelect.addEventListener('change', () => {
    reasonSelect.closest('.form-group').classList.toggle('filled', reasonSelect.value !== '');
});

const ccMin = parseInt(charCount.dataset.min, 10) || 0;
const ccMax = parseInt(charCount.dataset.max, 10) || 1000;
messageInput.addEventListener('input', () => {
    const n = messageInput.value.length;
    charCount.textContent = n + ' / ' + ccMax;
    charCount.classList.toggle('valid', n >= ccMin && n <= ccMax);
    charCount.classList.toggle('over', n > ccMax);
});

function showStatus(type, key) {
    statusEl.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    statusEl.classList.remove('is-success', 'is-error');
    statusEl.classList.add(type === 'success' ? 'is-success' : 'is-error');
    statusText.textContent = form.dataset[key] || '';
    statusEl.hidden = false;
    requestAnimationFrame(() => statusEl.classList.add('show'));
}

function clearStatus() {
    statusEl.classList.remove('show');
    statusEl.hidden = true;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitted = true;
    clearStatus();

    if (honeypot && honeypot.value.trim() !== '') return;

    const fields = [nameInput, emailInput, reasonSelect, messageInput];
    let firstInvalid = null;
    fields.forEach((input) => {
        const ok = isValid(input);
        setFieldState(input, ok);
        if (!ok && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
        showStatus('error', 'invalid');
        firstInvalid.focus();
        return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');

    const reasonVal = reasonSelect.value;
    const subjectVal = subjectInput.value.trim();
    const subjectLine = subjectVal
        ? '[' + reasonVal + '] ' + subjectVal
        : '[' + reasonVal + '] ' + (form.dataset.defaultSubject || 'New message from portfolio');

    const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: form.dataset.fromName || 'Portfolio',
        subject: subjectLine,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        reason: reasonVal,
        botcheck: ''
    };

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                showStatus('success', 'success');
                form.reset();
                submitted = false;
                document.querySelectorAll('.contact-form .form-group').forEach((group) => {
                    group.classList.remove('success', 'error', 'filled');
                });
                fields.forEach((input) => input.setAttribute('aria-invalid', 'false'));
                charCount.textContent = '0 / ' + ccMax;
                charCount.classList.remove('valid', 'over');
            } else {
                showStatus('error', 'error');
            }
        })
        .catch(() => {
            showStatus('error', 'network');
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
        });
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
