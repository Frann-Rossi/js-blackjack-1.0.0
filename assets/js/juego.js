const miModulo = (() => {
	"use strict";
	let deck = [];
	const tipos = ["C", "D", "H", "S"],
		especiales = ["A", "J", "Q", "K"];

	let puntosJugadores = [];

	// Referencias del HTML
	const btnPedir = document.querySelector("#btnPedir"),
		btnDetener = document.querySelector("#btnDetener"),
		btnNuevo = document.querySelector("#btnNuevo");

	const divCartasJugadores = document.querySelectorAll(".divCartas"),
		puntosHTML = document.querySelectorAll("small");

	// Función para inicializar el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = Array(numJugadores).fill(0);
		puntosHTML.forEach((elem) => (elem.innerText = 0));
		divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

		activarBotones();
	};

	// Función para crear un nuevo deck
	const crearDeck = () => {
		const nuevoDeck = [];
		for (let i = 2; i <= 10; i++) {
			tipos.forEach((tipo) => nuevoDeck.push(i + tipo));
		}
		tipos.forEach((tipo) => {
			especiales.forEach((esp) => nuevoDeck.push(esp + tipo));
		});
		return _.shuffle(nuevoDeck);
	};

	// Función para pedir una carta
	const pedirCarta = () => {
		if (!deck.length) throw "No hay cartas en el deck";
		return deck.pop();
	};

	// Función para obtener el valor de una carta
	const valorCarta = (carta) => {
		const valor = carta.slice(0, -1);
		return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
	};

	// Función para acumular puntos y devolver el puntaje actualizado
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] += valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	// Función para crear una carta en el HTML
	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement("img");
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add("carta");
		divCartasJugadores[turno].append(imgCarta);
	};

	// Función para determinar el ganador
	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;

		if (puntosMinimos > 21 && puntosComputadora > 21) {
			alert("¡Ambos perdieron! Se pasaron de 21.");
		} else if (puntosMinimos === puntosComputadora) {
			alert("¡Empate! Ambos tienen la misma cantidad de puntos.");
		} else if (puntosMinimos > 21) {
			alert("¡Computadora gana! El jugador se pasó de 21.");
		} else if (puntosComputadora > 21) {
			alert("¡Jugador gana! La computadora se pasó de 21.");
		} else {
			// Gana el que esté más cerca de 21
			const ganador =
				puntosMinimos > puntosComputadora ? "Jugador" : "Computadora";
			alert(`¡${ganador} gana!`);
		}
	};

	// Turno de la computadora usando async/await
	const turnoComputadora = async (puntosMinimos) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			crearCarta(carta, puntosJugadores.length - 1);
			await new Promise((resolve) => setTimeout(resolve, 500)); // Espera para animación
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
		determinarGanador();
	};

	// Activar/desactivar botones
	const activarBotones = (activar = true) => {
		btnPedir.disabled = !activar;
		btnDetener.disabled = !activar;
	};

	// Eventos
	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);

		crearCarta(carta, 0);

		if (puntosJugador >= 21) {
			activarBotones(false);
			turnoComputadora(puntosJugador);
		}
	});

	btnDetener.addEventListener("click", () => {
		activarBotones(false);
		turnoComputadora(puntosJugadores[0]);
	});

	btnNuevo.addEventListener("click", () => {
		inicializarJuego();
	});

	return {
		nuevoJuego: inicializarJuego,
	};
})();
