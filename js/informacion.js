// Obtener el ID del carrito de la URL
const urlParams = new URLSearchParams(window.location.search);
const cartId = parseInt(urlParams.get('cartId'));

let carts = JSON.parse(localStorage.getItem('carts')) || [];
const cart = carts.find(c => c.id === cartId); // Buscar el carrito correspondiente

function displayCartInfo() {
    const cartInfo = document.getElementById('cart-info');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;

    if (!cart || cart.products.length === 0) {
        cartInfo.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
        totalAmount.textContent = '0.00';
        return;
    }

    // Crear un objeto para contar la cantidad de cada producto
    const productCounts = {};

    cart.products.forEach(product => {
        if (productCounts[product.id]) {
            productCounts[product.id].quantity += 1; // Incrementar la cantidad
        } else {
            productCounts[product.id] = {
                title: product.title,
                price: product.price,
                quantity: 1
            };
        }
    });

    // Mostrar productos en la tabla
    for (const id in productCounts) {
        const { title, price, quantity } = productCounts[id];
        const productTotal = price * quantity; // Total por producto
        total += productTotal; // Sumar al total general

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>$${price.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>$${productTotal.toFixed(2)}</td>
        `;
        cartInfo.appendChild(row);
    }

    totalAmount.textContent = total.toFixed(2); // Actualizar el total a pagar
}

// Evento para el botón de volver al carrito
document.getElementById('back-btn').addEventListener('click', function () {
    window.location.href = './carrito.html';
});

// Mostrar información del carrito al cargar la página
displayCartInfo();
