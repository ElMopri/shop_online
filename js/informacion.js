// Obtener el ID del carrito de la URL
const urlParams = new URLSearchParams(window.location.search);
const cartId = parseInt(urlParams.get('cartId'));

let carts = JSON.parse(localStorage.getItem('carts')) || [];
const cart = carts.find(c => c.id === cartId); // Buscar el carrito correspondiente

function displayCartInfo() {
    const cartInfo = document.getElementById('cart-info');

    if (!cart || cart.products.length === 0) {
        cartInfo.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    cart.products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
        `;
        cartInfo.appendChild(productDiv);
    });
}

// Evento para el botón de volver al carrito
document.getElementById('back-btn').addEventListener('click', function () {
    window.location.href = './carrito.html';
});

// Mostrar información del carrito al cargar la página
displayCartInfo();
