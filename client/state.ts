import { rtdb } from "../server/db";
import { API_BASE_URL } from "./rtdb";
import { dataBase } from "./rtdb";
import { values } from "lodash";
export type jugada = "piedra" | "papel" | "tijera";
type game = {
  computerPlay: jugada;
  myPlay: jugada;
};
const state = {
  play: {
    currentGame: {
      dataagregada: [],
      computerPlay: "",
      myPlay: "",
      myName: "",
      myId: "",
      myScore: 0,
      myStart: false,
      myOnline: true,
      idP2: "",
      nameP2: "",
      playP2: "",
      scoreP2: 0,
      startP2: false,
      onlineP2: false,
      roomId: "",
      rtdbRoomId: "",
    },
  },
  listeners: [],
  // setComputerMove() {
  //   const randomMove = Math.floor(Math.random() * 3) + 1;
  //   let computerPlay = {
  //     1: "piedra",
  //     2: "papel",
  //     3: "tijera",
  //   }[randomMove];
  //   const currentState = this.getState();
  //   currentState.currentGame.computerPlay = computerPlay;
  // },
  setMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
  },

  pushToHistory(play: game) {
    const currentState = this.getState();
    currentState.history(play);
  },
  whoWins(myPlay: jugada, playP2: jugada) {
    const ganeConPiedra = myPlay == "piedra" && playP2 == "tijera";
    const ganeConTijera = myPlay == "tijera" && playP2 == "papel";
    const ganeConPapel = myPlay == "papel" && playP2 == "piedra";
    const IWin = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true);

    const perdiConPiedra = myPlay == "piedra" && playP2 == "papel";
    const perdiConPapel = myPlay == "papel" && playP2 == "tijera";
    const perdiConTijera = myPlay == "tijera" && playP2 == "piedra";
    const Iloss = [perdiConPapel, perdiConPiedra, perdiConTijera].includes(
      true
    );

    if (IWin === true) {
      state.play.currentGame.myScore++;
      return "ganaste";
    }
    if (Iloss === true) {
      return "perdiste";
    } else {
      return "empate";
    }
  },

  getState() {
    return this.play;
  },
  setState(newState) {
    this.play = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },

  auth(nombre) {
    return fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nombre: nombre }),
    }).then((res) => {
      return res.json();
    });
  },
  async setRoom(userId, nombre) {
    return fetch(API_BASE_URL + "/rooms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: userId, nombre: nombre }),
    }).then((res) => {
      return res.json();
    });
  },

  async joinRoom(userId: string, name: string, rtdbRoomId: string) {
    return fetch(API_BASE_URL + "/room/join", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        name: name,
        rtdbRoomId: rtdbRoomId,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async patchData(rtdbRoomId, userID) {
    return fetch(API_BASE_URL + "/room/" + rtdbRoomId, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userID: userID,
        updateObject: {
          jugada: state.play.currentGame.myPlay,
          nombre: state.play.currentGame.myName,
          online: state.play.currentGame.myOnline,
          scoreboard: state.play.currentGame.myScore,
          start: state.play.currentGame.myStart,
        },
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async getRoomId(roomId, userId) {
    return fetch(API_BASE_URL + "/room/" + roomId + "?userId=" + userId, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  },
  async getRoomData(rtdbRoomId) {
    return fetch(API_BASE_URL + "/rooms/" + rtdbRoomId, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.saveData(res);
      });
  },
  saveData(dataagregada) {
    const currentState = this.getState();
    const datoguardado = values(dataagregada);
    currentState.currentGame.dataagregada = datoguardado;

    datoguardado.forEach((e) => {
      if (e.nombre == state.play.currentGame.myName) {
        state.play.currentGame.myPlay = e.jugada;
        state.play.currentGame.myScore = e.scoreboard;
        state.play.currentGame.myOnline = e.online;
        state.play.currentGame.myStart = e.start;
      } else {
        state.play.currentGame.nameP2 = e.nombre;
        state.play.currentGame.playP2 = e.jugada;
        state.play.currentGame.scoreP2 = e.scoreboard;
        state.play.currentGame.startP2 = e.start;
        state.play.currentGame.onlineP2 = e.online;
      }
    });
  },

  async changeRoom(rtdbRoomId, userID) {
    return fetch(API_BASE_URL + "/rooms/" + rtdbRoomId, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userID: userID,
        updateObject: {
          jugada: state.play.currentGame.myPlay,
          nombre: state.play.currentGame.myName,
          online: state.play.currentGame.myOnline,
          scoreboard: state.play.currentGame.myScore,
          start: state.play.currentGame.myStart,
        },
      }),
    });
  },

  startApp(rtdbRoomId) {
    const roomsRef = dataBase.ref("/roomsppt/" + rtdbRoomId);
    roomsRef.on("value", (snapshot) => {
      const valor = snapshot.val();
      this.saveData(valor);

      for (const cb of this.listeners) {
        cb();
      }
    });
  },
};

export { state };
