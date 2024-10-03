// Función para manejar el login en index.html
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fixedUsername = 'mor_2314';
            const fixedPassword = '83r5^_';

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === fixedUsername && password === fixedPassword) {
                window.location.href = './productos.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }
}

// Función para manejar la página de productos
function initProductos() {
    const categoriasContainer = document.querySelector('.categorias-container');
    const productosContainer = document.querySelector('.productos-container');

    if (categoriasContainer && productosContainer) {
        // Obtener y mostrar las categorías
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(categorias => {
                categorias.forEach(categoria => {
                    const categoriaBtn = document.createElement('button');
                    categoriaBtn.classList.add('categoria-btn');
                    categoriaBtn.textContent = capitalizeFirstLetter(categoria);
                    categoriaBtn.addEventListener('click', () => {
                        obtenerProductosPorCategoria(categoria);
                    });
                    categoriasContainer.appendChild(categoriaBtn);
                });
            })
            .catch(err => console.error('Error al cargar las categorías:', err));

        // Obtener y mostrar todos los productos
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(productos => {
                mostrarProductos(productos);
            })
            .catch(err => console.error('Error al cargar los productos:', err));
    }

    // Función para obtener productos por categoría
    function obtenerProductosPorCategoria(categoria) {
        fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(res => res.json())
            .then(productos => {
                productosContainer.innerHTML = ''; // Limpiar los productos actuales
                mostrarProductos(productos);
            })
            .catch(err => console.error('Error al cargar productos por categoría:', err));
    }

// Función para mostrar productos
function mostrarProductos(productos) {
    productosContainer.innerHTML = ''; // Limpiar el contenedor de productos
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');

        productoCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <div class="producto-price-container">
                <p class="producto-price">$${producto.price.toFixed(2)}</p>
                <button class="producto-add-btn">Add</button>
            </div>
        `;

        productosContainer.appendChild(productoCard);
    });
}

    // Función para capitalizar la primera letra de una cadena
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Determinar qué inicialización ejecutar según la página
if (window.location.pathname.includes('index.html')) {
    initLogin();
} else if (window.location.pathname.includes('productos.html')) {
    initProductos();
}
