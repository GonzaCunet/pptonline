"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./components/button");
require("./components/moves-el");
require("./components/resultadoEl");
require("./components/scoreboard");
const router_1 = require("./router");
function main() {
    const root = document.querySelector(".root");
    (0, router_1.initRouter)(root);
}
main();
