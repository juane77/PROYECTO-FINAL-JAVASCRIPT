


// Crear instancias de las clases
const personaje = new Personaje('Héroe', 1, 100, 100, 10, 5);
const enemigo = new Enemigo('Ogro', 50, 8, 3, 1);
const tienda = new Tienda();

// Función principal para ejecutar la prueba
function probarJuego() {
    console.log("¡Bienvenido al juego de prueba!");

    // Mostrar estado inicial del personaje
    personaje.mostrarEstado();

    // Interacción con la tienda
    console.log("\n--- Visita a la Tienda ---");
    tienda.comprarArma(personaje);

    // Equipar el arma comprada
    const armaComprada = personaje.inventario.objetos[0];
    if (armaComprada) {
        personaje.inventario.equiparArma(armaComprada);
    }

    // Mostrar estado del personaje después de la compra
    personaje.mostrarEstado();

    // Iniciar combate
    console.log("\n--- Inicio del Combate ---");
    const combate = new Combate(personaje, enemigo);
    combate.iniciarCombate();
}

// Ejecutar la prueba
probarJuego();





// Crear una instancia de Personaje
const personajeOriginal = new Personaje('Héroe', 1, 100, 100, 10, 5);

// Modificar el estado del personaje
const arma = new Arma('Espada de Hierro', 10, 50);
personajeOriginal.inventario.agregarObjeto(arma);
personajeOriginal.inventario.equiparArma(arma);
personajeOriginal.vida = 80; // Cambiar la vida para probar

// Guardar el estado del personaje en localStorage
personajeOriginal.guardarEstado();
console.log("Estado guardado en localStorage.");

// Cargar el estado del personaje desde localStorage
const personajeCargado = Personaje.cargarEstado();

// Comprobar que el estado cargado es el mismo que el estado guardado
console.log("Estado cargado:");
if (personajeCargado) {
    personajeCargado.mostrarEstado();

    // Verificar que los atributos son iguales
    console.log("¿Es el mismo nombre?", personajeCargado.nombre === personajeOriginal.nombre);
    console.log("¿Es la misma vida?", personajeCargado.vida === personajeOriginal.vida);
    console.log("¿Es el mismo ataque?", personajeCargado.ataque === personajeOriginal.ataque);
    console.log("¿Es la misma defensa?", personajeCargado.defensa === personajeOriginal.defensa);
    console.log("¿Es el mismo inventario?", personajeCargado.inventario.objetos.length === personajeOriginal.inventario.objetos.length);
} else {
    console.log("No se pudo cargar el estado del personaje.");
}
