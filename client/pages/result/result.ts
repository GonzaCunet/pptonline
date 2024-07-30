import { state } from "../../state";
import { Router } from "@vaadin/router";
export class InitResult extends HTMLElement {
  connectedCallback() {
    let jugadaRival = state.getState().currentGame.playP2;
    let miJugada = state.getState().currentGame.myPlay;
    const ganador = state.whoWins(miJugada, jugadaRival);
    state
      .patchData(state.play.currentGame.rtdbRoomId, state.play.currentGame.myId)
      .then(() => {
        state.getRoomData(state.play.currentGame.rtdbRoomId);
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
      Router.go("/howtoplay");
    });
  }
}

customElements.define("result-page", InitResult);
