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
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar
    let esValido = true;

    // Obtener todos los inputs y selects requeridos
    const camposRequeridos = form.querySelectorAll("input[required], select[required]");

    camposRequeridos.forEach((campo) => {
      const errorMsg = campo.parentElement.querySelector(".error-msg");

      // Validación para checkboxes
      if (campo.type === "checkbox") {
        if (!campo.checked) {
          marcarInvalido(campo, errorMsg);
          esValido = false;
        } else {
          marcarValido(campo, errorMsg);
        }
        return;
      }

      // Validación para inputs de texto, email, date, select, etc.
      if (!campo.value.trim()) {
        marcarInvalido(campo, errorMsg);
        esValido = false;
      } else {
        // Validaciones específicas opcionales
        if (campo.id === "tarjeta" && campo.value.trim().length !== 16) {
          marcarInvalido(campo, errorMsg);
          esValido = false;
        } else {
          marcarValido(campo, errorMsg);
        }
      }
    });

    if (esValido) {
      alert("¡Pedido realizado con éxito!");
      form.reset();
      // Limpiar clases de validación tras reiniciar
      camposRequeridos.forEach((campo) => {
        campo.classList.remove("valid", "invalid");
      });
    }
  });

  function marcarInvalido(campo, errorMsg) {
    campo.classList.add("invalid");
    campo.classList.remove("valid");
    if (errorMsg) errorMsg.style.display = "block";
  }

  function marcarValido(campo, errorMsg) {
    campo.classList.add("valid");
    campo.classList.remove("invalid");
    if (errorMsg) errorMsg.style.display = "none";
  }
});
