"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitResult = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
class InitResult extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
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
        this.innerHTML = `
    <div class="result-container">
      <div class="${resultado}">
        <resultado-el stars="${resultado}"></resultado-el>
        <score-el></score-el>
        <button-el>VOLVER A JUGAR</button-el>
      </div>
    </div>
    `;
        const startButton = this.querySelector("button-el");
        startButton?.addEventListener("click", () => {
            router_1.Router.go("/howtoplay");
        });
    }
}
exports.InitResult = InitResult;
customElements.define("result-page", InitResult);
