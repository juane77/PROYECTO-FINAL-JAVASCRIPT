class Enemigo {
    constructor(nombre, vida, ataque, defensa, nivel) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.nivel = nivel;
        this.inventario = new Inventario(5);
    }

    atacar() {
        const dañoTotal = this.inventario.armaEquipada ?
            this.inventario.armaEquipada.daño + Math.floor(Math.random() * this.nivel) :
            this.ataque + Math.floor(Math.random() * this.nivel);
        console.log(`${this.nombre} ataca y causa ${dañoTotal} puntos de daño.`);
        return dañoTotal;
    }

    recibirDaño(daño) {
        this.vida -= Math.max(daño - this.defensa, 0);
        this.vida = Math.max(this.vida, 0);
        console.log(`${this.nombre} ha recibido ${daño} puntos de daño. Vida restante: ${this.vida}`);
    }

    estaVivo() {
        return this.vida > 0;
    }

    mostrarEstado() {
        console.log("===== ESTADO DEL ENEMIGO =====");
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Nivel: ${this.nivel}`);
        console.log(`Vida: ${this.vida}`);
        console.log(`Ataque: ${this.ataque}`);
        console.log(`Defensa: ${this.defensa}`);
        this.inventario.mostrarInventario();
        console.log("================================");
    }
}






