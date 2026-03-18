const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');

//Cargar imagenes para los modales de cada proyecto, divididos por numero de grupo 
const imageGroups = {
  0: ['img_project/1.png'],
  1: ['img/fondo2.jpg'],
  2: ['img/fondo2.jpg'],
  3: ['img/fondo2.jpg']
};

//Titulo y descripcion de cada modal de proyecto correspondinte por grupos
const projectDetails = {
  0: {
    title: 'Calculadora de Matrices GUI',
    desc: 'Aplicacion interactiva de Python para operaciones de matrices con interfaz intuitiva de Tkinter. Soporta matrices de 1x1 a 5x5 con capacidades de suma y resta. Desarrollada como proyecto personal para practicar GUI en Python.'
  },
  1: {
    title: 'Sistema de Cobros - App de Escritorio',
    desc: 'Mi primera aplicacion de escritorio con un sistema de cobros desarrollado en Python. Utiliza conexion local HTTP para la comunicacion entre componentes y permite guardar y manejar datos locales de forma eficiente. Desarrollado entre enero y febrero de 2026.'
  },
  2: {
    title: 'Sistema de Biblioteca',
    desc: 'Mini sistema web para manejar registros de entrada y salida de una biblioteca. Utiliza React en el frontend, Node.js para el backend y PostgreSQL como base de datos, conectada mediante red local. Desarrollado en febrero de 2026.'
  },
  3: {
    title: 'CyberManager - App de Escritorio',
    desc: 'Aplicacion de escritorio para la gestion integral de un CyberCafe. Permite manejar inventario, ganancias, monitorear equipos y llevar cuentas con impresiones. Desarrollada con C#, .NET 8.0, XAML, SignalR, PostgreSQL y SQLite. Proyecto en desarrollo desde marzo de 2026.'
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
      modalImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
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

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    cerrarModal();
  }
});