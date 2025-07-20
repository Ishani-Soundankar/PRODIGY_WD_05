const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const toggleTheme = document.getElementById("toggleTheme");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let boardState = Array(9).fill("");
let isGameActive = true;
let scores = { X: 0, O: 0 };

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!boardState[index] && isGameActive) {
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("filled");

    if (checkWinner(currentPlayer)) {
      message.textContent = `Player ${currentPlayer} wins!`;
      scores[currentPlayer]++;
      updateScores();
      isGameActive = false;
    } else if (boardState.every(cell => cell)) {
      message.textContent = "It's a draw!";
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner(player) {
  return winCombos.some(combo =>
    combo.every(index => boardState[index] === player)
  );
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function resetGame() {
  boardState = Array(9).fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("filled");
  });
  currentPlayer = "X";
  isGameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
toggleTheme.addEventListener("click", toggleDarkMode);
