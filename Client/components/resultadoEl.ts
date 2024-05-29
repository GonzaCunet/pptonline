const stars = {
  GANASTE: require("url:../imgs/ganaste.png"),
  PERDISTE: require("url:../imgs/perdiste.png"),
  EMPATE: require("url:../imgs/empate.png"),
};
class Stars extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    this.shadow.appendChild(div);
    this.render();
  }

  render() {
    const starsAttr: any = this.getAttribute("stars");
    const style = document.createElement("style");
    style.textContent = `.image-container {
        position: relative;
        display: inline-block;
      }
      .text-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 50px;
        font-family: 'Odibee Sans', sans-serif;
        -webkit-text-stroke: 2px black;
        font-weight: 400
        text-align:center;
        
      }`;
    this.shadow.innerHTML = `<div class="image-container">
    <img src="${stars[starsAttr]}" >
    <div class="text-overlay">${starsAttr}</div>
  </div>`;
    this.shadow.appendChild(style);
  }
}

customElements.define("resultado-el", Stars);
