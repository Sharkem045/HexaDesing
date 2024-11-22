// Variables para manejar el estado del slider
let currentIndex = 0;
let data = {};

// Selección de elementos del DOM
const sliderImage = document.getElementById('slider-image');
const sliderTitle = document.getElementById('slider-title');
const sliderDescription = document.getElementById('slider-description');
const sliderUses = document.getElementById('slider-uses');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Función para cargar datos del JSON
async function cargarProyectos() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
    data = await response.json();
    mostrarProyecto(currentIndex); // Mostrar el primer proyecto
  } catch (error) {
    console.error(error);
  }
}

// Función para mostrar un proyecto basado en el índice
function mostrarProyecto(index) {
  // Ocultar contenido actual
  const sliderContent = document.querySelector('.slider-content');
  sliderContent.classList.remove('show');

  setTimeout(() => {
    // Actualizar contenido
    sliderImage.src = `/assets/works/project${index+1}.jpeg`;
    sliderTitle.textContent = data.project[index].name;
    sliderDescription.textContent = data.project[index].desc;
    sliderUses.textContent = data.project[index].use

    // Mostrar contenido con animación
    sliderContent.classList.add('show');
    console.log(index)
    modifyStyles(index);
  }, 500); // Tiempo de desvanecimiento
}

// Eventos para navegar entre los proyectos
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + data.project.length) % data.project.length;
  mostrarProyecto(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % data.project.length;
  mostrarProyecto(currentIndex);
});

// Cargar los proyectos al iniciar la página
cargarProyectos();

function modifyStyles(index) {
  if(index >= 2 && index <= 4) {
    sliderTitle.style.fontSize = '2rem';
  } else {
    sliderTitle.style.fontSize = '3.5rem';
  }
  index == 4 ? sliderImage.style.right = '-50px' : sliderImage.style.right = '0px' ; 
}
