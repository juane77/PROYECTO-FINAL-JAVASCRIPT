document.addEventListener('DOMContentLoaded', function() {
    const personaje = Personaje.cargarEstado();
    const inventarioLista = document.getElementById('inventario-lista');
    const armaEquipadaDisplay = document.getElementById('arma-equipada');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    let scrollAmount = 0;

    function formatearNombreParaImagen(nombre) {
        return nombre.toLowerCase().replace(/\s+/g, '_');
    }

    function mostrarInventario() {
        inventarioLista.innerHTML = '';
        personaje.inventario.objetos.forEach((objeto, index) => {
            const armaBox = document.createElement('div');
            armaBox.className = 'arma-box';
            const imagenArma = `../imagenes/${formatearNombreParaImagen(objeto.nombre)}.jpg`;
            armaBox.innerHTML = `
                <img src="${imagenArma}" alt="${objeto.nombre}" onerror="this.src='../imagenes/default.jpg'">
                <h2>${objeto.nombre}</h2>
                <ul class="estadisticas">
                    <li>Daño: ${objeto.daño}</li>
                    <li>Precio: ${objeto.precio}</li>
                </ul>
                <button class="equipar-boton" onclick="equiparArma(${index})">Equipar</button>
                <button class="eliminar-boton" onclick="eliminarObjeto(${index})">Eliminar</button>
            `;
            inventarioLista.appendChild(armaBox);
        });

        if (personaje.inventario.armaEquipada) {
            armaEquipadaDisplay.innerText = `Arma equipada: ${personaje.inventario.armaEquipada.nombre}`;
        } else {
            armaEquipadaDisplay.innerText = 'Arma equipada: Ninguna';
        }
    }

    leftButton.addEventListener('click', function() {
        scrollAmount += 190; // Ajusta este valor según el ancho de .arma-box más el margen
        inventarioLista.style.transform = `translateX(${scrollAmount}px)`;
    });

    rightButton.addEventListener('click', function() {
        scrollAmount -= 190; // Ajusta este valor según el ancho de .arma-box más el margen
        inventarioLista.style.transform = `translateX(${scrollAmount}px)`;
    });

    window.eliminarObjeto = function(index) {
        const objeto = personaje.inventario.objetos[index];
        personaje.inventario.eliminarObjeto(objeto);
        if (personaje.inventario.armaEquipada === objeto) {
            personaje.inventario.armaEquipada = null;
        }
        personaje.guardarEstado();
        mostrarInventario();
    };

    window.equiparArma = function(index) {
        const arma = personaje.inventario.objetos[index];
        if (arma) {
            personaje.inventario.equiparArma(arma);
            personaje.guardarEstado();
            mostrarInventario();
        } else {
            console.error("Arma no encontrada en el inventario.");
        }
    };

    window.comprarArma = function(arma) {
        if (personaje.inventario.objetos.length >= personaje.inventario.capacidadMaxima) {
            alert("No puedes comprar más armas. El inventario está lleno.");
        } else {
            personaje.inventario.agregarObjeto(arma);
            personaje.guardarEstado();
            mostrarInventario();
        }
    };

    mostrarInventario();
});
