const toggleBtn = document.getElementById('toggle-mode');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    toggleBtn.textContent = 'Modo Oscuro';
  } else {
    toggleBtn.textContent = 'Modo Claro';
  }
});

const btnHamburguesa = document.getElementById('menu-hamburguesa');
const navMenu = document.getElementById('nav-menu');

btnHamburguesa.addEventListener('click', () => {
  navMenu.classList.toggle('mostrar');
});