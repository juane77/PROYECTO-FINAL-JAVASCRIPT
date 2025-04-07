class Tienda {
    constructor() {
        this.inventario = [
            new Arma('Puñal', 10, 50),
            new Arma('Katana de fuego', 15, 75),
            new Arma('Hacha de ogro', 20, 100),
            new Arma('Lanza indú', 25, 125),
            new Arma('Espada de hielo', 30, 150),
            new Arma('Arco élfico', 35, 175)
        ];
    }

    mostrarInventario() {
        console.log('Armas disponibles en la tienda:');
        this.inventario.forEach((arma, index) => {
            console.log(`${index + 1}. ${arma.nombre} - Ataque: ${arma.daño}, Precio: ${arma.precio}`);
        });
    }

    comprarArma(personaje, indiceArma) {
        const armaSeleccionada = this.inventario[indiceArma];

        if (personaje.inventario.objetos.length >= personaje.inventario.capacidadMaxima) {
            console.log(personaje.inventario.objetos.length);
            console.log(personaje.inventario.capacidadMaxima);

            alert("No puedes comprar más armas. El inventario está lleno.");
            return false;
        }
        else if (personaje.dinero >= armaSeleccionada.precio) {
            personaje.dinero -= armaSeleccionada.precio;
            personaje.inventario.agregarObjeto(armaSeleccionada);
            console.log(`${personaje.nombre} ha comprado ${armaSeleccionada.nombre} por ${armaSeleccionada.precio} monedas.`);
            return true; // Indica que la compra fue exitosa
        } 
        else {
            console.log(`${personaje.nombre} no tiene suficiente dinero para comprar ${armaSeleccionada.nombre}.`);
            alert('No tienes suficiente dinero para comprar esta arma.');
            return false; // Indica que la compra no fue exitosa
        }
    }
}
