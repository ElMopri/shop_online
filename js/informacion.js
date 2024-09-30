const welcomeMessage = document.getElementById('welcome-message');

// Obtener el nombre de usuario de localStorage (suponiendo que lo guardaste al iniciar sesión)
const userName = localStorage.getItem('username') || 'Invitado'; // Nombre por defecto si no hay usuario

welcomeMessage.textContent = `Bienvenido: ${userName}`; // Mostrar el nombre del usuario

// Obtener los datos del pedido seleccionado
function getOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Obtener el ID del producto

    // Obtener el producto basado en el índice del carrito
    const product = cart[productId]; // Suponiendo que el carrito se está usando como array

    displayOrderDetails(product);
}

// Mostrar detalles del producto en el HTML
function displayOrderDetails(product) {
    const orderDetailsContainer = document.getElementById('order-details');
    orderDetailsContainer.innerHTML = ''; // Limpiar detalles anteriores

    if (product) {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${product.title} - $${product.price.toFixed(2)}</p>`;
        orderDetailsContainer.appendChild(itemDiv);
    } else {
        orderDetailsContainer.innerHTML = '<p>Producto no encontrado.</p>';
    }
}

// Cargar detalles del pedido y nombre de usuario al inicio
displayUsername();
getOrderDetails();

document.getElementById('logout-btn').addEventListener('click', function () {
    // Borrar el nombre de usuario al salir
    localStorage.removeItem('username');
    window.location.href = './index.html';
});