export type jugada = "piedra" | "papel" | "tijera";
type game = {
  computerPlay: jugada;
  myPlay: jugada;
};
const state = {
  play: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
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

  setMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
  },

  pushToHistory(play: game) {
    const currentState = this.getState();
    currentState.history(play);
  },
  whoWins(myPlay: jugada, computerPlay: jugada) {
    const currentState = this.getState();
    const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";
    const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
    const humanWin = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(
      true
    );

    const perdiConPiedra = myPlay == "piedra" && computerPlay == "papel";
    const perdiConPapel = myPlay == "papel" && computerPlay == "tijera";
    const perdiConTijera = myPlay == "tijera" && computerPlay == "piedra";
    const humanLoss = [perdiConPapel, perdiConPiedra, perdiConTijera].includes(
      true
    );

    if (humanWin == true) {
      currentState.history.scoreHuman++;
      return "ganaste";
    }
    if (humanLoss == true) {
      currentState.history.scoreComputer++;
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
    for (const callback of this.listeners) {
      callback();
    }
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
