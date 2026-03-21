const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalStatus = document.getElementById('modal-status');
const modalDate = document.getElementById('modal-date');
const modalHighlights = document.getElementById('modal-highlights');
const modalHighlightsSection = document.getElementById('modal-highlights-section');
const modalActions = document.getElementById('modal-actions');
const carouselCounter = document.getElementById('carousel-counter');

const imageGroups = {
  0: ['img_project/1.png', 'img_project/2.png'],
  1: ['img/teso2.jpeg', 'img/teso1.jpeg'],
  2: ['img/biblio2.jpeg', 'img/biblio1.jpeg'],
  3: ['img/cyber2.jpeg', 'img/cyber1.jpeg'],
  4: ['img/fondo2.jpg']
};


const projectDetails = {
  0: {
    title: 'Calculadora de Matrices GUI',
    desc: 'Aplicación interactiva de Python para operaciones de matrices con interfaz intuitiva de Tkinter. Soporta matrices de 1x1 a 5x5 con capacidades de suma y resta. Desarrollada como proyecto personal para practicar GUI en Python.',
    tech: ['Python', 'Tkinter', 'GUI'],
    status: 'personal',
    statusText: 'Proyecto Personal',
    date: '2025',
    highlights: [
      'Interfaz gráfica intuitiva con Tkinter',
      'Soporte para matrices de 1x1 hasta 5x5',
      'Operaciones de suma y resta de matrices'
    ],
    links: {
      // github: 'https://github.com/...',
      // live: 'https://...'
    }
  },
  1: {
    title: 'Sistema de Cobros - App de Escritorio',
    desc: 'Mi primera aplicación de escritorio con un sistema de cobros desarrollado en Python. Utiliza conexión local HTTP para la comunicación entre componentes y permite guardar y manejar datos locales de forma eficiente.',
    tech: ['Python', 'HTTP Local', 'Datos Locales'],
    status: 'completed',
    statusText: 'Completado',
    date: 'Enero - Febrero 2026',
    highlights: [
      'Comunicación entre componentes vía HTTP local',
      'Almacenamiento y gestión de datos locales',
      'Primera aplicación de escritorio desarrollada'
    ],
    links: {}
  },
  2: {
    title: 'Sistema de Biblioteca',
    desc: 'Mini sistema web para manejar registros de entrada y salida de una biblioteca. Utiliza React en el frontend, Node.js para el backend y PostgreSQL como base de datos, conectada mediante red local.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Red Local'],
    status: 'completed',
    statusText: 'Completado',
    date: 'Febrero 2026',
    highlights: [
      'Registro de entrada y salida de usuarios',
      'Conexión a base de datos mediante red local',
      'Frontend en React con backend en Node.js'
    ],
    links: {}
  },
  3: {
    title: 'CyberManager - App de Escritorio',
    desc: 'Aplicación de escritorio para la gestión integral de un CyberCafe. Permite manejar inventario, ganancias, monitorear equipos y llevar cuentas con impresiones. Implementa múltiples tecnologías modernas de .NET.',
    tech: ['C#', '.NET 8.0', 'XAML', 'SignalR', 'PostgreSQL', 'SQLite'],
    status: 'development',
    statusText: 'En Desarrollo',
    date: 'Marzo 2026 - Presente',
    highlights: [
      'Gestión de inventario y monitoreo de ganancias',
      'Monitoreo de equipos en tiempo real con SignalR',
      'Sistema de cuentas e impresiones',
      'Doble base de datos: PostgreSQL y SQLite'
    ],
    links: {}
  },
  4: {
    title: 'Historial Academica - Sistema Web',
    desc: 'Detalles por definir.',
    tech: ['Por definir'],
    status: 'development',
    statusText: 'En Desarrollo',
    date: '',
    highlights: [],
    links: {}
  }
};

let currentImages = [];
let currentIndex = 0;

function updateCounter() {
  if (currentImages.length > 1) {
    carouselCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
    carouselCounter.style.display = 'block';
  } else {
    carouselCounter.style.display = 'none';
  }
}

function lazyLoadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    modalImg.classList.add('skeleton');
    modalImg.style.minHeight = '200px';

    img.onload = () => {
      modalImg.classList.remove('skeleton');
      modalImg.style.minHeight = 'auto';
      modalImg.src = src;
      updateCounter();
      resolve();
    };

    img.onerror = () => {
      modalImg.classList.remove('skeleton');
      modalImg.style.minHeight = 'auto';
      reject();
    };

    img.src = src;
  });
}

function abrirModal(index) {
  const data = projectDetails[index];
  currentImages = imageGroups[index];
  currentIndex = 0;

  // Title, description, date
  modalTitulo.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalDate.textContent = data.date || '';

  // Status badge
  modalStatus.textContent = data.statusText;
  modalStatus.className = 'modal-status status-' + data.status;

  // Tech tags
  modalTech.innerHTML = data.tech.map(function(t) {
    return '<span class="modal-tech-tag">' + t + '</span>';
  }).join('');

  // Highlights
  if (data.highlights && data.highlights.length > 0) {
    modalHighlightsSection.style.display = '';
    modalHighlights.innerHTML = data.highlights.map(function(h) {
      return '<li>' + h + '</li>';
    }).join('');
  } else {
    modalHighlightsSection.style.display = 'none';
  }

  // Action links
  var linksHTML = '';
  if (data.links && data.links.live) {
    linksHTML += '<a href="' + data.links.live + '" target="_blank" rel="noopener noreferrer" class="modal-link modal-link-primary">' +
      '<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>' +
      'Ver Proyecto</a>';
  }
  if (data.links && data.links.github) {
    linksHTML += '<a href="' + data.links.github + '" target="_blank" rel="noopener noreferrer" class="modal-link modal-link-secondary">' +
      '<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
      'GitHub</a>';
  }
  modalActions.innerHTML = linksHTML;
  modalActions.style.display = linksHTML ? '' : 'none';

  // Load image
  if (currentImages[currentIndex]) {
    lazyLoadImage(currentImages[currentIndex]).catch(function() {
      modalImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTIxMjJiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNDQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';
    });
  }

  // Show/hide carousel controls
  var controls = modal.querySelector('.carousel-controls');
  controls.style.display = currentImages.length > 1 ? 'flex' : 'none';

  // Animate open
  modal.classList.remove('hidden');
  requestAnimationFrame(function() {
    modal.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modal.classList.remove('active');
  setTimeout(function() {
    modal.classList.add('hidden');
  }, 300);
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn.ver-proyecto').forEach(function(btn, index) {
  btn.addEventListener('click', function() { abrirModal(index); });
});

// Carousel navigation
document.getElementById('prev-img').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  if (currentImages[currentIndex]) { lazyLoadImage(currentImages[currentIndex]); }
});

document.getElementById('next-img').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  if (currentImages[currentIndex]) { lazyLoadImage(currentImages[currentIndex]); }
});

// Close on overlay click
modal.querySelector('.modal-overlay').addEventListener('click', cerrarModal);

// Close on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    cerrarModal();
  }
});

// ===== VISOR DE IMAGEN CON ZOOM Y PAN =====
(function() {
  var viewer = document.getElementById('image-viewer');
  var viewerImg = document.getElementById('image-viewer-img');
  var viewerClose = viewer.querySelector('.image-viewer-close');
  var viewerHint = viewer.querySelector('.image-viewer-hint');

  var scale = 1;
  var panX = 0;
  var panY = 0;
  var isDragging = false;
  var startX = 0;
  var startY = 0;

  function updateTransform() {
    viewerImg.style.transform = 'scale(' + scale + ') translate(' + panX + 'px, ' + panY + 'px)';
  }

  function openViewer(src) {
    viewerImg.src = src;
    scale = 1;
    panX = 0;
    panY = 0;
    updateTransform();
    viewer.classList.add('active');
    viewerHint.classList.remove('hidden');
    setTimeout(function() { viewerHint.classList.add('hidden'); }, 3000);
  }

  function closeViewer() {
    viewer.classList.remove('active');
  }

  // Click en imagen del modal abre el visor
  modalImg.addEventListener('click', function() {
    if (modalImg.src && !modalImg.src.startsWith('data:')) {
      openViewer(modalImg.src);
    }
  });

  // Cerrar visor
  viewerClose.addEventListener('click', closeViewer);

  // Click fuera de la imagen cierra
  viewer.addEventListener('click', function(e) {
    if (e.target === viewer) closeViewer();
  });

  // ESC cierra el visor
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
      closeViewer();
      e.stopPropagation();
    }
  });

  // Zoom con rueda del ratón
  viewer.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.min(Math.max(0.5, scale + delta), 5);
    if (scale <= 1) { panX = 0; panY = 0; }
    updateTransform();
  }, { passive: false });

  // Pan con arrastre
  viewer.addEventListener('mousedown', function(e) {
    if (e.target === viewerClose) return;
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - panX * scale;
      startY = e.clientY - panY * scale;
      viewer.classList.add('dragging');
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    panX = (e.clientX - startX) / scale;
    panY = (e.clientY - startY) / scale;
    updateTransform();
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    viewer.classList.remove('dragging');
  });

  // Doble click para resetear zoom
  viewerImg.addEventListener('dblclick', function() {
    if (scale !== 1) {
      scale = 1; panX = 0; panY = 0;
    } else {
      scale = 2.5;
    }
    updateTransform();
  });
})();
