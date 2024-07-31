"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitHome = void 0;
const router_1 = require("@vaadin/router");
class InitHome extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
    <div class="home-container">
      <div>
        <h1 class="text-format">Piedra</h1>
        <h1 class="text-format">Papel</h1>
        <h1 class="text-format">Tijera</h1>
      </div>

      <div class="button-container">.
        <button-el class="signup">NUEVO JUEGO</button-el>
      <button-el class="joinroom">INGRESAR ROOM</button-el>
        <button-el class="prueba">PRUEBA</button-el>
      </div>
      <div class="hands-container">
        <moves-el type="hand-img" hand="piedra"></moves-el>
        <moves-el type="hand-img" hand="papel"></moves-el>
        <moves-el moves-el type="hand-img" hand="tijera"></moves-el>
      </div> 
    </div>`;
        const startButton = document.querySelector(".signup");
        startButton?.addEventListener("click", () => {
            router_1.Router.go("/newgame");
        });
        const startButton2 = document.querySelector(".joinroom");
        startButton2?.addEventListener("click", () => {
            router_1.Router.go("/entryname");
        });
    }
}
exports.InitHome = InitHome;
customElements.define("home-page", InitHome);
