export default class Player {
  constructor() {
    this.turn = false;
    this.names = {
      player1: "",
      player2: ""
    }
  }

  setPlayerName(players) {
      this.names.player1 = players.player1;
      this.names.player2 = players.player2;
  }

  setTurn() {
    this.turn = !this.turn;
  }

  getTurn() {
    return this.turn;
  }
  
}

