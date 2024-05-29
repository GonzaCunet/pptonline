const hands = {
    tijera: require("url:../imgs/tijera.png"),
    piedra: require("url:../imgs/piedra.png"),
    papel: require("url:../imgs/papel.png"),
};
class HandComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();
        const style = document.createElement("style");
        style.textContent = `
		.hand-img {

            
            width: 125px;
            height: 225px;
            
        }
        .hand-imagenGrande{
          width:100px;
          height:200px;
        }

    .unpicked-hand{
      opacity:50%;
    }

		@media (max-width: 960px) {
			.hand-img {
        width: 70px;
        height: 125px;

                
        .hand-imagenGrande{
          width:200px;
          height:300px;
          
        }
			}
		}
		`;
        this.render();
        this.shadow.appendChild(style);
    }
    render() {
        const typeAttr = this.getAttribute("type");
        const handAttr = this.getAttribute("hand");
        this.shadow.innerHTML = `
    	<img class="${typeAttr}" src="${hands[handAttr]}">
    	`;
    }
}
customElements.define("moves-el", HandComponent);
