import { state } from "../state";
class ScoreEl extends HTMLElement {
  shadow: ShadowRoot;
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
    const currentState = state.getState();
    // // const history = state.getHistory();
    const sh = currentState.history.scoreHuman;
    const sc = currentState.history.scoreComputer;

    const container = document.createElement("div");
    container.className = "root";
    container.innerHTML = `
          <h1 class="title">SCORE: </h2>
          <p class="player-uno">Vos: ${sh}</p>
          <p class="player-dos">Computer: ${sc}</p>
      `;

    this.shadow.appendChild(container);
  }
}

customElements.define("score-el", ScoreEl);
