import WebSocketClient from './websocket.js';
import Scene from './Scene.js';
const reader = new FileReader();
let websocketClient;
let turn = true

const roomId = "1";
const usuario = document.getElementById("usuario");
const botaoConectar = document.getElementById("conectar");
const buttons = document.querySelectorAll(".game-button");
const imgs = document.querySelectorAll('img[id^="circle"], img[id^="x"]');

const scene = new Scene(imgs, buttons);

// Pegar usuario do usuário e conectar
botaoConectar.addEventListener("click", function () {
  const username = usuario.value;
  websocketClient = new WebSocketClient(roomId, username, response => {
    console.log(response)
    if (Array.isArray(response)) {
      const result = JSON.parse(response);
      scene.finish(result[1]);
    }
    if (Array.isArray(response)) {
      scene.finish(response[1]);
    } else {
      enemyUser(response);
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
  websocketClient.send(id);
  scene.currentUser(id);
  turn = !turn;
}
function enemyUser(id) {
  scene.enemyUser(id);
  turn = !turn;
}

// async function parseResponse(blob) {
//   try {
//     const content = await blob.text();
//     const parsedData = JSON.parse(content);

//     if (Array.isArray(parsedData) && parsedData.length === 2) {
//       const [isWinner, message] = parsedData;
//       console.log('Is Winner:', isWinner);
//       console.log('Message:', message);

//       if (typeof isWinner === 'boolean' && typeof message === 'string') {
//         // Você pode usar os valores isWinner e message da maneira apropriada
//       } else {
//         console.error('Formato inválido dos dados recebidos.');
//       }
//     } else {
//       console.error('Formato inválido dos dados recebidos.');
//     }

//     // ... Resto do código ...

//   } catch (error) {
//     console.error('Erro ao processar a resposta:', error);
//   }
// };



reader.onload = function (event) {
  const arrayBuffer = event.target.result; // Obtém os dados como um ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer); // Converte o ArrayBuffer em um Uint8Array

  // Agora você pode manipular o Uint8Array conforme necessário
  console.log(uint8Array);

  // Exemplo: Converter os dados em uma string (assumindo que é texto)
  const text = new TextDecoder().decode(uint8Array);
  console.log(text);
};

