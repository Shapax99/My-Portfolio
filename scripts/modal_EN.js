const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');

//Load images for each project modal, divided by group number
const imageGroups = {
  0: ['img_project/1.png'],
  1: ['img/fondo2.jpg'],
  2: ['img/fondo2.jpg'],
  3: ['img/fondo2.jpg']
};

//Title and description of each corresponding project modal by groups
const projectDetails = {
  0: {
    title: 'Matrix Calculator GUI',
    desc: 'Interactive Python application for matrix operations with intuitive Tkinter interface. Supports 1x1 to 5x5 matrices with addition and subtraction capabilities. Developed as a personal project to practice GUI in Python.'
  },
  1: {
    title: 'Billing System - Desktop App',
    desc: 'My first desktop application featuring a billing system developed in Python. Uses local HTTP connection for communication between components and allows saving and managing local data efficiently. Developed between January and February 2026.'
  },
  2: {
    title: 'Library System',
    desc: 'Mini web system for managing check-in and check-out records of a library. Uses React on the frontend, Node.js for the backend, and PostgreSQL as the database, connected through a local network. Developed in February 2026.'
  },
  3: {
    title: 'CyberManager - Desktop App',
    desc: 'Desktop application for comprehensive CyberCafe management. Handles inventory, earnings, equipment monitoring, and printing account tracking. Built with C#, .NET 8.0, XAML, SignalR, PostgreSQL, and SQLite. Project in development since March 2026.'
  }
};

let currentImages = [];
let currentIndex = 0;

// Función para lazy loading de imágenes
function lazyLoadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Añadir skeleton loading
    modalImg.classList.add('skeleton');
    modalImg.style.minHeight = '200px';
    
    img.onload = () => {
      modalImg.classList.remove('skeleton');
      modalImg.style.minHeight = 'auto';
      modalImg.src = src;
      modalImg.classList.add('animate-fade');
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

  modalTitulo.textContent = data.title;
  modalDesc.textContent = data.desc;
  
  // Usar lazy loading para las imágenes
  if (currentImages[currentIndex]) {
    lazyLoadImage(currentImages[currentIndex]).catch(() => {
      modalImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
    });
  }

  modal.classList.remove('hidden');
  modal.classList.add('animate-fade');
}

function cerrarModal() {
  modal.classList.add('hidden');
  modal.classList.remove('animate-fade');
}

document.querySelectorAll('.btn.ver-proyecto').forEach((btn, index) => {
  btn.addEventListener('click', () => abrirModal(index));
});

// Mejorar navegación del carrusel con lazy loading
document.getElementById('prev-img').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  if (currentImages[currentIndex]) {
    lazyLoadImage(currentImages[currentIndex]);
  }
});

document.getElementById('next-img').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  if (currentImages[currentIndex]) {
    lazyLoadImage(currentImages[currentIndex]);
  }
});

// Precargar la siguiente imagen
function preloadNextImage() {
  const nextIndex = (currentIndex + 1) % currentImages.length;
  if (currentImages[nextIndex]) {
    const img = new Image();
    img.src = currentImages[nextIndex];
  }
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    cerrarModal();
  }
});