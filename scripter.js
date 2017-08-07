const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const testWrapper = document.querySelector(".test-wrapper")
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// timer function
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
//comparing the text entered with the provided text
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "orange";
    } else {
      testWrapper.style.borderColor = "red";
    }
  }
}
// start function to run runTimer function
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength == 0 && !timerRunning) {
      timerRunning = true;
      interval = setInterval(runTimer, 100);
  }
}

// reset button function
function reset() {
  clearInterval(interval);
  testArea.value = '';
  timer = [0, 0, 0, 0];
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  interval = null;
  timerRunning = false;
}

// events listiners
testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);
