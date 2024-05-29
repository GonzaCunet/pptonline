"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initResult = void 0;
const state_1 = require("../../state");
function initResult(params) {
    const div = document.createElement("div");
    let jugadaCompu = state_1.state.getState().currentGame.computerPlay;
    let miJugada = state_1.state.getState().currentGame.myPlay;
    const ganador = state_1.state.whoWins(miJugada, jugadaCompu);
    let resultado;
    if (ganador == "ganaste") {
        resultado = "GANASTE";
    }
    if (ganador == "empate") {
        resultado = "EMPATE";
    }
    if (ganador == "perdiste") {
        resultado = "PERDISTE";
    }
    div.className = "result-container";
    div.innerHTML = `
    <div class="${resultado}"
    <div><resultado-el stars="${resultado}"></resultado-el>
    <div><score-el></score-el></div>
    <div><button-el>VOLVER A JUGAR</button-el></div></div>
     
 `;
    const startButton = div.querySelector("button-el");
    startButton?.addEventListener("click", () => {
        params.goTo("/init");
    });
    return div;
}
exports.initResult = initResult;
