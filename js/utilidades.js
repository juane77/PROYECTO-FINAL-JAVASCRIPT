let combate;
let turnoJugador = true; // Indica si es el turno del jugador

document.addEventListener('DOMContentLoaded', function() {
    const personaje = Personaje.cargarEstado();
    if (personaje) {
        personaje.vida = 100; // Asegurar que la vida inicial sea 100
        personaje.vidaMaxima = 100; // Asegurar que la vida máxima inicial sea 100
    } else {
        console.error('No se encontró estado guardado.');
        alert('No se encontraron datos del personaje. Por favor, crea un nuevo personaje.');
    }

    const enemigo = generarEnemigoAleatorio();

    // Cargar imágenes desde la carpeta de imágenes
    cargarImagenPersonaje(personaje.apariencia, 'personaje-imagen');
    cargarImagenEnemigo(enemigo.nombre);

    // Inicializar el objeto combate
    combate = new Combate(personaje, enemigo);
    combate.mostrarEstado();

    // Añadir evento al botón de volver al lobby
    document.getElementById('volver-lobby').addEventListener('click', function() {
        window.location.href = 'lobby.html'; // Redirige al lobby
    });
});

function turnoPersonaje(accion) {
    if (turnoJugador) {
        combate.turnoPersonaje(accion);
        if (combate.personaje.estaVivo() && combate.enemigo.estaVivo()) {
            turnoEnemigo();
        } else {
            mostrarResultadoFinal();
        }
    }
}

function turnoEnemigo() {
    turnoJugador = false;
    setTimeout(() => {
        const accionEnemigo = decidirAccionEnemigo();
        combate.turnoEnemigo(accionEnemigo);
        if (combate.personaje.estaVivo() && combate.enemigo.estaVivo()) {
            turnoJugador = true;
        } else {
            mostrarResultadoFinal();
        }
    }, 1000); // Pequeño retraso para simular el turno del enemigo
}

function decidirAccionEnemigo() {
    if (combate.enemigo.vida < combate.enemigo.vidaMaxima / 2) {
        return 'defender';
    } else {
        return 'atacar';
    }
}

function cargarImagenPersonaje(apariencia, idElemento) {
    const imagen = `../imagenes/${apariencia.toLowerCase()}.jpg`;
    document.getElementById(idElemento).src = imagen;
}

function cargarImagenEnemigo(apariencia) {
    const imagen = `../imagenes/${apariencia.toLowerCase()}.jpg`;
    document.getElementById('enemigo-imagen').src = imagen;
}

function generarEnemigoAleatorio() {
    const nombres = ['batman', 'harley', 'alien', 'ninja'];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const vida = Math.floor(Math.random() * 100) + 50;
    const ataque = Math.floor(Math.random() * 20) + 10;
    const defensa = Math.floor(Math.random() * 10) + 5;
    const nivel = Math.floor(Math.random() * 5) + 1;
    return new Enemigo(nombre, vida, ataque, defensa, nivel);
}

function mostrarResultadoFinal() {
    const resultadoDiv = document.getElementById('combate-resultado');
    const volverLobbyContainer = document.getElementById('volver-lobby-container');
    let mensaje = '';

    if (combate.personaje.estaVivo()) {
        mensaje = `¡Has ganado! ${combate.enemigo.nombre} ha sido derrotado.`;
        actualizarEstadisticas(true);
    } else {
        mensaje = `¡Has perdido! ${combate.personaje.nombre} ha sido derrotado.`;
        actualizarEstadisticas(false);
    }

    resultadoDiv.innerHTML = mensaje; // Mostrar mensaje de resultado
    volverLobbyContainer.style.display = 'block'; // Mostrar botón de volver al lobby
}

function actualizarEstadisticas(victoria) {
    if (victoria) {
        combate.personaje.experiencia += 10;
        combate.personaje.dinero += 40;

        // Incrementar nivel si se alcanza cierta experiencia
        while (combate.personaje.experiencia >= 100) {
            combate.personaje.nivel += 1;
            combate.personaje.experiencia -= 100;
            combate.personaje.ataque += 5;
            combate.personaje.vidaMaxima += 10;
            combate.personaje.defensa += 2;
            combate.personaje.vida = combate.personaje.vidaMaxima;
        }

        combate.mostrarEstado();
    }
}
