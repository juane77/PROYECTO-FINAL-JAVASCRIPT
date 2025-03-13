class Inventario {
    constructor(capacidadMaxima) {
        this.capacidadMaxima = capacidadMaxima;
        this.objetos = [];
        this.armaEquipada = null;
    }

    agregarObjeto(objeto) {
        if (this.objetos.length < this.capacidadMaxima) {
            this.objetos.push(objeto);
            console.log(`${objeto.nombre} añadido al inventario.`);
        } else {
            console.log("Inventario lleno, no puedes añadir más objetos.");
        }
    }

    eliminarObjeto(objeto) {
        const index = this.objetos.indexOf(objeto);
        if (index !== -1) {
            this.objetos.splice(index, 1);
            console.log(`${objeto.nombre} eliminado del inventario.`);
        } else {
            console.log(`${objeto.nombre} no está en el inventario.`);
        }
    }

    equiparArma(arma) {
        if (this.objetos.includes(arma)) {
            this.armaEquipada = arma;
            console.log(`${arma.nombre} equipada.`);
        } else {
            console.log(`No tienes ${arma.nombre} en el inventario.`);
        }
    }

    mostrarInventario() {
        console.log("Inventario:", this.objetos.map(obj => obj.nombre).join(", "));
        console.log("Arma equipada:", this.armaEquipada ? this.armaEquipada.nombre : "Ninguna");
    }
}

