"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitResult = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
class InitResult extends HTMLElement {
    connectedCallback() {
        let jugadaRival = state_1.state.getState().currentGame.playP2;
        let miJugada = state_1.state.getState().currentGame.myPlay;
        const ganador = state_1.state.whoWins(miJugada, jugadaRival);
        state_1.state
            .patchData(state_1.state.play.currentGame.rtdbRoomId, state_1.state.play.currentGame.myId)
            .then(() => {
            state_1.state.getRoomData(state_1.state.play.currentGame.rtdbRoomId);
        })
            .then(() => {
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
            this.render(resultado);
        });
    }
    render(resultado) {
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
            // state.play.currentGame.startP2 = false;
            router_1.Router.go("/howtoplay");
        });
    }
}
exports.InitResult = InitResult;
customElements.define("result-page", InitResult);
