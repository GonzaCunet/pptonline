import { initHome } from "./pages/home/home";
import { inithowToPlay } from "./pages/howToPlay/howToPlay";
import { initResult } from "./pages/result/result";
import { initSelectMove } from "./pages/selectMove/selectMove";
import { initShowedMoves } from "./pages/showed-moves/showed-moves";

const BASE_PATH = "/desafio-5";

function isGithubPages() {
  return location.host.includes("gonzacunet.github.io");
}

const routes = [
  {
    path: /\/home/,
    component: initHome,
  },
  {
    path: /\/init/,
    component: inithowToPlay,
  },
  {
    path: /\/selectMove/,
    component: initSelectMove,
  },
  {
    path: /\/showed-moves/,
    component: initShowedMoves,
  },
  {
    path: /\/result/,
    component: initResult,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }
  function handleRoute(route) {
    //    console.log("el handle Route recibio una nueva ruta y es", route);
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
    for (const r of routes) {
      if (r.path.test(newRoute)) {
        const el = r.component({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }
  if (location.pathname == "/" || location.pathname == "/desafio-5/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
