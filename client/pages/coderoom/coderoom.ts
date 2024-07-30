import { Router } from "@vaadin/router";
import { state } from "../../state";
import Swal from "sweetalert2";

export class InitCodeRoom extends HTMLElement {
  connectedCallback() {
    this.render();
    const formularioEl = this.querySelector(".formulario");
    formularioEl.addEventListener("submit", (e) => {
      e.preventDefault();

      const roomId = e.target["roomIdEscrito"].value;
      state.getRoomId(roomId, state.play.currentGame.myId).then((res) => {
        state.play.currentGame.roomId = roomId;
        state.play.currentGame.rtdbRoomId = res.rtdbRoomId;
        state
          .joinRoom(
            state.play.currentGame.myId,
            state.play.currentGame.myName,
            state.play.currentGame.rtdbRoomId
          )
          .then((res: any) => {
            if (res == "La sala ya alcanzó el máximo de jugadores") {
              Swal.fire({
                icon: "error",
                title: `La sala ${state.play.currentGame.roomId} ya alcanzó el máximo de jugadores`,
              });
            } else {
              state.getRoomData(state.play.currentGame.rtdbRoomId);
              Router.go("/howToPlay");
            }
          });
      });

      // state.joinRoom(
      //   state.play.currentGame.myId,
      //   state.play.currentGame.myName,
      //   roomId
    });
  }
  render() {
    this.innerHTML = `
      <div class="coderoom-container">
        <div>
          <h1 class="text-format">Piedra</h1>
          <h1 class="text-format">Papel</h1>
          <h1 class="text-format">Tijera</h1>
        </div>

        <div>
          <form class="formulario">
          <label class="label-text"></label><br>
          <input name="roomIdEscrito" type="text" class="input" placeholder="código">
          <button-el>EMPEZAR</button-el></form>
        </div>
        
        <div class="hands-container">
          <moves-el type="hand-img" hand="piedra"></moves-el>
          <moves-el type="hand-img" hand="papel"></moves-el>
          <moves-el type="hand-img" hand="tijera"></moves-el>
          </div>        
    </div>`;
  }
}

customElements.define("coderoom-page", InitCodeRoom);
