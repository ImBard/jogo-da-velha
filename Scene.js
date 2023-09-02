export default class Scene {
  constructor(imgs, buttons) {
    this.imgs = Array.from(imgs);
    this.buttons = Array.from(buttons);
    this.turn = false;
  }
  
  currentUser(id) {
    const img = this.imgs.find(img => img.getAttribute('id') == `x${id}`);
    const button = this.buttons.find(button => button.getAttribute('id') == `button${id}`);
    
    button.disabled = true;
    img.classList.remove("hidden");
    this.turn = !this.turn;
    
  }
  
  enemyUser(id) {
    const img = this.imgs.find(img => img.getAttribute('id') == `circle${id}`);
    const button = this.buttons.find(button => button.getAttribute('id') == `button${id}`);
    
    button.disabled = true;
    img.classList.remove("hidden");
    this.turn = !this.turn;
  }

  finish(data, winner) {
    for (let i = 0; i < 3; i++) {
      let tag = document.getElementById(data[i]);
      tag.style.backgroundColor = "#ff0000";
    }
    let playerWinner = document.getElementById('winner');
    playerWinner.innerHTML = `Jogador ${winner} ganhou!`;
    playerWinner.classList.remove("hidden");
  }
}

