"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowToPlay = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../../state");
class HowToPlay extends HTMLElement {
    connectedCallback() {
        state_1.state.startApp(state_1.state.play.currentGame.rtdbRoomId);
        this.render();
        this.lalala();
        state_1.state.subscribe(() => {
            this.render();
            this.lalala();
        });
    }
    render() {
        this.innerHTML = `
        
        <div class="howToPlay-container">
          <div class="jugadores-container">
            <div class="nombres-container">
              <h2>${state_1.state.play.currentGame.myName}: ${state_1.state.play.currentGame.myScore}</h2>
              ${state_1.state.play.currentGame.nameP2 != ""
            ? `<h2 class="rival">${state_1.state.play.currentGame.nameP2}: ${state_1.state.play.currentGame.scoreP2}</h2>`
            : ""}
            </div>
            <div>
              <h2>SALA:${state_1.state.play.currentGame.roomId}</h2>
            </div>
          </div>    
          ${state_1.state.play.currentGame.onlineP2 == false
            ? `<h1 class="howToPlay-text">Compartí el Código<br>
          ${state_1.state.play.currentGame.roomId}<br> con tu contrincante <br></h1>`
            : ""}
          ${state_1.state.play.currentGame.onlineP2 == true &&
            state_1.state.play.currentGame.myStart == false
            ? `<h1 class="howToPlay-text">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h1>
              <button-el class="jugar">¡JUGAR!</button-el>`
            : ""}
          ${state_1.state.play.currentGame.startP2 == false &&
            state_1.state.play.currentGame.myStart == true
            ? `<h1 class="howToPlay-text">esperando que <br>${state_1.state.play.currentGame.nameP2}<br> presione jugar... </h1>`
            : ""}
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
            state_1.state.play.currentGame.myStart = true;
            state_1.state.patchData(state_1.state.play.currentGame.rtdbRoomId, state_1.state.play.currentGame.myId);
        });
    }
    lalala() {
        if (state_1.state.play.currentGame.myOnline &&
            state_1.state.play.currentGame.myStart &&
            state_1.state.play.currentGame.startP2 &&
            state_1.state.play.currentGame.onlineP2) {
            state_1.state.play.currentGame.myStart = false;
            router_1.Router.go("./selectMove");
        }
    }
}
exports.HowToPlay = HowToPlay;
customElements.define("howtoplay-page", HowToPlay);
