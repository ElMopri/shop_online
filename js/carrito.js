// Simulación de pedidos del usuario
const orders = [
    { id: 12, date: '24/06/2022' },
    { id: 1, date: '21/06/2022' },
    { id: 3, date: '21/06/2022' }
];

// Cargar los pedidos en la tabla
function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = ''; // Limpiar contenido previo

    orders.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td><a href="./informacion.html?id=${order.id}" class="ver-link">ver</a></td>
        `;

        ordersList.appendChild(row);
    });
}

// Cargar los pedidos al cargar la página
document.addEventListener('DOMContentLoaded', loadOrders);

// Redirigir a la página de inicio de sesión al salir
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = './index.html';
});
