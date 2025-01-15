document.querySelector("#rock-btn").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector("#paper-btn").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector("#scissors-btn").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector("#reset-btn").addEventListener("click", () => {
  resetScore();
});

const displyResult = document.querySelector(".js-result");

const displyMoves = document.querySelector(".js-moves");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

// Function to get result using Object Mapping
function getGameResult(playerMove, computerMove) {
  const outcomes = {
    rock: { rock: "Tie.", paper: "You Lose.", scissors: "You Win." },
    paper: { rock: "You Win.", paper: "Tie.", scissors: "You Lose." },
    scissors: { rock: "You Lose.", paper: "You Win.", scissors: "Tie." },
  };
  return outcomes[playerMove][computerMove];
}

// Function to pick a random computer move
function pickComputerMove() {
  const moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}

// Main Game Function
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const result = getGameResult(playerMove, computerMove);

  //*update score*

  result === "You Win." && score.wins++;
  result === "You Lose." && score.losses++;
  result === "Tie." && score.ties++;

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  displyResult.innerHTML = result;

  displyMoves.innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon" />
  <img src="images/${computerMove}-emoji.png" class="move-icon" />
  Computer`;
}

//Update Score Function
function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins : ${score.wins} , losses : ${score.losses} , ties : ${score.ties}`;
}

//Reset Score Function
function resetScore() {
  score.losses = 0;
  score.ties = 0;
  score.wins = 0;
  localStorage.removeItem("score");
  displyMoves.innerHTML = "";
  displyResult.innerHTML = "";
  updateScore();
}
