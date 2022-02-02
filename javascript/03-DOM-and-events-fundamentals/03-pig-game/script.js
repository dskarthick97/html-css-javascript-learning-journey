"use strict";

// score elements.
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

// initial conditions.
score0El.textContent = 0;
score1El.textContent = 0;

const diceEl = document.querySelector(".dice");
diceEl.classList.add("hidden");

// rolling dice functionality.
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener("click", function () {
  // 1. generate a random dice roll.
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // 2. display the dice.
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // 3. check for the roll 1. If true, switch to next player.
  if (dice !== 1) {
    // add dice to current score.
    currentScore += dice;
    document.getElementById()
    current0El.textContent = currentScore; // TODO: change later
  } else {
    // switch to next player.
  }
});
