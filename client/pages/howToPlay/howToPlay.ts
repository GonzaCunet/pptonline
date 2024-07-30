import { Router } from "@vaadin/router";
import { state } from "../../state";

export class HowToPlay extends HTMLElement {
  connectedCallback() {
    state.startApp(state.play.currentGame.rtdbRoomId);
    this.render();
    this.lalala();
    state.subscribe(() => {
      this.render();
      this.lalala();
    });
  }
  render() {
    this.innerHTML = `
        
        <div class="howToPlay-container">
          <div class="jugadores-container">
            <div class="nombres-container">
              <h2>${state.play.currentGame.myName}: ${
      state.play.currentGame.myScore
    }</h2>
              ${
                state.play.currentGame.nameP2 != ""
                  ? `<h2 class="rival">${state.play.currentGame.nameP2}: ${state.play.currentGame.scoreP2}</h2>`
                  : ""
              }
            </div>
            <div>
              <h2>SALA:${state.play.currentGame.roomId}</h2>
            </div>
          </div>    
          ${
            state.play.currentGame.onlineP2 == false
              ? `<h1 class="howToPlay-text">Compartí el Código<br>
          ${state.play.currentGame.roomId}<br> con tu contrincante <br></h1>`
              : ""
          }
          ${
            state.play.currentGame.onlineP2 == true &&
            state.play.currentGame.myStart == false
              ? `<h1 class="howToPlay-text">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h1>
              <button-el class="jugar">¡JUGAR!</button-el>`
              : ""
          }
          ${
            state.play.currentGame.startP2 == false &&
            state.play.currentGame.myStart == true
              ? `<h1 class="howToPlay-text">esperando que <br>${state.play.currentGame.nameP2}<br> presione jugar... </h1>`
              : ""
          }
          <div>
          </div>
          <div class="hands-container">
            <moves-el type="hand-img" hand="piedra"></moves-el>
            <moves-el type="hand-img" hand="papel"></moves-el>
            <moves-el type="hand-img" hand="tijera"></moves-el>
          </div> 
        </div>;`;
    const buttonEl = document.querySelector(".jugar");
    buttonEl?.addEventListener("click", async () => {
      state.play.currentGame.myStart = true;
      state.patchData(
        state.play.currentGame.rtdbRoomId,
        state.play.currentGame.myId
      );
    });
  }
  lalala() {
    if (
      state.play.currentGame.myOnline &&
      state.play.currentGame.myStart &&
      state.play.currentGame.startP2 &&
      state.play.currentGame.onlineP2
    ) {
      state.play.currentGame.myStart = false;
      Router.go("./selectMove");
    }
  }
}

customElements.define("howtoplay-page", HowToPlay);
