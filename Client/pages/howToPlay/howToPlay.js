"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inithowToPlay = void 0;
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
        params.goTo("/selectMove");
    });
    return div;
}
exports.inithowToPlay = inithowToPlay;
