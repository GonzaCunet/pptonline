import { state } from "../../state";
export function initResult(params) {
  const div = document.createElement("div");
  let jugadaCompu = state.getState().currentGame.computerPlay;
  let miJugada = state.getState().currentGame.myPlay;
  const ganador = state.whoWins(miJugada, jugadaCompu);

  let resultado;
  if (ganador == "ganaste") {
    resultado = "GANASTE";
  }
  if (ganador == "empate") {
    resultado = "EMPATE";
  }
  if (ganador == "perdiste") {
    resultado = "PERDISTE";
  }
  div.className = "result-container";
  div.innerHTML = `
    <div class="${resultado}"
    <div><resultado-el stars="${resultado}"></resultado-el>
    <div><score-el></score-el></div>
    <div><button-el>VOLVER A JUGAR</button-el></div></div>
     
 `;
  const startButton = div.querySelector("button-el");
  startButton?.addEventListener("click", () => {
    params.goTo("/init");
  });

  return div;
}
