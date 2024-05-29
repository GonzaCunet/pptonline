import "./components/button";
import "./components/moves-el";
import "./components/resultadoEl";
import "./components/scoreboard";
import { initRouter } from "./router";

function main() {
  const root = document.querySelector(".root");
  initRouter(root);
}
main();
