"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/selectmove", component: "selectmove-page" },
    { path: "/showedmoves", component: "showedmoves-page" },
    { path: "/newgame", component: "newgame-page" },
    { path: "/result", component: "result-page" },
    { path: "/coderoom", component: "coderoom-page" },
    { path: "/howtoplay", component: "howtoplay-page" },
    { path: "(.*)", redirect: "/" },
]);
