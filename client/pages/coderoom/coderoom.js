"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCodeRoom = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../../state");
const sweetalert2_1 = require("sweetalert2");
class InitCodeRoom extends HTMLElement {
    connectedCallback() {
        this.render();
        const formularioEl = this.querySelector(".formulario");
        formularioEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const roomId = e.target["roomIdEscrito"].value;
            state_1.state.getRoomId(roomId, state_1.state.play.currentGame.myId).then((res) => {
                state_1.state.play.currentGame.roomId = roomId;
                state_1.state.play.currentGame.rtdbRoomId = res.rtdbRoomId;
                state_1.state
                    .joinRoom(state_1.state.play.currentGame.myId, state_1.state.play.currentGame.myName, state_1.state.play.currentGame.rtdbRoomId)
                    .then((res) => {
                    if (res == "La sala ya alcanzó el máximo de jugadores") {
                        sweetalert2_1.default.fire({
                            icon: "error",
                            title: `La sala ${state_1.state.play.currentGame.roomId} ya alcanzó el máximo de jugadores`,
                        });
                    }
                    else {
                        state_1.state.getRoomData(state_1.state.play.currentGame.rtdbRoomId);
                        router_1.Router.go("/howToPlay");
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
exports.InitCodeRoom = InitCodeRoom;
customElements.define("coderoom-page", InitCodeRoom);
