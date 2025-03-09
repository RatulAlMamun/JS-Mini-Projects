// Set minimum and maximum
const minNumber = 1,
  maxNumber = 10;
let randomNumber, guessCount, isGameOver;

// Get UI elements
const minNumUI = document.querySelector(".min-num");
const maxNumUI = document.querySelector(".max-num");
const guessInputUI = document.getElementById("guess-input");
const guessSubmitUI = document.getElementById("guess-submit");
const showMessageUI = document.querySelector(".message");

// Initialize game
function initGame() {
  randomNumber = generateRandom(minNumber, maxNumber);
  guessCount = 3;
  isGameOver = false;
  guessInputUI.disabled = false;
  guessInputUI.style.borderColor = "#D1D1D1";
  showMessage("");
  guessSubmitUI.value = "Submit";
  guessInputUI.value = "";
}

// Set UI values
[minNumUI.textContent, maxNumUI.textContent] = [minNumber, maxNumber];
initGame();

// Event Listener
guessSubmitUI.addEventListener("click", (e) => {
  e.preventDefault();
  if (isGameOver) return initGame();

  const inputNumber = parseInt(guessInputUI.value);
  guessInputUI.value = "";

  if (!isValidNumber(inputNumber)) {
    return showMessage(
      `Please enter a number between ${minNumber} and ${maxNumber}`,
      "red"
    );
  }

  processGuess(inputNumber);
});

// Validate number
function isValidNumber(num) {
  return !isNaN(num) && num >= minNumber && num <= maxNumber;
}

// Process guess
function processGuess(number) {
  if (number === randomNumber) {
    endGame(true, `${number} is correct, YOU WIN!`);
  } else {
    guessCount--;
    guessCount === 0
      ? endGame(
          false,
          `Game Over, you lost. The correct number was ${randomNumber}`
        )
      : showMessage(
          `Guess is not correct, ${guessCount} guess${
            guessCount > 1 ? "es" : ""
          } left`,
          "red"
        );
  }
}

// Show message
function showMessage(msg, color = "black") {
  showMessageUI.style.color = color;
  showMessageUI.textContent = msg;
}

// Generate random number
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// End game
function endGame(isWon, msg) {
  isGameOver = true;
  guessInputUI.disabled = true;
  guessInputUI.style.borderColor = isWon ? "green" : "red";
  showMessage(msg, isWon ? "green" : "red");
  guessSubmitUI.value = "Play Again";
}
