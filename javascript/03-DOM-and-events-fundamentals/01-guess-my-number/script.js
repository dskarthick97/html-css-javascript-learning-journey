"use strict";

// ---------- 01 dom manipulation. ----------
/*
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "Correct number";
console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 20;

document.querySelector(".guess").value = 18;
*/

// ---------- 02 handling click events. ----------
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// addEventListener(event that we are listening for, function)
document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  // When there is no input.
  if (!guess) {
    // document.querySelector(".message").textContent = "No number";
    displayMessage("No number");

    // when the guess is correct.
  } else if (guess === secretNumber) {
    displayMessage("Correct Number");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too High!!" : "Too Low!!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("Lost the game");
      document.querySelector(".score").textContent = 0;
    }
  }
  // when the guess is too high.
  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent = "Too High!!";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "Lost the game";
  //       document.querySelector(".score").textContent = 0;
  //     }

  //     // when the guess is too low.
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent = "Too Low!!";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "Lost the game";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   }
});

// challenge 01
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
