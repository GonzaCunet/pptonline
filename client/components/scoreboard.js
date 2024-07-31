"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ScoreEl extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const style = document.createElement("style");
        style.innerHTML = `
          .root{
              width: 259px;
              height: 217px;
              border: solid #000000 10px;
              border-radius: 10px;
              background-color: #FFFFFF;
              font-family: 'Odibee Sans', sans-serif;
          }
          .title{
              font-size: 55px;
              margin: 10px; 
              text-align:center;
          }
          p{
              font-size: 45px;
              margin: 0;
              text-align:center;
          }
      `;
        this.shadow.appendChild(style);
        this.render();
    }
    render() {
        const myScore = state_1.state.play.currentGame.myScore;
        const p2Score = state_1.state.play.currentGame.scoreP2;
        const myName = state_1.state.play.currentGame.myName;
        const p2Name = state_1.state.play.currentGame.nameP2;
        const container = document.createElement("div");
        container.className = "root";
        container.innerHTML = `
          <h1 class="title">SCORE: </h2>
          <p class="player-uno">${myName}: ${myScore}</p>
          <p class="player-dos">${p2Name}: ${p2Score}</p>
      `;
        this.shadow.appendChild(container);
    }
}
customElements.define("score-el", ScoreEl);
