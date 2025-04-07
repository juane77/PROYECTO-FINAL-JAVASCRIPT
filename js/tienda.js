document.addEventListener('DOMContentLoaded', function() {
    const personaje = Personaje.cargarEstado();
    const tienda = new Tienda();

    function mostrarArmas(armas) {
        const armasLista = document.getElementById('armas-lista');
        armasLista.innerHTML = '';
        armas.forEach((arma, index) => {
            const armaDiv = document.createElement('div');
            armaDiv.className = 'arma-item';
            armaDiv.innerHTML = `
                <div class="arma-nombre" onclick="mostrarImagenArma('${arma.nombre}', '../imagenes/${arma.nombre.toLowerCase().replace(/ /g, '_')}.jpg')">${arma.nombre}</div>
                <div class="arma-precio">Precio: ${arma.precio}</div>
                <div class="arma-estadisticas">Daño: ${arma.daño}</div>
                <button class="comprar-boton" onclick="comprarArma(${index})" id="comprar-boton-${index}">Comprar</button>
            `;
            armasLista.appendChild(armaDiv);
        });

        // Cargar el estado de las armas compradas para el personaje actual
        cargarEstadoArmasCompradas(personaje.nombre);
    }

    window.comprarArma = function(indiceArma) {
        const boton = document.getElementById(`comprar-boton-${indiceArma}`);
        debugger;
        if (tienda.comprarArma(personaje, indiceArma)) {
            boton.innerText = 'Comprado';
            boton.disabled = true;
            boton.style.background = '#888';
            boton.style.cursor = 'default';
            mostrarConfirmacionCompra(tienda.inventario[indiceArma]);
            guardarEstadoArmasCompradas(personaje.nombre, indiceArma);
        } 
        personaje.guardarEstado();
    };

    window.mostrarImagenArma = function(nombreArma, imagenSrc) {
        const imagenArma = document.getElementById('imagen-arma');
        imagenArma.src = imagenSrc; // Asegúrate de que la ruta sea correcta
        imagenArma.style.display = 'block';
        imagenArma.alt = nombreArma;
    };

    window.mostrarConfirmacionCompra = function(arma) {
        const confirmacion = document.createElement('div');
        confirmacion.className = 'confirmacion-compra';
        confirmacion.innerHTML = `
            <img src="../imagenes/${arma.nombre.toLowerCase().replace(/ /g, '_')}.jpg" alt="${arma.nombre}">
            <p>¡Has comprado ${arma.nombre}!</p>
            <button class="cerrar-boton" onclick="cerrarConfirmacionCompra()">Cerrar</button>
        `;
        document.body.appendChild(confirmacion);
    };

    window.cerrarConfirmacionCompra = function() {
        const confirmacion = document.querySelector('.confirmacion-compra');
        if (confirmacion) {
            confirmacion.remove();
        }
    };

    window.mostrarMensajeError = function(mensaje) {
        alert(mensaje);
    };

    function cargarEstadoArmasCompradas(nombrePersonaje) {
        const armasCompradas = JSON.parse(localStorage.getItem(`armasCompradas_${nombrePersonaje}`)) || [];
        armasCompradas.forEach(indice => {
            const boton = document.getElementById(`comprar-boton-${indice}`);
            if (boton) {
                boton.innerText = 'Comprado';
                boton.disabled = true;
                boton.style.background = '#888';
                boton.style.cursor = 'default';
            }
        });
    }

    function guardarEstadoArmasCompradas(nombrePersonaje, indiceArma) {
        const armasCompradas = JSON.parse(localStorage.getItem(`armasCompradas_${nombrePersonaje}`)) || [];
        if (!armasCompradas.includes(indiceArma)) {
            armasCompradas.push(indiceArma);
            localStorage.setItem(`armasCompradas_${nombrePersonaje}`, JSON.stringify(armasCompradas));
        }
    }

    mostrarArmas(tienda.inventario);
});
