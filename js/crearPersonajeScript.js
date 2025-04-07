document.getElementById('formulario-personaje').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apariencia = document.getElementById('apariencia').value;
    const fuerza = parseInt(document.getElementById('fuerza').value);
    const defensa = parseInt(document.getElementById('destreza').value); // Cambiado a defensa
    const inteligencia = parseInt(document.getElementById('inteligencia').value);

    // Validar que la suma de las estadísticas sea exactamente 10
    const sumaEstadisticas = fuerza + defensa + inteligencia;
    if (sumaEstadisticas !== 10) {
        alert('La suma de Fuerza, Defensa e Inteligencia debe ser exactamente 10.');
        return;
    }

    // Crear una instancia de Personaje
    const personaje = new Personaje(nombre, 1, 1000, 100, fuerza, defensa, inteligencia, apariencia);
    personaje.guardarEstado();

    alert('¡Personaje creado con éxito!');
    window.location.href = 'lobby.html';
});
