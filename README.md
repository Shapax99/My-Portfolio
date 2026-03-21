# My-Portfolio
Test my portfolio


# MODAL DETAILS
- **Layout**: El modal (max-width: 1100px) con un diseño de dos columnas (side-by-side):
- **Header**: Título con gradiente, badge de estado con color, fecha del proyecto
- **Carrousel**: Imágenes con navegación, contador "1 / 3", controles ocultos si solo hay 1 imagen
- **Descripción**: Texto descriptivo del proyecto con label DESCRIPCIÓN
- **Detalles Destacados**: Lista con bullets gradiente azul-púrpura (se oculta si no hay datos)
- **Tecnologías**: Tags/pills de cada tecnología usada
- **Enlaces**: Botones para "Ver Proyecto" y "GitHub" (se ocultan si no hay datos)

## Agregar datos al objeto "projectDetails" para cada proyecto, incluyendo el enlace al repositorio de GitHub y una descripción breve del proyecto
    links: {
    live: 'https://tu-proyecto.com',    // Botón "Ver Proyecto"
    github: 'https://github.com/...'     // Botón "GitHub"
    }

## Agregar imagenes a cada proyecto dentro del modal para mostrar un carrousel de imágenes. Asegúrate de que cada proyecto tenga al menos una imagen para mostrar
    const imageGroups = {
  0: ['img_project/1.png'],           // Project 0 - 1 image
  1: ['img/fondo2.jpg'],              // Project 1 - 1 image
  2: ['img/fondo2.jpg'],              // Project 2 - 1 image
  3: ['img/fondo2.jpg']               // Project 3 - 1 image
};

