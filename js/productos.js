const API_URL = 'https://fakestoreapi.com/products';
let cart = [];

// Función para obtener productos por categoría
async function fetchProducts(category = "all") {
    try {
        let url = API_URL;
        if (category !== "all") {
            url += `/category/${category}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la carga de productos.');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los productos.");
    }
}

// Función para mostrar productos
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$ ${product.price.toFixed(2)}</p>
            <button class="add-btn" data-id="${product.id}">Add</button>
        `;
        productsContainer.appendChild(productCard);
    });

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function () {
            addToCart(this.dataset.id);
        });
    });
}

// Almacenar productos en el carrito
let cartId = 1; // Suponemos que hay un carrito por defecto con ID 1

// Función para agregar productos al carrito
function addToCart(productId) {
    fetch(`${API_URL}/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Cargar carritos existentes
            let carts = JSON.parse(localStorage.getItem('carts')) || [];
            // Buscar el carrito por ID
            let cart = carts.find(c => c.id === cartId);

            if (!cart) {
                // Si no existe, crear uno nuevo
                cart = { id: cartId, products: [] };
                carts.push(cart);
            }

            // Agregar el producto al carrito
            cart.products.push(product);
            localStorage.setItem('carts', JSON.stringify(carts)); // Guardar cambios en Local Storage

            updateCartCount();
            alert(`${product.title} ha sido añadido al carrito.`);
        });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const currentCart = carts.find(c => c.id === cartId);
    cartCount.textContent = currentCart ? currentCart.products.length : 0;
}

// Evento para el botón de carrito
document.getElementById('cart-btn').addEventListener('click', function () {
    window.location.href = './carrito.html';
});

// Evento para el botón de salir
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = './index.html';
});

// Eventos para el filtro de categorías
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        fetchProducts(category); // Llamar a fetchProducts con la categoría seleccionada
    });
});

// Cargar productos al inicio
fetchProducts();
