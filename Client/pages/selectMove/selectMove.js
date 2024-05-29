"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSelectMove = void 0;
const state_1 = require("../../state");
function initSelectMove(params) {
    const div = document.createElement("div");
    div.className = "selectMove-container";
    let tiempoRestante = 4;
    let atributoPiedra = "hand-img";
    let atributoPapel = "hand-img";
    let atributoTijera = "hand-img";
    state_1.state.setMove("piedra");
    const intervalo = setInterval(() => {
        tiempoRestante--;
        div.innerHTML = `<div class="circle">
      <h1>${tiempoRestante}</h1></div>
      <div class="hands-container">
        <div><moves-el type="${atributoPiedra}" class="piedra" hand="piedra"></moves-el></div>
        <div><moves-el type="${atributoPapel}" class="papel" hand="papel"></moves-el></div>
        <div><moves-el type="${atributoTijera}" class="tijera" hand="tijera"></moves-el></div>
      </div>

    `;
        const piedraMove = div.querySelector(".piedra");
        const papelMove = div.querySelector(".papel");
        const tijeraMove = div.querySelector(".tijera");
        piedraMove?.addEventListener("click", () => {
            atributoPiedra = "hand-imagenGrande";
            atributoPapel = "unpicked-hand";
            atributoTijera = "unpicked-hand";
            state_1.state.setMove(piedraMove.getAttribute("hand"));
        });
        papelMove?.addEventListener("click", () => {
            atributoPapel = "hand-imagenGrande";
            atributoPiedra = "unpicked-hand";
            atributoTijera = "unpicked-hand";
            state_1.state.setMove(papelMove.getAttribute("hand"));
        });
        tijeraMove?.addEventListener("click", () => {
            atributoTijera = "hand-imagenGrande";
            atributoPapel = "unpicked-hand";
            atributoPiedra = "unpicked-hand";
            tijeraMove.getAttribute("hand");
            state_1.state.setMove(tijeraMove.getAttribute("hand"));
        });
        if (tiempoRestante === 0) {
            state_1.state.setComputerMove();
            clearInterval(intervalo);
            params.goTo("/showed-moves");
        }
    }, 1000);
    return div;
}
exports.initSelectMove = initSelectMove;
