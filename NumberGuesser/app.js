// Set minimum and maximum
const minNumber = 1;
const maxNumber = 100;

// Random number and guess count
let randomNumber = generateRandom(minNumber, maxNumber);
let guessCount = 3;
let isGameOver = false;

// Get the elements from UI
const minNumUI = document.querySelector(".min-num");
const maxNumUI = document.querySelector(".max-num");
const guessInputUI = document.getElementById("guess-input");
const guessSubmitUI = document.getElementById("guess-submit");
const showMessageUI = document.querySelector(".message");

// Set the value to UI for min and max number
minNumUI.textContent = minNumber;
maxNumUI.textContent = maxNumber;

// Listen for guess submit
guessSubmitUI.addEventListener("click", (e) => {
  e.preventDefault();

  if (isGameOver) return playAgain();

  const inputNumber = parseInt(guessInputUI.value);
  guessInputUI.value = "";

  // Check if the number is valid
  if (isNaN(inputNumber)) return showError("Please check your input!");

  if (checkGuess(inputNumber)) {
    isGameOver = true;
    guessSubmitUI.value = "Play Again";
    return showSuccess("Yeee! Your guess is right.");
  } else {
    if (guessCount == 0) {
      isGameOver = true;
      guessSubmitUI.value = "Play Again";
      return showError("Sorry! You're out of guess. GAME OVER!");
    }
    showWarning(
      `You have ${guessCount} guess${guessCount > 1 ? "es" : ""} left!`
    );
  }
});

// Show Error
function showError(msg) {
  guessInputUI.style.borderColor = "red";
  showMessageUI.style.color = "red";
  showMessageUI.textContent = msg;
}

// Show Success
function showSuccess(msg) {
  guessInputUI.style.borderColor = "green";
  showMessageUI.style.color = "green";
  showMessageUI.textContent = msg;
}

// Show Warning
function showWarning(msg) {
  guessInputUI.style.borderColor = "#3f5e51";
  showMessageUI.style.color = " #3f5e51";
  showMessageUI.textContent = msg;
}

// Generate random Number
function generateRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Play Again
function playAgain() {
  isGameOver = false;
  guessCount = 3;
  guessInputUI.style.borderColor = "#D1D1D1";
  randomNumber = generateRandom(minNumber, maxNumber);
  showMessageUI.textContent = "";
  guessSubmitUI.value = "Submit";
  guessInputUI.value = "";
}

// Check the guess
function checkGuess(number) {
  if (number === randomNumber) {
    return true;
  } else {
    guessCount -= 1;
    return false;
  }
}
