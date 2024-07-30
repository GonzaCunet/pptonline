"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const rtdb_1 = require("./rtdb");
const lodash_1 = require("lodash");
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
        history: { scoreHuman: 0, scoreComputer: 0 },
        listeners: [],
    },
    setComputerMove() {
        const randomMove = Math.floor(Math.random() * 3) + 1;
        let computerPlay = {
            1: "piedra",
            2: "papel",
            3: "tijera",
        }[randomMove];
        const currentState = this.getState();
        currentState.currentGame.computerPlay = computerPlay;
    },
    setMove(move) {
        const currentState = this.getState();
        currentState.currentGame.myPlay = move;
    },
    pushToHistory(play) {
        const currentState = this.getState();
        currentState.history(play);
    },
    whoWins(myPlay, computerPlay) {
        const currentState = this.getState();
        const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
        const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";
        const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
        const humanWin = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true);
        const perdiConPiedra = myPlay == "piedra" && computerPlay == "papel";
        const perdiConPapel = myPlay == "papel" && computerPlay == "tijera";
        const perdiConTijera = myPlay == "tijera" && computerPlay == "piedra";
        const humanLoss = [perdiConPapel, perdiConPiedra, perdiConTijera].includes(true);
        if (humanWin == true) {
            currentState.history.scoreHuman++;
            return "ganaste";
        }
        if (humanLoss == true) {
            currentState.history.scoreComputer++;
            return "perdiste";
        }
        else {
            return "empate";
        }
    },
    getState() {
        return this.play;
    },
    setState(newState) {
        this.play = newState;
        for (const callback of this.listeners) {
            callback();
        }
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    auth(nombre) {
        return fetch(rtdb_1.API_BASE_URL + "/auth", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nombre: nombre }),
        }).then((res) => {
            return res.json();
        });
    },
    setRoom(userId, nombre) {
        return fetch(rtdb_1.API_BASE_URL + "/rooms", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userId: userId, nombre: nombre }),
        }).then((res) => {
            return res.json();
        });
    },
    async joinRoom(roomId, userId) {
        return fetch(rtdb_1.API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
            method: "get",
            headers: { "content-type": "application/json" },
        }).then((res) => {
            return res.json();
        });
    },
    async getRoomData(rtdbRoomId) {
        return fetch(rtdb_1.API_BASE_URL + "/rooms/" + rtdbRoomId, {
            method: "get",
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
        const datoguardado = (0, lodash_1.values)(dataagregada);
        currentState.currentGame.dataagregada = datoguardado;
        datoguardado.forEach((e) => {
            if (e.nombre == state.play.currentGame.myName) {
                state.play.currentGame.myPlay = e.jugada;
                state.play.currentGame.myScore = e.scoreboard;
                state.play.currentGame.myOnline = e.online;
                state.play.currentGame.myStart = e.start;
            }
            else {
                state.play.currentGame.nameP2 = e.nombre;
                state.play.currentGame.playP2 = e.jugada;
                state.play.currentGame.scoreP2 = e.scoreboard;
                state.play.currentGame.startP2 = e.start;
                state.play.currentGame.onlineP2 = e.online;
            }
        });
    },
    async changeRoom(rtdbRoomId, userID) {
        return fetch(rtdb_1.API_BASE_URL + "/rooms/" + rtdbRoomId, {
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
    // async startApp(rtdbId) {
    //   this.data.rtdbId = rtdbId;
    //   const apiRespuesta = await fetch(API_BASE_URL + "/mensajes/" + rtdbId, {
    //     method: "get",
    //   });
    //   const mensajes = await apiRespuesta.json();
    //   state.saveData(mensajes);
    //   const chatroomsRef = dataBase.ref("/rooms/" + rtdbId + "/data");
    //   chatroomsRef.on("value", (snapshot) => {
    //     const valor = snapshot.val();
    //     this.setMensajes(valor);
    //     for (const cb of this.listeners) {
    //       cb();
    //     }
    //   });
    // },
};
exports.state = state;
