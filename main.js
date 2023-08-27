const p1 = []// X
const p2 = []// O
let user = true;
// true = p1 = x
// false = p2 = O
let alguemGanhou = false;

const possibilities = [
  ['a1', 'a2', 'a3'],
  ['b1', 'b2', 'b3'],
  ['c1', 'c2', 'c3'],
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  ['a1', 'b2', 'c3'],
  ['a3', 'b2', 'c1'],
]

function place(id) {
  if (user) {
    console.log(`img${id}`);
    // pegar img e botão
    let img = document.getElementById(`x${id}`);
    let button = document.getElementById(`button${id}`);

    // Manipular os elementos
    button.disabled = true;
    img.classList.remove("hidden");

    // adicionar posição para o player e chamar função que verifica se ele ganhou
    p1.push(id);
    user = false
    ganhou(p1);
  } else {
    // pegar img e botão
    let img = document.getElementById(`circle${id}`);
    let button = document.getElementById(`button${id}`);

    // Manipular os elementos
    button.disabled = true;
    img.classList.remove("hidden");

    p2.push(id);
    user = true;
    ganhou(p2);
  }
  console.log(p1, p2)
}

function ganhou(player) {
  for (let possibility of possibilities) {
    let c = 0;
    player.map((item) => {
      if (possibility.includes(item)) c++;
    })
    if (c == 3) {
      return finish(possibility);
    }
  }

  if (p1.length + p2.length == 9 && !alguemGanhou) {
    alert("Empate!")
  }
}

function finish(data) {
  for (let i = 0; i < 3; i++) {
    let tag = document.getElementById(data[i]);
    tag.style.backgroundColor = "#ff0000";
  }
  let playerWinner = document.getElementById('winner')
  playerWinner.classList.remove("hidden")
  alguemGanhou = true;
}



