"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowToPlay = void 0;
exports.inithowToPlay = inithowToPlay;
const router_1 = require("@vaadin/router");
const state_1 = require("../../state");
class HowToPlay extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        console.log(state_1.state.play.currentGame);
        this.innerHTML = `
        
        <div class="howToPlay-container">
          <div class="jugadores-container"><h2>${state_1.state.play.currentGame.myName} : ${state_1.state.play.currentGame.myScore}</h2>
          <h2>SALA:${state_1.state.play.currentGame.roomId}</h2>
          </div>
          ${state_1.state.play.currentGame.onlineP2 == false
            ? `<h1 class="howToPlay-text">Compartí el Código<br>
          ${state_1.state.play.currentGame.roomId}<br> con tu contrincante <br></h1>`
            : ""}
          ${state_1.state.play.currentGame.onlineP2 == true &&
            state_1.state.play.currentGame.myStart == false
            ? `<h1 class="howToPlay-text">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h1>
              <button-el>¡JUGAR!</button-el>`
            : ""}
          ${state_1.state.play.currentGame.startP2 == false
            ? `<h1 class="howToPlay-text">esperando que <br>${state_1.state.play.currentGame.nameP2}<br> presione jugar... </h1>`
            : ""}

          ${state_1.state.play.currentGame.myOnline &&
            state_1.state.play.currentGame.myStart &&
            state_1.state.play.currentGame.startP2 &&
            state_1.state.play.currentGame.onlineP2
            ? `${router_1.Router.go("/selectmove")}`
            : ""}
            
          <div>
            
          </div>
          <div class="hands-container">
            <moves-el type="hand-img" hand="piedra"></moves-el>
            <moves-el type="hand-img" hand="papel"></moves-el>
            <moves-el type="hand-img" hand="tijera"></moves-el>
          </div> 
        </div>;`;
    }
}
exports.HowToPlay = HowToPlay;
customElements.define("howtoplay-page", HowToPlay);
function inithowToPlay(params) {
    const div = document.createElement("div");
    div.className = "howToPlay-container";
    div.innerHTML = `<div>
      <h1 class="howToPlay-text">Presioná jugar<br>
      y elegí: piedra,<br> papel o tijera<br> antes de que <br>pasen los 3<br> segundos.</h1></div>
  
      </div><button-el>¡JUGAR!</button-el></div>
      <div class="hands-container">
      <moves-el type="hand-img" hand="piedra"></moves-el>
      <moves-el type="hand-img" hand="papel"></moves-el>
      <moves-el type="hand-img" hand="tijera"></moves-el></div> 
      </div>`;
    const startButton = div.querySelector("button-el");
    startButton?.addEventListener("click", () => {
        state_1.state.play.currentGame.myStart = true;
        state_1.state
            .changeRoom(state_1.state.play.currentGame.rtdbRoomId, state_1.state.play.currentGame.myId)
            .then(() => {
            params.goTo("/selectMove");
        });
    });
    return div;
}
