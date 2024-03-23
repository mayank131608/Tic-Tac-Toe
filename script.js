let user1 = prompt("Enter player X name");
let user2 = prompt("Enter player O name");
let player1 = document.querySelector(".p1");
let player2 = document.querySelector(".p2");
player1.innerText = `X = ${user1}`;
player2.innerText = `O =${user2} `;
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let winX=0;
let winO=0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const newGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    player1.innerText = `X = ${user1} (${winX})`;
player2.innerText = `O =${user2} (${winO})`;
  };

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {

    if (winner === 'X') {
      winX++;
        msg.innerText = `Congratulations, Winner is ${user1}`;

    }
    else{
        winO++;
        msg.innerText = `Congratulations, Winner is ${user2}`;
    }
//   msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
container.classList.add("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        // console.log(pos1Val);
        // console.log(typeof (pos1Val));
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);