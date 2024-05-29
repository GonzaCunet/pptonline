"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouter = void 0;
const home_1 = require("./pages/home/home");
const howToPlay_1 = require("./pages/howToPlay/howToPlay");
const result_1 = require("./pages/result/result");
const selectMove_1 = require("./pages/selectMove/selectMove");
const showed_moves_1 = require("./pages/showed-moves/showed-moves");
const BASE_PATH = "/desafio-5";
function isGithubPages() {
    return location.host.includes("gonzacunet.github.io");
}
const routes = [
    {
        path: /\/home/,
        component: home_1.initHome,
    },
    {
        path: /\/init/,
        component: howToPlay_1.inithowToPlay,
    },
    {
        path: /\/selectMove/,
        component: selectMove_1.initSelectMove,
    },
    {
        path: /\/showed-moves/,
        component: showed_moves_1.initShowedMoves,
    },
    {
        path: /\/result/,
        component: result_1.initResult,
    },
];
function initRouter(container) {
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
    }
    else {
        handleRoute(location.pathname);
    }
    window.onpopstate = function () {
        handleRoute(location.pathname);
    };
}
exports.initRouter = initRouter;
