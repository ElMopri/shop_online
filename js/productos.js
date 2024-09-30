const API_URL = 'https://fakestoreapi.com/products';

// Almacenar productos en el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let allProducts = []; // Variable para almacenar todos los productos obtenidos

// Mostrar el nombre del usuario
function displayUsername() {
    const username = localStorage.getItem('username'); // Obtener el nombre del usuario
    if (username) {
        document.getElementById('user-name').textContent = username; // Actualizar el texto de bienvenida
    } else {
        document.getElementById('user-name').textContent = 'Usuario'; // Valor predeterminado si no hay nombre
    }
}

// Función para obtener productos
async function fetchProducts(category = "all") {
    let url = API_URL;
    if (category !== "all") {
        url += `/category/${category}`;
    }

    const response = await fetch(url);
    const products = await response.json();
    allProducts = products; // Guardamos todos los productos en esta variable
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
            cart.push(product); // Agregar el producto al carrito
            updateCartCount();
            // Puedes quitar el alert si ya no lo necesitas
            alert(`${product.title} ha sido añadido al carrito.`);
            displayCartItems(); // Actualizar la vista del carrito si es necesario
        });
}



// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperar el carrito del localStorage
    cartCount.textContent = cart.length; // Actualizar el contador
}

// Cargar productos al inicio y actualizar el contador
fetchProducts();
updateCartCount(); // Asegúrate de que esto esté aquí


// Filtrar productos por categoría
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        fetchProducts(category);
    });
});

// Función de búsqueda
document.getElementById('search-btn').addEventListener('click', function () {
    const searchQuery = document.getElementById('search').value.toLowerCase();

    // Filtrar los productos ya cargados
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
    );
    
    // Mostrar los productos filtrados
    displayProducts(filteredProducts);
});

// Redirigir a carrito
document.getElementById('cart-btn').addEventListener('click', function () {
    window.location.href = './carrito.html';
});

// Mostrar el nombre del usuario al cargar la página
displayUsername();

// Cargar productos al inicio
fetchProducts();

// Botón de salida
document.getElementById('logout-btn').addEventListener('click', function () {
    // Borrar el nombre de usuario al salir
    localStorage.removeItem('username');
    window.location.href = './index.html';
});
