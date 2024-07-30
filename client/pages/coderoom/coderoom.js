"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCodeRoom = void 0;
const router_1 = require("@vaadin/router");
class InitCodeRoom extends HTMLElement {
    connectedCallback() {
        this.render();
        const startButton = this.querySelector("button-el");
        startButton?.addEventListener("click", () => {
            router_1.Router.go("/howToPlay");
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
        <label class="label-text" ></label><br>
        <input name="nombreEscrito" type="text" class="input" placeholder="código">
        </div>
        <button-el>EMPEZAR</button-el>
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
