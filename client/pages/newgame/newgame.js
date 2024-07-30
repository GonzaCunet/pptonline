"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSignUp = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../../state");
class InitSignUp extends HTMLElement {
    connectedCallback() {
        this.render();
        const formButton = this.querySelector(".formulario");
        formButton?.addEventListener("submit", (e) => {
            e.preventDefault();
            state_1.state.auth(e.target["nombreEscrito"].value).then((res) => {
                state_1.state.play.currentGame.myName = e.target["nombreEscrito"].value;
                state_1.state.play.currentGame.myId = res.id;
                state_1.state.setRoom(res.id, state_1.state.play.currentGame.myName).then((res) => {
                    state_1.state.play.currentGame.roomId = res.id;
                    state_1.state.play.currentGame.rtdbRoomId = res.rtdbId;
                    state_1.state.getRoomData(res.rtdbId).then(() => {
                        router_1.Router.go("/howtoplay");
                    });
                });
            });
        });
    }
    render() {
        this.innerHTML = `
      <div class="signup-container">
        <div>
          <h1 class="text-format">Piedra</h1>
          <h1 class="text-format">Papel</h1>
          <h1 class="text-format">Tijera</h1>
        </div>

        <div>
          <form class="formulario">
          <label class="label-text">Tu Nombre</label><br>
          <input name="nombreEscrito" type="text" class="input">
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
exports.InitSignUp = InitSignUp;
customElements.define("newgame-page", InitSignUp);
