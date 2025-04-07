document.addEventListener('DOMContentLoaded', function () {
    const formularioPersonaje = document.getElementById('formulario-personaje');
    if (formularioPersonaje) {
        formularioPersonaje.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apariencia = document.getElementById('apariencia').value;
            const fuerza = parseInt(document.getElementById('fuerza').value);
            const destreza = parseInt(document.getElementById('destreza').value);
            const inteligencia = parseInt(document.getElementById('inteligencia').value);
            const arma = document.getElementById('arma').value;

            const totalEstadisticas = fuerza + destreza + inteligencia;

            if (totalEstadisticas !== 10) {
                alert('Debes distribuir exactamente 10 puntos entre las estadísticas.');
                return;
            }

            const personaje = new Personaje(nombre, 1, 100, 100, fuerza, destreza, inteligencia, apariencia);
            const armaSeleccionada = new Arma(arma, 5, 0);
            personaje.inventario.agregarObjeto(armaSeleccionada);
            personaje.inventario.equiparArma(armaSeleccionada);

            personaje.guardarEstado();
            alert('Personaje creado y guardado correctamente.');
            window.location.href = 'lobby.html';
        });
    }

    const botonEliminarDatos = document.getElementById('eliminar-datos');
    if (botonEliminarDatos) {
        botonEliminarDatos.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que deseas eliminar todos los datos guardados?')) {
                localStorage.clear();
                alert('Datos eliminados correctamente.');
            }
        });
    }

    const botonContinuarPartida = document.getElementById('continuar-partida');
    if (botonContinuarPartida) {
        botonContinuarPartida.addEventListener('click', function () {
            const partidaGuardada = localStorage.getItem('ultimaPartida');
            if (partidaGuardada) {
                window.location.href = 'lobby.html';
            } else {
                alert('No hay ninguna partida guardada para continuar.');
            }
        });
    }

    const botonNuevaPartida = document.querySelector('a[href="crear_personaje.html"]');
    if (botonNuevaPartida) {
        botonNuevaPartida.addEventListener('click', function (event) {
            const partidaGuardada = localStorage.getItem('ultimaPartida');
            if (partidaGuardada) {
                event.preventDefault();
                if (confirm('Ya tienes una partida guardada. ¿Deseas eliminar la partida anterior y comenzar una nueva?')) {
                    localStorage.removeItem('ultimaPartida');
                    window.location.href = 'crear_personaje.html';
                } else {
                    alert('Por favor, continúa con la partida actual o elimínala primero.');
                }
            }
        });
    }
});
