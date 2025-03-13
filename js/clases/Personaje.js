class Personaje {
    constructor(nombre, nivel, dinero, vida, ataque, defensa) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.dinero = dinero;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.inventario = new Inventario(10);
        this.experiencia = 0;
        this.defendiendo = false;
    }

    atacar() {
        const dañoTotal = this.inventario.armaEquipada ?
            this.inventario.armaEquipada.daño + Math.floor(Math.random() * this.nivel) :
            this.ataque + Math.floor(Math.random() * this.nivel);
        console.log(`${this.nombre} ataca y causa ${dañoTotal} puntos de daño.`);
        return dañoTotal;
    }

    defender() {
        this.defendiendo = true;
        this.vida += this.defensa;
        console.log(`${this.nombre} se está defendiendo y gana ${this.defensa} puntos de vida.`);
    }

    usarObjeto() {
        if (this.inventario.armaEquipada) {
            const dañoExtra = 5;
            const defensaReducida = 2;
            this.ataque += dañoExtra;
            this.defensa = Math.max(this.defensa - defensaReducida, 0);
            console.log(`${this.nombre} usa su arma, incrementando su ataque y reduciendo su defensa.`);
            console.log(`${this.nombre} causa ${this.ataque} puntos de daño.`);

        } else {
            console.log(`${this.nombre} no tiene un arma equipada para usar.`);
        }
    }

    recibirDaño(daño) {
        if (this.defendiendo) {
            this.defendiendo = false;
            console.log(`${this.nombre} está defendiendo y recibe la mitad del daño.`);

        }
        this.vida -= Math.max(daño - this.defensa, 0);
        this.vida = Math.max(this.vida, 0);
        console.log(`${this.nombre} ha recibido ${daño} puntos de daño. Vida restante: ${this.vida}`);
    }

    estaVivo() {
        return this.vida > 0;
    }

    mostrarEstado() {
        console.log("===== ESTADO DEL PERSONAJE =====");
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Nivel: ${this.nivel}`);
        console.log(`Dinero: ${this.dinero}`);
        console.log(`Vida: ${this.vida}`);
        console.log(`Ataque: ${this.ataque}`);
        console.log(`Defensa: ${this.defensa}`);
        console.log(`Experiencia: ${this.experiencia}`);
        this.inventario.mostrarInventario();
        console.log("================================");
    }

    guardarEstado() {
        const estado = {
            nombre: this.nombre,
            nivel: this.nivel,
            dinero: this.dinero,
            vida: this.vida,
            ataque: this.ataque,
            defensa: this.defensa,
            experiencia: this.experiencia,
            inventario: this.inventario.objetos.map(obj => ({
                nombre: obj.nombre,
                daño: obj.daño,
                precio: obj.precio
            })),
            armaEquipada: this.inventario.armaEquipada ? this.inventario.armaEquipada.nombre : null
        };
        localStorage.setItem('personaje', JSON.stringify(estado));
    }

    static cargarEstado() {
        const estadoJSON = localStorage.getItem('personaje');
        if (estadoJSON) {
            const estado = JSON.parse(estadoJSON);
            const personaje = new Personaje(estado.nombre, estado.nivel, estado.dinero, estado.vida, estado.ataque, estado.defensa);
            personaje.experiencia = estado.experiencia;
            estado.inventario.forEach(item => {
                const objeto = new Arma(item.nombre, item.daño, item.precio);
                personaje.inventario.agregarObjeto(objeto);
            });
            if (estado.armaEquipada) {
                const armaEquipada = personaje.inventario.objetos.find(obj => obj.nombre === estado.armaEquipada);
                personaje.inventario.equiparArma(armaEquipada);
            }
            return personaje;
        }
        return null;
    }
}









