import WebSocketClient from './websocket.js';
import Scene from './Scene.js';
import Player from './players.js';
let websocketClient;
const nameP1 = document.getElementById("player1")
const nameP2 = document.getElementById("player2")
const border = document.getElementById("tbody");

const usuario = document.getElementById("usuario");
const sala = document.getElementById("sala")
const botaoConectar = document.getElementById("conectar");
const buttons = document.querySelectorAll(".game-button");
const imgs = document.querySelectorAll('img[id^="circle"], img[id^="x"]');

const scene = new Scene(imgs, buttons);
const players = new Player();

// Pegar usuario do usuário e conectar
botaoConectar.addEventListener("click", function () {
  const username = usuario.value;
  const roomId = sala.value;
  document.getElementById("salaId").innerHTML += roomId;
  websocketClient = new WebSocketClient(roomId, username, response => {
    let gameResult;
    console.log(response);
    if (response === "inicia_o_jogo") {
      players.setTurn();
    }
    try {
      gameResult = JSON.parse(response);
      console.log(gameResult);
      if (gameResult.hasOwnProperty('player1')) {
        players.setPlayerName(gameResult);
        nameP1.innerHTML += gameResult.player1;
        nameP2.innerHTML += gameResult.player2;
        nameP1.classList.add("text-blue-400");
      }
    } catch (error) {
      gameResult = response;
    }

    // if (players.getTurn() && players.names.player2 !== "") {
    //   border.classList.add("border-blue-500");
    //   border.classList.remove("border-red-500");
    // } else if (!players.getTurn()){
    //   border.classList.add("border-red-500");
    //   border.classList.remove("border-blue-500");
    // }

    if (gameResult.result === true) {
      scene.finish(gameResult.moves, gameResult.winner);

      buttons.forEach(button => {
        button.disabled = true;
      })
    } else {
      enemyUser(gameResult);
    }

  });
});

// Enviar o movimento do jogador
document.addEventListener('DOMContentLoaded', () => {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('id').replace('button', '');
      currentUser(id);
    })
  })
})

//  Enviar a jogada 
function currentUser(id) {
  if (players.getTurn()) {
    websocketClient.send(id);
    scene.currentUser(id);
    players.setTurn(!players.getTurn);
  }
  
}

function enemyUser(id) {
  if (!players.getTurn()) {
    scene.enemyUser(id);
    players.setTurn(!players.getTurn);
  }
}

