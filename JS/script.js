document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. TEMA Y NAVEGACIÓN (Modo Claro / Menú)
    // ==========================================
    const toggleBtn = document.getElementById('toggle-mode');
    const navMenu = document.getElementById('nav-menu');
    const btnHamburguesa = document.getElementById('menu-hamburguesa');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // Usamos un operador ternario (un if/else en una sola línea)
            toggleBtn.textContent = document.body.classList.contains('light-mode') ? 'Modo Oscuro' : 'Modo Claro';
        });
    }

    if (btnHamburguesa && navMenu) {
        btnHamburguesa.addEventListener('click', () => navMenu.classList.toggle('mostrar'));
    }

    // ==========================================
    // 2. LÓGICA DEL CARRITO Y LOCAL STORAGE
    // ==========================================
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const guardarCarrito = () => localStorage.setItem('carrito', JSON.stringify(carrito));

    const actualizarContador = () => {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        document.querySelectorAll('#cart-count').forEach(c => c.textContent = totalItems);
    };

    // Agregar productos al carrito (Usando dataset para leer los data-*)
    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            // "Desestructuramos" los datos del elemento HTML
            let { nombre, precio, img } = e.target.dataset; 
            precio = parseFloat(precio);

            const producto = carrito.find(item => item.nombre === nombre);
            producto ? producto.cantidad++ : carrito.push({ nombre, precio, img, cantidad: 1 });

            guardarCarrito();
            actualizarContador();
            alert(`¡${nombre} agregado al carrito!`);
        });
    });

    // Renderizar la página "Mi Carrito"
    const contenedorCarrito = document.getElementById('carrito-items');
    const totalPagar = document.getElementById('total-pagar');

    if (contenedorCarrito) {
        const renderizarCarrito = () => {
            if (!carrito.length) {
                contenedorCarrito.innerHTML = '<p>Tu carrito está vacío. ¡Ve al catálogo a buscar prendas!</p>';
                totalPagar.textContent = '$0';
                return;
            }

            let html = '';
            let total = 0;

            // En lugar de crear elementos uno por uno, armamos un gran texto HTML (es más rápido)
            carrito.forEach((prod, i) => {
                total += prod.precio * prod.cantidad;
                html += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <img src="${prod.img}" alt="${prod.nombre}">
                            <div>
                                <h4>${prod.nombre}</h4>
                                <p>$${prod.precio.toLocaleString('es-AR')} x ${prod.cantidad}</p>
                            </div>
                        </div>
                        <button class="btn-eliminar" data-index="${i}">X</button>
                    </div>`;
            });

            contenedorCarrito.innerHTML = html;
            totalPagar.textContent = `$${total.toLocaleString('es-AR')}`;
        };

        // Delegación de eventos: Un solo escuchador para todos los botones "X"
        contenedorCarrito.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-eliminar')) {
                carrito.splice(e.target.dataset.index, 1);
                guardarCarrito();
                renderizarCarrito();
                actualizarContador();
            }
        });

        renderizarCarrito();
    }

    actualizarContador(); // Ejecutar al cargar cualquier página

    // ==========================================
    // 3. VALIDACIÓN DEL FORMULARIO DE PAGO
    // ==========================================
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let esValido = true;
            const campos = form.querySelectorAll("input[required], select[required]");

            campos.forEach((campo) => {
                const errorMsg = campo.nextElementSibling; // Agarra el <span class="error-msg"> que está justo abajo
                
                // Lógica de validación condensada
                const estaVacio = !campo.value.trim();
                const esCheckboxInvalido = campo.type === "checkbox" && !campo.checked;
                const esTarjetaInvalida = campo.id === "tarjeta" && campo.value.trim().length !== 16;
                
                const invalido = estaVacio || esCheckboxInvalido || esTarjetaInvalida;

                // classList.toggle permite forzar agregar o quitar la clase según el booleano 'invalido'
                campo.classList.toggle("invalid", invalido);
                campo.classList.toggle("valid", !invalido);
                if (errorMsg) errorMsg.style.display = invalido ? "block" : "none";
                
                if (invalido) esValido = false;
            });

            if (esValido) {
                alert("¡Pedido realizado con éxito!");
                form.reset();
                campos.forEach(c => c.classList.remove("valid", "invalid"));
                
                // Opcional: Si el pedido se hizo con éxito, vaciamos el carrito
                carrito = [];
                guardarCarrito();
                renderizarCarrito();
                actualizarContador();
            }
        });
    }
});