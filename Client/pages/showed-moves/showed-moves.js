"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initShowedMoves = void 0;
const state_1 = require("../../state");
function initShowedMoves(params) {
    let jugadaCompu = state_1.state.getState().currentGame.computerPlay;
    let miJugada = state_1.state.getState().currentGame.myPlay;
    const div = document.createElement("div");
    div.className = "showedMoves-container";
    div.innerHTML = `<moves-el type="hand-imagenGrande" class="computer-move" hand="${jugadaCompu}"></moves-el>
  <moves-el type="hand-imagenGrande" class="human-move" hand="${miJugada}"></moves-el>
   `;
    // timer
    let tiempoRestante = 2;
    const intervalo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante === 0) {
            clearInterval(intervalo);
            params.goTo("/result");
        }
    }, 1000);
    return div;
}
exports.initShowedMoves = initShowedMoves;
