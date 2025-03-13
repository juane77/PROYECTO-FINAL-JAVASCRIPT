class Arma{

    constructor(nombre,daño,precio){
        this.nombre = nombre;
        this.daño = daño;
        this.precio = precio;
    }
    mostrarDetalles() {
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Ataque: ${this.daño}`);
        console.log(`Precio: ${this.precio}`);
    }
}