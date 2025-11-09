const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires practice and patience.",
  "Consistency is the key to improving your typing speed.",
  "Learning to code improves logical thinking.",
  "Hard work beats talent when talent doesn’t work hard."
];

const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");

let time = 60;
let timer;
let mistakes = 0;
let totalTyped = 0;

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
}

function startTest() {
  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();
  getRandomQuote();
  time = 60;
  mistakes = 0;
  totalTyped = 0;
  updateStats();
  startBtn.disabled = true;
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (time > 0) {
    time--;
    timeDisplay.textContent = time;
    calculateStats();
  } else {
    clearInterval(timer);
    inputField.disabled = true;
    startBtn.disabled = false;
  }
}

function calculateStats() {
  const input = inputField.value;
  const quote = quoteDisplay.textContent;
  totalTyped = input.length;

  mistakes = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== quote[i]) mistakes++;
  }

  const correctChars = totalTyped - mistakes;
  const accuracy = totalTyped ? (correctChars / totalTyped) * 100 : 0;
  const timeElapsed = 60 - time;
  const wpm = timeElapsed > 0 ? (correctChars / 5) / (timeElapsed / 60) : 0;

  accuracyDisplay.textContent = `${accuracy.toFixed(1)}%`;
  wpmDisplay.textContent = Math.round(wpm);
}

function updateStats() {
  timeDisplay.textContent = time;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "0%";
}

startBtn.addEventListener("click", startTest);
inputField.addEventListener("input", calculateStats);
