export default class WebSocketClient {
  constructor(roomId, username, responseCallback) {
    this.roomId = roomId;
    this.username = username;
    this.ws = new WebSocket(`ws://localhost:3000/?id=${this.roomId}?username=${this.username}`);
    this.responseCallback = responseCallback;

    this.ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.ws.onmessage = event => {
      const result = event.data;
      // Faça algo com a mensagem recebida, se necessário
      if (this.responseCallback) {
        this.responseCallback(result);
      }
    };


    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  getMove() {
    return this.move;
  }


  send(message) {
    this.ws.send(message);
  }

  close() {
    this.ws.close();
  }
}

