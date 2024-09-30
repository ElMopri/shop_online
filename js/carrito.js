// Simulamos el carrito como un array global (puedes usar localStorage para persistencia)
let cart = [];

// Obtener el nombre del usuario
function getUsername() {
    return localStorage.getItem('username') || 'Usuario';
}

// Mostrar el nombre de usuario en la página
function displayUsername() {
    const username = getUsername();
    document.getElementById('username').textContent = username;
}

// Mostrar los productos en el carrito
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar productos anteriores

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">No hay productos en el carrito.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const itemRow = document.createElement('tr');
            itemRow.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="view-btn" data-id="${index}">ver</button></td>
            `;
            cartItemsContainer.appendChild(itemRow);
        });
    }
}

// Evento para redireccionar a informacion.html
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('view-btn')) {
        const productIndex = event.target.dataset.id;
        // Redirigir a informacion.html con el ID del producto
        window.location.href = `./informacion.html?id=${productIndex}`;
    }
});

// Inicializar la página de carrito
displayUsername();
displayCartItems();

document.getElementById('logout-btn').addEventListener('click', function () {
    // Borrar el nombre de usuario al salir
    localStorage.removeItem('username');
    window.location.href = './index.html';
});
