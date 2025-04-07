class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
    }

    turnoPersonaje(accion = 'atacar') {
        if (!this.personaje.estaVivo() || !this.enemigo.estaVivo()) return;

        switch (accion) {
            case 'atacar':
                const dañoPersonaje = Math.floor(Math.random() * 21) + 10; // Daño aleatorio entre 10 y 30
                this.enemigo.recibirDaño(dañoPersonaje);
                this.actualizarResultado(`${this.personaje.nombre} ataca y causa ${dañoPersonaje} puntos de daño.`);
                break;
            case 'defender':
                this.personaje.defender();
                this.actualizarResultado(`${this.personaje.nombre} se defiende.`);
                break;
            case 'usar arma':
                if (this.personaje.inventario.armaEquipada) {
                    const dañoArma = this.personaje.inventario.armaEquipada.daño;
                    this.enemigo.recibirDaño(dañoArma);
                    this.actualizarResultado(`${this.personaje.nombre} usa su arma y causa ${dañoArma} puntos de daño. Vida restante del enemigo: ${this.enemigo.vida}`);
                } else {
                    this.actualizarResultado(`${this.personaje.nombre} no tiene un arma equipada.`);
                }
                break;
            default:
                this.actualizarResultado('Acción no válida. Pierdes tu turno.');
        }
        this.mostrarEstado();
    }

    turnoEnemigo(accion = 'atacar') {
        if (!this.personaje.estaVivo() || !this.enemigo.estaVivo()) return;

        switch (accion) {
            case 'atacar':
                this.personaje.recibirDaño(this.enemigo.ataque);
                this.actualizarResultado(`${this.enemigo.nombre} ataca y causa ${this.enemigo.ataque} puntos de daño.`);
                break;
            case 'defender':
                this.enemigo.defender();
                this.actualizarResultado(`${this.enemigo.nombre} se defiende.`);
                break;
            default:
                this.actualizarResultado('Acción no válida.');
        }
        this.mostrarEstado();
    }

    mostrarEstado() {
        document.getElementById('personaje-nombre').innerText = `Nombre: ${this.personaje.nombre}`;
        this.actualizarBarraVida('personaje-vida-restante', this.personaje.vida / this.personaje.vidaMaxima);
        document.getElementById('personaje-vida-valor').innerText = `${this.personaje.vida}`;

        document.getElementById('enemigo-nombre').innerText = `Nombre: ${this.enemigo.nombre}`;
        this.actualizarBarraVida('enemigo-vida-restante', this.enemigo.vida / this.enemigo.vidaMaxima);
        document.getElementById('enemigo-vida-valor').innerText = `${this.enemigo.vida}`;
    }

    actualizarBarraVida(idElemento, porcentajeVida) {
        const vidaRestante = document.getElementById(idElemento);
        vidaRestante.style.width = `${porcentajeVida * 100}%`;

        if (porcentajeVida > 0.5) {
            vidaRestante.className = 'vida-restante vida-alta';
        } else if (porcentajeVida > 0.2) {
            vidaRestante.className = 'vida-restante vida-media';
        } else {
            vidaRestante.className = 'vida-restante vida-baja';
        }
    }

    actualizarResultado(mensaje) {
        const resultadoDiv = document.getElementById('combate-resultado');
        resultadoDiv.innerHTML = mensaje; // Actualizar el contenido en lugar de añadir
    }
}
