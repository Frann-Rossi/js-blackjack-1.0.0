const miModulo = (() => {
	"use strict";
	let e = [],
		t = ["C", "D", "H", "S"],
		a = ["A", "J", "Q", "K"],
		r = [],
		l = document.querySelector("#btnPedir"),
		n = document.querySelector("#btnDetener"),
		s = document.querySelector("#btnNuevo"),
		o = document.querySelectorAll(".divCartas"),
		d = document.querySelectorAll("small"),
		i = (t = 2) => {
			(e = c()),
				(r = Array(t).fill(0)),
				d.forEach((e) => (e.innerText = 0)),
				o.forEach((e) => (e.innerHTML = "")),
				$();
		},
		c = () => {
			let e = [];
			for (let r = 2; r <= 10; r++) t.forEach((t) => e.push(r + t));
			return (
				t.forEach((t) => {
					a.forEach((a) => e.push(a + t));
				}),
				_.shuffle(e)
			);
		},
		u = () => {
			if (!e.length) throw "No hay cartas en el deck";
			return e.pop();
		},
		p = (e) => {
			let t = e.slice(0, -1);
			return isNaN(t) ? ("A" === t ? 11 : 10) : Number(t);
		},
		f = (e, t) => ((r[t] += p(e)), (d[t].innerText = r[t]), r[t]),
		h = (e, t) => {
			let a = document.createElement("img");
			(a.src = `assets/cartas/${e}.png`),
				a.classList.add("carta"),
				o[t].append(a);
		},
		g = () => {
			let [e, t] = r;
			if (e > 21 && t > 21) alert("\xa1Ambos perdieron! Se pasaron de 21.");
			else if (e === t)
				alert("\xa1Empate! Ambos tienen la misma cantidad de puntos.");
			else if (e > 21)
				alert("\xa1Computadora gana! El jugador se pas\xf3 de 21.");
			else if (t > 21)
				alert("\xa1Jugador gana! La computadora se pas\xf3 de 21.");
			else {
				let a = e > t ? "Jugador" : "Computadora";
				alert(`\xa1${a} gana!`);
			}
		},
		m = async (e) => {
			let t = 0;
			do {
				let a = u();
				(t = f(a, r.length - 1)),
					h(a, r.length - 1),
					await new Promise((e) => setTimeout(e, 500));
			} while (t < e && e <= 21);
			g();
		},
		$ = (e = !0) => {
			(l.disabled = !e), (n.disabled = !e);
		};
	return (
		l.addEventListener("click", () => {
			let e = u(),
				t = f(e, 0);
			h(e, 0), t >= 21 && ($(!1), m(t));
		}),
		n.addEventListener("click", () => {
			$(!1), m(r[0]);
		}),
		s.addEventListener("click", () => {
			i();
		}),
		{ nuevoJuego: i }
	);
})();
