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