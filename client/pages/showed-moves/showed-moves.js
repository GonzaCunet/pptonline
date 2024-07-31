"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowedMoves = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
class ShowedMoves extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        let jugadaRival = state_1.state.getState().currentGame.playP2;
        let miJugada = state_1.state.getState().currentGame.myPlay;
        this.innerHTML = `
      <div class="showedMoves-container">
        <moves-el type="hand-imagenGrande" class="computer-move" hand="${jugadaRival}"></moves-el>
        <moves-el type="hand-imagenGrande" class="human-move" hand="${miJugada}"></moves-el>
      </div>
   `;
        let tiempoRestante = 2;
        const intervalo = setInterval(() => {
            tiempoRestante--;
            if (tiempoRestante === 0) {
                clearInterval(intervalo);
                router_1.Router.go("/result");
            }
        }, 1000);
    }
}
exports.ShowedMoves = ShowedMoves;
customElements.define("showedmoves-page", ShowedMoves);
// export function initShowedMoves(params) {
//   let jugadaCompu = state.getState().currentGame.computerPlay;
//   let miJugada = state.getState().currentGame.myPlay;
//   const div = document.createElement("div");
//   div.className = "showedMoves-container";
//   div.innerHTML = `<moves-el type="hand-imagenGrande" class="computer-move" hand="${jugadaCompu}"></moves-el>
//   <moves-el type="hand-imagenGrande" class="human-move" hand="${miJugada}"></moves-el>
//    `;
//   // timer
//   let tiempoRestante = 2;
//   const intervalo = setInterval(() => {
//     tiempoRestante--;
//     if (tiempoRestante === 0) {
//       clearInterval(intervalo);
//       Router.go("/result");
//     }
//   }, 1000);
//   return div;
// }
