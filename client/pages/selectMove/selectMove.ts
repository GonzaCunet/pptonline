import { jugada, state } from "../../state";
import { Router } from "@vaadin/router";

export class InitSelectMove extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    state.setMove("piedra");
    let tiempoRestante = 5;
    let atributoPiedra = "hand-img";
    let atributoPapel = "hand-img";
    let atributoTijera = "hand-img";

    const intervalo = setInterval(() => {
      tiempoRestante--;
      this.innerHTML = `
      <div class="selectMove-container">
        <div class="circle">
          <h1>${tiempoRestante}</h1>
        </div>
        <div class="hands-container">
          <div><moves-el type="${atributoPiedra}" class="piedra" hand="piedra"></moves-el></div>
          <div><moves-el type="${atributoPapel}" class="papel" hand="papel"></moves-el></div>
          <div><moves-el type="${atributoTijera}" class="tijera" hand="tijera"></moves-el></div>
        </div>
      </div>`;

      const piedraMove = this.querySelector(".piedra");
      const papelMove = this.querySelector(".papel");
      const tijeraMove = this.querySelector(".tijera");

      piedraMove?.addEventListener("click", () => {
        atributoPiedra = "hand-imagenGrande";
        atributoPapel = "unpicked-hand";
        atributoTijera = "unpicked-hand";
        state.setMove(piedraMove.getAttribute("hand") as jugada);
      });
      papelMove?.addEventListener("click", () => {
        atributoPapel = "hand-imagenGrande";
        atributoPiedra = "unpicked-hand";
        atributoTijera = "unpicked-hand";
        state.setMove(papelMove.getAttribute("hand") as jugada);
      });

      tijeraMove?.addEventListener("click", () => {
        atributoTijera = "hand-imagenGrande";
        atributoPapel = "unpicked-hand";
        atributoPiedra = "unpicked-hand";
        tijeraMove.getAttribute("hand") as jugada;
        state.setMove(tijeraMove.getAttribute("hand") as jugada);
      });

      if (tiempoRestante === 0) {
        clearInterval(intervalo);
        state
          .patchData(
            state.play.currentGame.rtdbRoomId,
            state.play.currentGame.myId
          )
          .then(() => {
            state.getRoomData(state.play.currentGame.rtdbRoomId).then(() => {
              Router.go("/showedmoves");
            });
          });
      }
    }, 1000);
  }
}
customElements.define("selectmove-page", InitSelectMove);
// export function initSelectMove(params) {
//   const div = document.createElement("div");
//   div.className = "selectMove-container";
//   let tiempoRestante = 4;
//   let atributoPiedra = "hand-img";
//   let atributoPapel = "hand-img";
//   let atributoTijera = "hand-img";
//   state.setMove("piedra");
//   const intervalo = setInterval(() => {
//     tiempoRestante--;
//     div.innerHTML = `<div class="circle">
//       <h1>${tiempoRestante}</h1></div>
//       <div class="hands-container">
//         <div><moves-el type="${atributoPiedra}" class="piedra" hand="piedra"></moves-el></div>
//         <div><moves-el type="${atributoPapel}" class="papel" hand="papel"></moves-el></div>
//         <div><moves-el type="${atributoTijera}" class="tijera" hand="tijera"></moves-el></div>
//       </div>

//     `;

// const piedraMove = div.querySelector(".piedra");
// const papelMove = div.querySelector(".papel");
// const tijeraMove = div.querySelector(".tijera");

// piedraMove?.addEventListener("click", () => {
//   atributoPiedra = "hand-imagenGrande";
//   atributoPapel = "unpicked-hand";
//   atributoTijera = "unpicked-hand";
//   state.setMove(piedraMove.getAttribute("hand") as jugada);
// });
// papelMove?.addEventListener("click", () => {
//   atributoPapel = "hand-imagenGrande";
//   atributoPiedra = "unpicked-hand";
//   atributoTijera = "unpicked-hand";
//   state.setMove(papelMove.getAttribute("hand") as jugada);
// });

// tijeraMove?.addEventListener("click", () => {
//   atributoTijera = "hand-imagenGrande";
//   atributoPapel = "unpicked-hand";
//   atributoPiedra = "unpicked-hand";
//   tijeraMove.getAttribute("hand") as jugada;
//   state.setMove(tijeraMove.getAttribute("hand") as jugada);
// });

// if (tiempoRestante === 0) {
//   state.setComputerMove();
//   clearInterval(intervalo);
//   Router.go("/showed-moves");
// }
//   }, 1000);
//   return div;
// }
