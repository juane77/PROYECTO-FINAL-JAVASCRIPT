document.addEventListener('DOMContentLoaded', function() {
    const personaje = Personaje.cargarEstado();

    if (personaje) {
        const characterImage = document.getElementById('character-image');
        characterImage.src = `../imagenes/${personaje.apariencia}.jpg`;

        document.getElementById('nombre').innerText = personaje.nombre;
        document.getElementById('fuerza').innerText = personaje.ataque;
        document.getElementById('destreza').innerText = personaje.defensa;
        document.getElementById('inteligencia').innerText = personaje.inteligencia;
    } else {
        console.error('Datos del personaje no encontrados.');
        alert('No se encontraron datos del personaje. Por favor, crea un nuevo personaje.');
    }
});
