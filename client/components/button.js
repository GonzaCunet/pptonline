class Button extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.innerHTML = `
    .root{
      width: 330px;
      height: 80px;
      border-style: solid; 
      border-radius: 10px;          
      border-width: 10px;
      background-color:#006CFC;
      border-color: #001997;
      font-size: 45px;
      font-family: 'Odibee Sans', sans-serif;
      color: white;
    }`;
        this.shadow.appendChild(style);
        this.render();
    }
    render() {
        const buttonEl = document.createElement("button");
        buttonEl.className = "root";
        buttonEl.textContent = this.textContent;
        buttonEl.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado de un clic en un botón
            const form = this.closest("form"); // Buscar el formulario más cercano al botón
            if (form) {
                form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); // Disparar manualmente el evento de envío del formulario
            }
        });
        this.shadow.appendChild(buttonEl);
    }
}
customElements.define("button-el", Button);
