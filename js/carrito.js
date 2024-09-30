let carts = JSON.parse(localStorage.getItem('carts')) || [];

// Asegúrate de que al menos un carrito esté presente
if (carts.length === 0) {
    carts.push({ id: 1, products: [] }); // Crear un carrito por defecto
    localStorage.setItem('carts', JSON.stringify(carts));
}

// Función para mostrar carritos
function displayCarts() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Limpiar contenido anterior

    carts.forEach(cart => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cart.id}</td>
            <td>${cart.products.length}</td>
            <td>
                <button class="view-btn" data-id="${cart.id}">Ver</button>
            </td>
        `;
        cartBody.appendChild(row);
    });

    // Agregar eventos a los botones de ver
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function () {
            const cartId = this.dataset.id;
            window.location.href = `./informacion.html?cartId=${cartId}`;
        });
    });
}

// Evento para el botón de volver a productos
document.getElementById('products-btn').addEventListener('click', function () {
    window.location.href = './productos.html';
});

// Evento para el botón de salir
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = './index.html';
});

// Mostrar carritos al cargar la página
displayCarts();

