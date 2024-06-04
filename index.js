
var nuevoH1 = document.createElement("h1");

nuevoH1.textContent = "R&B Indumentaria- Carrito de compras";

document.body.appendChild(nuevoH1);



document.addEventListener("DOMContentLoaded", function() {
    // Cargar el JSON de productos
    fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;

        const productosContainer = document.getElementById('productos-container');

        productos.forEach(producto => {
           
            const productoDiv = document.createElement('div');

            const nombreProducto = document.createElement('h2');
            nombreProducto.textContent = producto.nombre;

            const precioProducto = document.createElement('p');
            precioProducto.textContent = 'Precio: ' + producto.precio.toFixed(2) + '$';

        
            const botonCarrito = document.createElement('button');
            botonCarrito.textContent = 'Añadir al carrito';
            botonCarrito.addEventListener('click', function() {
                // Añadir el producto al carrito en el almacenamiento local
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                // Verificar si el producto ya está en el carrito
                const productoEnCarrito = carrito.find(item => item.id === producto.id);
                if (!productoEnCarrito) {
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }
            
                mostrarCarrito();
            });

            productoDiv.appendChild(nombreProducto);
            productoDiv.appendChild(precioProducto);
            productoDiv.appendChild(botonCarrito);

            productosContainer.appendChild(productoDiv);
        });

        
        mostrarCarrito();
    })
    .catch(error => console.error('Error al cargar los productos:', error));

   
    function mostrarCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        const totalContainer = document.getElementById('total-container');

        carritoContainer.innerHTML = ''; 

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        let total = 0; 

        
        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.textContent = producto.nombre;
            carritoContainer.appendChild(productoDiv);

           
            total += producto.precio;
        });

        totalContainer.textContent = 'Total: ' + total + '$';
    }
});