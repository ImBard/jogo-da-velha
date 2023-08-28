export default class Scene {
  constructor(imgs, buttons) {
    this.imgs = Array.from(imgs);
    this.buttons = Array.from(buttons);
  }

  currentUser(id) {
    const img = this.imgs.find(img => img.getAttribute('id') == `x${id}`);
    const button = this.buttons.find(button => button.getAttribute('id').substr(-2) == id);

    button.disabled = true;
    img.classList.remove("hidden");
  }

  enemyUser(id) {
    const img = this.imgs.find(img => img.getAttribute('id') == `circle${id}`);
    const button = this.buttons.find(button => button.getAttribute('id').substr(-2) == id);

    button.disabled = true;
    img.classList.remove("hidden");
  }

  finish(data) {
    for (let i = 0; i < 3; i++) {
      let tag = document.getElementById(data[i]);
      tag.style.backgroundColor = "#ff0000";
    }
    let playerWinner = document.getElementById('winner')
    playerWinner.classList.remove("hidden")
  }
}

