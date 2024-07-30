import { Router } from "@vaadin/router";
import { state } from "../../state";

export class InitSignUp extends HTMLElement {
  connectedCallback() {
    this.render();
    const formButton = this.querySelector(".formulario");
    formButton?.addEventListener("submit", (e) => {
      e.preventDefault();
      state.auth(e.target["nombreEscrito"].value).then((res) => {
        state.play.currentGame.myName = e.target["nombreEscrito"].value;
        state.play.currentGame.myId = res.id;
        state.setRoom(res.id, state.play.currentGame.myName).then((res) => {
          state.play.currentGame.roomId = res.id;
          state.play.currentGame.rtdbRoomId = res.rtdbId;
          state.getRoomData(res.rtdbId).then(() => {
            Router.go("/howtoplay");
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

customElements.define("newgame-page", InitSignUp);
