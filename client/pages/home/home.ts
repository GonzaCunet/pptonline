export function initHome(params) {
  const div = document.createElement("div");
  div.className = "home-container";
  div.innerHTML = `<div>
    <h1 class="text-format">Piedra</h1>
    <h1 class="text-format">Papel</h1>
    <h1 class="text-format">Tijera</h1></div>

    <div class="button-container"><button-el>EMPEZAR</button-el></div>
    <div class="hands-container">
    <moves-el type="hand-img" hand="piedra"></moves-el>
    <moves-el type="hand-img" hand="papel"></moves-el>
    <moves-el type="hand-img" hand="tijera"></moves-el></div> 
    </div>`;

  const startButton = div.querySelector("button-el");
  startButton?.addEventListener("click", () => {
    params.goTo("/init");
  });
  return div;

  /*prueba*/
}
