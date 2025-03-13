class Tienda {
    constructor() {
        this.inventario = [
            new Arma('Puñal', 10, 50),
            new Arma('Katana de fuego', 15, 75),
            new Arma('Hacha de ogro', 20, 100),
            new Arma('Lanza indú', 25, 125)
        ];
    }

    mostrarInventario() {
        console.log('Armas disponibles en la tienda:');
        this.inventario.forEach((arma, index) => {
            console.log(`${index + 1}. ${arma.nombre} - Ataque: ${arma.daño}, Precio: ${arma.precio}`);
        });
    }

    comprarArma(personaje) {
        this.mostrarInventario();
        const indiceArma = parseInt(prompt(`${personaje.nombre}, ¿qué arma te gustaría comprar? (introduce el número): `));

        if (isNaN(indiceArma) || indiceArma < 1 || indiceArma > this.inventario.length) {
            console.log('Índice de arma no válido.');
            return;
        }

        const armaSeleccionada = this.inventario[indiceArma - 1];

        if (personaje.dinero >= armaSeleccionada.precio) {
            personaje.dinero -= armaSeleccionada.precio;
            personaje.inventario.agregarObjeto(armaSeleccionada);
            console.log(`${personaje.nombre} ha comprado ${armaSeleccionada.nombre} por ${armaSeleccionada.precio} monedas.`);
        } else {
            console.log(`${personaje.nombre} no tiene suficiente dinero para comprar ${armaSeleccionada.nombre}.`);
        }
    }
}


