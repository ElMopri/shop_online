// Ejecutar la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initPage);

// Función para determinar la página actual y ejecutar la función correspondiente
function initPage() {
    const path = window.location.pathname;

    // Ajuste para evitar problemas con la URL base de GitHub Pages
    const pageName = path.substring(path.lastIndexOf('/') + 1);

    // Inicializar según la página
    if (pageName === 'index.html' || pageName === '') {
        initLogin();
    } else if (pageName === 'productos.html') {
        initProductos();
    } else if (pageName === 'carrito.html') {
        initCarrito();
    } else if (pageName === 'informacion.html') {
        initInformacion();
    }
}

// Función para manejar el login en index.html
function initLogin() {
    const loginForm = document.getElementById('loginForm');

    // Verificar si el formulario existe en la página
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del formulario

            const fixedUsername = 'mor_2314';
            const fixedPassword = '83r5^_';

            // Obtener los valores ingresados por el usuario
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verificar si coinciden con los valores fijos
            if (username === fixedUsername && password === fixedPassword) {
                // Redirigir a productos.html si el inicio de sesión es exitoso
                window.location.href = './productos.html';
            } else {
                // Mostrar mensaje de error si las credenciales no son correctas
                alert('Usuario o contraseña incorrectos');
            }
        });
    }
}

// Función para manejar la página de productos
function initProductos() {
    const categoriasContainer = document.querySelector('.categorias-container');
    const productosContainer = document.querySelector('.productos-container');
    const carritoBtn = document.querySelector('.carrito-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const suggestionsList = document.createElement('ul');
    suggestionsList.classList.add('suggestions-list');
    searchInput.parentNode.appendChild(suggestionsList); // Añadimos la lista debajo del input de búsqueda

    let productos = []; // Variable para almacenar productos

    // Verificar si los botones existen en la página
    if (carritoBtn) {
        carritoBtn.addEventListener('click', function () {
            window.location.href = './carrito.html'; // Redirigir a carrito.html
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            window.location.href = './index.html'; // Redirigir a index.html
        });
    }

    if (categoriasContainer && productosContainer) {
        // Obtener y mostrar todas las categorías
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(categorias => {
                categorias.forEach(categoria => {
                    const categoriaBtn = document.createElement('button');
                    categoriaBtn.classList.add('categoria-btn');
                    categoriaBtn.textContent = capitalizeFirstLetter(categoria);
                    categoriaBtn.addEventListener('click', () => {
                        obtenerProductosPorCategoria(categoria); // Filtrar productos por categoría
                    });
                    categoriasContainer.appendChild(categoriaBtn);
                });
            })
            .catch(err => console.error('Error al cargar las categorías:', err));

        // Obtener y mostrar todos los productos
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                productos = data; // Almacenar productos
                mostrarProductos(productos); // Mostrar todos los productos
            })
            .catch(err => console.error('Error al cargar los productos:', err));
    }

    // Función para mostrar productos
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ''; // Limpiar el contenedor de productos
        productos.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');

            productoCard.innerHTML = `
                <div class="producto-img-container">
                    <img src="${producto.image}" alt="${producto.title}">
                </div>
                <h3>${producto.title}</h3>
                <div class="producto-price-container">
                    <p class="producto-price">$${producto.price.toFixed(2)}</p>
                    <button class="producto-add-btn">Add</button>
                </div>
            `;

            productosContainer.appendChild(productoCard);
        });
    }

    // Función para filtrar productos por categoría
    function obtenerProductosPorCategoria(categoria) {
        fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(res => res.json())
            .then(data => {
                productosContainer.innerHTML = ''; // Limpiar contenedor de productos
                mostrarProductos(data); // Mostrar productos filtrados
            })
            .catch(err => console.error('Error al cargar productos por categoría:', err));
    }

    // Función para obtener sugerencias de productos por nombre
    function obtenerSugerencias(query) {
        if (query.length === 0) {
            suggestionsList.innerHTML = ''; // Limpiar si no hay texto
            return;
        }

        const resultadosFiltrados = productos.filter(producto =>
            producto.title.toLowerCase().includes(query.toLowerCase()) // Filtrar por nombre
        );

        mostrarSugerencias(resultadosFiltrados);
    }

    // Función para mostrar sugerencias
    function mostrarSugerencias(sugerencias) {
        suggestionsList.innerHTML = ''; // Limpiar la lista de sugerencias
        if (sugerencias.length > 0) {
            sugerencias.forEach(sugerencia => {
                const suggestionItem = document.createElement('li');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = sugerencia.title; // Mostrar solo el título
                suggestionItem.addEventListener('click', () => {
                    // Autocompletar el input con el nombre del producto seleccionado
                    searchInput.value = sugerencia.title; // Autocompletar con el nombre
                    suggestionsList.innerHTML = ''; // Limpiar las sugerencias después de seleccionar
                });
                suggestionsList.appendChild(suggestionItem);
            });
        } else {
            suggestionsList.innerHTML = '<li>No hay sugerencias disponibles.</li>'; // Mensaje si no hay sugerencias
        }
    }

    // Evento de entrada en la barra de búsqueda
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        obtenerSugerencias(query); // Obtener sugerencias basadas en el nombre
    });

    // Evento al hacer clic en el botón de búsqueda
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const productoBuscado = productos.find(producto => producto.title.toLowerCase() === query.toLowerCase());

        if (productoBuscado) {
            fetch(`https://fakestoreapi.com/products/${productoBuscado.id}`) // Buscar por ID
                .then(res => {
                    if (!res.ok) throw new Error('Producto no encontrado');
                    return res.json();
                })
                .then(producto => {
                    productosContainer.innerHTML = ''; // Limpiar productos
                    mostrarProductos([producto]); // Mostrar el producto encontrado
                })
                .catch(err => alert(err.message)); // Mostrar mensaje de error
        } else {
            alert('Producto no encontrado'); // Mensaje si no se encuentra el producto
        }
    });
}

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Funcion para manejar la pagina de carrito
function initCarrito() {
    const carritoTableBody = document.querySelector('.carrito-table-body');
    const userNameElement = document.querySelector('.user-name');
    const productosBtn = document.querySelector('.productos-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    // Verificar si los botones existen en la página
    if (productosBtn) {
        productosBtn.addEventListener('click', function () {
            window.location.href = './productos.html'; // Redirigir a carrito.html
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            window.location.href = './index.html'; // Redirigir a index.html
        });
    }

    // Obtener la información del usuario 1
    fetch('https://fakestoreapi.com/users/1')
        .then(response => response.json())
        .then(user => {
            const { name: { firstname, lastname } } = user;
            userNameElement.textContent = `${firstname} ${lastname}`;
        })
        .catch(error => console.error('Error al cargar la información del usuario:', error));

    // Obtener los carritos del usuario 1
    fetch('https://fakestoreapi.com/carts/user/1')
        .then(response => response.json())
        .then(carts => {
            carts.forEach(cart => {
                const cartRow = document.createElement('tr');
                cartRow.innerHTML = `
                    <td>${cart.id}</td>
                    <td>${new Date(cart.date).toLocaleDateString()}</td>
                    <td><a class="ver-carrito-a" onclick="window.location.href='./informacion.html?cartId=${cart.id}'">Ver</a></td>
                `;
                carritoTableBody.appendChild(cartRow);
            });
        })
        .catch(error => console.error('Error al cargar los carritos:', error));
}

// Función para manejar la página de informacion
function initInformacion() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cartId = urlParams.get('cartId'); // Obtener cartId de la URL
    const userNameElement = document.querySelector('.user-name');
    const fechaInput = document.getElementById('fecha');
    const pedidoNumeroInput = document.getElementById('pedido-numero');
    const clienteInput = document.getElementById('cliente');
    const informacionTableBody = document.getElementById('informacion-table-body');
    const totalElement = document.getElementById('total');
    const productosBtn = document.querySelector('.productos-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const carritoBtn = document.querySelector('.carrito-btn');

    let total = 0;

    // Verificar si los botones existen en la página
    if (carritoBtn) {
        carritoBtn.addEventListener('click', function () {
            window.location.href = './carrito.html';
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            window.location.href = './index.html';
        });
    }
    if (productosBtn) {
        productosBtn.addEventListener('click', function () {
            window.location.href = './productos.html';
        });
    }

    // Obtener la información del carrito
    fetch(`https://fakestoreapi.com/carts/${cartId}`)
        .then(response => response.json())
        .then(cart => {
            // Mostrar fecha y número de pedido
            fechaInput.value = new Date(cart.date).toLocaleDateString();
            pedidoNumeroInput.value = cart.id;

            // Obtener la información del usuario
            fetch(`https://fakestoreapi.com/users/${cart.userId}`)
                .then(response => response.json())
                .then(user => {
                    const { name: { firstname, lastname } } = user;
                    clienteInput.value = `${firstname} ${lastname}`;

                    userNameElement.textContent = `${firstname} ${lastname}`;
                })
                .catch(error => console.error('Error al cargar el usuario:', error));

            // Obtener información de los productos del carrito
            cart.products.forEach(product => {
                fetch(`https://fakestoreapi.com/products/${product.productId}`)
                    .then(response => response.json())
                    .then(productData => {
                        const subtotal = product.quantity * productData.price;
                        total += subtotal;

                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${productData.title}</td>
                            <td>${product.quantity}</td>
                            <td>$${productData.price.toFixed(2)}</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        `;

                        informacionTableBody.appendChild(row);
                        totalElement.textContent = total.toFixed(2);
                    })
                    .catch(error => console.error('Error al cargar producto:', error));
            });
        })
        .catch(error => console.error('Error al cargar el carrito:', error));
}