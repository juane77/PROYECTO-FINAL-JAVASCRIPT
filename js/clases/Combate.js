class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
    }

    iniciarCombate() {
        let ronda = 1;
        while (this.personaje.estaVivo() && this.enemigo.estaVivo()) {
            console.log(`\n--- Ronda ${ronda} ---`);
            this.turnoPersonaje();
            if (!this.enemigo.estaVivo()) {
                console.log(`${this.enemigo.nombre} ha sido derrotado.`);
                break;
            }
            this.turnoEnemigo();
            if (!this.personaje.estaVivo()) {
                console.log(`${this.personaje.nombre} ha sido derrotado.`);
                break;
            }
            ronda++;
        }
        this.mostrarResultado();
    }

    turnoPersonaje() {
        const accion = prompt(`${this.personaje.nombre}, ¿qué quieres hacer? (atacar/defender/usar arma): `);
        switch (accion.toLowerCase()) {
            case 'atacar':
                this.enemigo.recibirDaño(this.personaje.atacar());
                break;
            case 'defender':
                this.personaje.defender();
                break;
            case 'usar arma':
                this.personaje.usarObjeto();
                break;
            default:
                console.log('Acción no válida. Pierdes tu turno.');
        }
    }

    turnoEnemigo() {
        this.personaje.recibirDaño(this.enemigo.atacar());
    }

    mostrarResultado() {
        this.personaje.mostrarEstado();
        this.enemigo.mostrarEstado();
    }
}
