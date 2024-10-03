document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.querySelector('.productos-container');
    const categoriasContainer = document.querySelector('.categorias-container');

// Fetch para productos
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('producto-card');
            productCard.innerHTML = `
                <div class="producto-img-container">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
                <div class="producto-price-container">
                    <span class="producto-price">$${product.price}</span>
                    <button class="producto-add-btn">Add</button>
                </div>
            `;
            productosContainer.appendChild(productCard);
        });
    });

    // Fetch para categorías
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryBtn = document.createElement('button');
                categoryBtn.classList.add('categoria-btn');
                categoryBtn.textContent = category;
                categoriasContainer.appendChild(categoryBtn);

                // Evento para filtrar por categoría
                categoryBtn.addEventListener('click', () => {
                    fetch(`https://fakestoreapi.com/products/category/${category}`)
                        .then(res => res.json())
                        .then(filteredProducts => {
                            productosContainer.innerHTML = ''; // Limpiar productos actuales
                            filteredProducts.forEach(product => {
                                const productCard = document.createElement('div');
                                productCard.classList.add('producto-card');
                                productCard.innerHTML = `
                                    <img src="${product.image}" alt="${product.title}">
                                    <h3>${product.title}</h3>
                                    <p>${product.description}</p>
                                    <p class="producto-price">$${product.price}</p>
                                    <button class="producto-add-btn">Add</button>
                                `;
                                productosContainer.appendChild(productCard);
                            });
                        });
                });
            });
        });

    // Evento para búsqueda
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('search').value;
        fetch(`https://fakestoreapi.com/products/1?title=${searchTerm}`)
            .then(res => res.json())
            .then(filteredProducts => {
                productosContainer.innerHTML = ''; // Limpiar productos actuales
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('producto-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p class="producto-price">$${product.price}</p>
                        <button class="producto-add-btn">Add</button>
                    `;
                    productosContainer.appendChild(productCard);
                });
            });
    });
});
