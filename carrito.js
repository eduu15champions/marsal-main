let carrito = [];
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
const btnVaciar = document.getElementById('vaciar-carrito');

// Función única para añadir productos
function AlCarrito(nombre, precio) {
    carrito.push({ 
        id: Date.now(),  // ID único
        nombre, 
        precio 
    });
    actualizarCarrito();
}

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        // Añadir botón de eliminar con data-id
        li.innerHTML = `
            ${item.nombre} - ${item.precio.toFixed(2)} € 
            <button class="eliminar" data-id="${item.id}">X</button>
        `;
        listaCarrito.appendChild(li);
        total += item.precio;
    });
    
    totalElemento.textContent = total.toFixed(2);
    
    // Añadir eventos a los nuevos botones
    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            carrito = carrito.filter(item => item.id !== id);
            actualizarCarrito();
        });
    });
}

// Vaciar carrito
btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});
