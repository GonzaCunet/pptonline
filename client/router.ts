import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/selectmove", component: "selectmove-page" },
  { path: "/showedmoves", component: "showedmoves-page" },
  { path: "/newgame", component: "newgame-page" },
  { path: "/result", component: "result-page" },
  { path: "/coderoom", component: "coderoom-page" },
  { path: "/howtoplay", component: "howtoplay-page" },
  { path: "/entryname", component: "entryname-page" },
  { path: "(.*)", redirect: "/" },
]);
