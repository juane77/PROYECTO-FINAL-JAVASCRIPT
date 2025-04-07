class Enemigo {
    constructor(nombre, vida, ataque, defensa, nivel) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMaxima = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.nivel = nivel;
        this.inventario = new Inventario(5);
    }

    atacar() {
        return this.ataque;
    }

    defender() {
        this.vida += this.defensa;
        this.vida = Math.min(this.vida, this.vidaMaxima);
        console.log(`${this.nombre} se está defendiendo y gana ${this.defensa} puntos de vida.`);
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
