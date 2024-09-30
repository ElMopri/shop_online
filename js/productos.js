const API_URL = 'https://fakestoreapi.com/products';

// Almacenar productos en el carrito
let cart = [];

// Función para obtener productos
async function fetchProducts(category = "all") {
    let url = API_URL;
    if (category !== "all") {
        url += `/category/${category}`;
    }

    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
}

// Función para mostrar productos en el contenedor
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Limpiar productos anteriores

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

    // Agregar eventos a los botones "Add"
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function () {
            addToCart(this.dataset.id);
        });
    });
}

// Función para agregar productos al carrito
function addToCart(productId) {
    fetch(`${API_URL}/${productId}`)
        .then(response => response.json())
        .then(product => {
            cart.push(product);
            updateCartCount();
            alert(`${product.title} ha sido añadido al carrito.`);
        });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Filtrar productos por categoría
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        fetchProducts(category);
    });
});

// Búsqueda de productos
document.getElementById('search-btn').addEventListener('click', function () {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    fetch(API_URL)
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchQuery)
            );
            displayProducts(filteredProducts);
        });
});

// Cargar productos al inicio
fetchProducts();

// Botón de salida
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});
