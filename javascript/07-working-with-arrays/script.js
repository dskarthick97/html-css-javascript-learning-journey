"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Panjavan Pariventhan",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Kosaksi Pasapugazh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Virumandi Santhanam",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Peter Pan",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const movementsRowEl = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${movement} €</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", movementsRowEl);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );
  labelBalance.textContent = `${account.balance} €`;
};

const calcDisplaySummary = function (userAcc) {
  const incomes = userAcc.movements
    .filter((movement) => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = userAcc.movements
    .filter((movement) => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = userAcc.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * userAcc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((accumulator, interest) => accumulator + interest, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// computing usernames
const computeInitials = function (accounts) {
  accounts.forEach(function (account) {
    account.initial = account.owner
      .toLowerCase()
      .split(" ")
      .map((arrElement) => arrElement.at(0))
      .join("");
  });
};
computeInitials(accounts);

const updateUI = function (account) {
  // display balance, summary and movements
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

// login functionality
let currentAcc;

btnLogin.addEventListener("click", function (event) {
  event.preventDefault(); // prevent form from submitting which is a default behavior of form elements

  currentAcc = accounts.find(
    (account) => account.initial === inputLoginUsername.value
  );

  // validate pin
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome back ${currentAcc.owner
      .split(" ")
      .at(0)}`;

    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAcc);
  }
});

// transfer functionality
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    (account) => account.initial === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  // balance validation
  if (
    amount > 0 &&
    transferTo &&
    amount <= currentAcc.balance &&
    transferTo?.initial !== currentAcc.initial
  ) {
    currentAcc.movements.push(-amount);
    transferTo.movements.push(amount);

    updateUI(currentAcc);
  }
});

// loan functionality
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAcc.movement.some((movement) => movement >= amount * 0.1)
  ) {
    currentAcc.movements.push(amount);

    updateUI(currentAcc);
  }

  inputLoanAmount.value = "";
});

// close account functionality
btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  // check if the user and users pin is correct
  if (
    currentAcc.initial === inputCloseUsername.value &&
    currentAcc.pin === Number(inputClosePin.value)
  ) {
    const accIndex = accounts.findIndex(
      (account) => account.initial === currentAcc.initial
    );

    // delete account
    accounts.splice(accIndex, 1); // changes the original array itself

    // hide ui
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/* ---------- 01 Simple Array methods ---------- */
let testArr = ["a", "b", "c", "d", "e"];

// SLICE
testArr.slice(2); // ["c", "d", "e"]
testArr.slice(2, 4); // ["c", "d"]
testArr.slice(-2); // last two element of an array - ["d", "e"]

// to create a shallow copy of an array
testArr.slice(); // [...testArr]

// SPLICE - works similar to splice but it manipulates the original array
testArr.splice(2); // ["c", "d", "e"] and the original testArr = ["a", "b"]

// REVERSE - reverses elements in an array. Manipuates the original array
testArr = ["a", "b", "c", "d", "e"];
const testArr2 = ["j", "i", "h", "g", "f"];
testArr2.reverse(); // this manipulates the original testArr2 array

// CONCAT - concatenate two arrays together
const letters = testArr.concat(testArr2); // ["a", "b", "c", "d", "e", "j", "i", "h", "g", "f"]
[...testArr, ...testArr2];

// JOIN
letters.join("-");

// AT method - from es2020
const atTestArr = [23, 11, 69];
atTestArr.at(0); // atTestArr[0] - both are similar

// getting the last array element
atTestArr[atTestArr.length - 1];
atTestArr.slice(-1)[0];
atTestArr.at(-1);

// at method also works in strings
"Tyler".at(-1); // r

/* ---------- 02 forEach loop ---------- */
// already learnt traditional for and for of loops
/*
Difference between for of and forEach loop is that break statement won't work
in forEach loop. i.e., forEach loop loops continuously till the last element in
an array
*/

// positive are deposit and negatives are withdrawal
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement >= 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You Withdrew ${Math.abs(movement)}`);
  }
}

// using forEact
// forEach passes the current item, index and the entire array it looping
movements.forEach(function (movement, index, array) {
  movement >= 0
    ? console.log(`You deposited ${movement}`)
    : console.log(`You withdrew ${Math.abs(movement)}`);
});

/* ---------- 03 forEach with Map and Sets ---------- */
// with Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, index, map) {});

// with Sets
const uniqueCurrencies = new Set([
  "USD",
  "EUR",
  "GBP",
  "Pound",
  "USD",
  "USD",
  "EUR",
]);

// sets value and index are the same
uniqueCurrencies.forEach(function (value, _, set) {});

/* ---------- 04 Data transformations: map, filter and reduce ---------- */

// map
/*
Difference between forEach and map method is that map methods returns a new
array whereas forEach won't return anything instead it applies the function on
each elements in an array
*/

const euToUsd = 1.1;
const movementsUSD = movements.map((arrElement) => arrElement.euToUsd);

movements.map(function (arrEl, index, arr) {});

// filter
const deposits = movements.filter(function (movement) {
  return movement > 0;
});
console.log(deposits); // [200, 450, 3000, 70, 1300]

const withdrawals = movements.filter(function (movement) {
  return movement < 0;
});
console.log(withdrawals); // [-400, -650, -130];

// reduce
/*
accumulator is like a snow ball

syntax: reduce(callbackFunction, initialValueOfAccumulator);
*/
const balance = movements.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(balance);

// maximum value of movements array
const maxValue = movements.reduce(function (accumulator, movement) {
  return movement > accumulator ? movement : accumulator;
}, movements.at(0));
console.log(maxValue); // 3000

/* ---------- 05 Chaining Methods ---------- */
const totalDepositsUSD = movements
  .filter((movement) => movement > 0)
  .map((movement) => movement * euToUsd)
  .reduce((acccumulator, movement) => acccumulator + movement, 0);

/* ---------- 06 find method ---------- */
/*
used to retrieve an element of an array based on a condition.

1. find and filter are same but the difference is that filter returns all the 
elements in an array that satisfies the condition while find returns the first
element in an array that satisfies the condition

2. filter returns new array while find returns a value

if no element matches the condition, then find will return undefined
*/
movements.find((movement) => movement < 0); // -400

const account = accounts.find((account) => account.owner === "Peter Pan");

/* ---------- 07 findIndex method ---------- */
// works similar to find instead findIndex returns the index

/* ---------- 08 some and every method ---------- */
/*
includes checks whether a certain element is in the array. i.e., it checks for equality
some checks that a certain condition is true in an array.
*/
// some
movements.includes(-130); // true

movements.some((movement) => movement > 0); // true
movements.some((movement) => movement === -130); // similar to code in ln. 367

// every
// it is similar to some but the difference is that the every returns true if
// every element satifies the condition and returns false even if one element
// doesn't satifies
movements.every((movement) => movement > 0); // false
account4.movements.every((movement) => movement > 0); // true

// separate callback
const deposit = (movement) => movement > 0;
movements.some(deposit);

/* ---------- 09 flat and flatMap ---------- */
// flat method goes only one level deep while flattening the array by default
const toBeFlatArr = [[1, 2, 3], [4, 5, 6], 7, 8];
toBeFlatArr.flat(); // [1, 2, 3, 4, 5, 6, 7, 8]

const toBeFlatArrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
toBeFlatArrDeep.flat(); // [1, 2], 3, 4, [5, 6], 7, 8
toBeFlatArrDeep.flat(2); // 1, 2, 3, 4, 5, 6, 7, 8

const overallBalance = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((accumulator, item) => accumulator + item, 0);

// flatMap - combines map and flat method
// NOTE: flatMap goes only one level deep
const overallBalanceV2 = accounts
  .flatMap((account) => account.movements)
  .reduce((accumulator, item) => accumulator + item, 0);

/* ---------- 10 sorting arrays ---------- */
/*
sort actually manipulates the original array

NOTE: sort method sort the array based on strings i.e., it converts every to
string and then sorts it.
*/
const owners = ["Elon", "Jeff", "Richard", "Mark"];
owners.sort(); // ["Elon", "Jeff", "Mark", Richard"];

movements.sort(); // won't work

// return < 0, A will be before B (keep order)
// return > 0, B will be before A (switch order)
movements.sort((currentValue, nextValue) => {
  if (currentValue > nextValue) return 1;
  if (currentValue < nextValue) return -1;
});

/* ---------- 11 Programmatically create and fill arrays ---------- */
// untill we created array lik using [] and new Array

// here the Array constructor function creates empty array if one value is
// passed to it
const weirdArr = new Array(7); // this creates empty array of length 7

// syntax: fill(elementToFillEmptyArray, startIndex, endIndex)
// mutates the original array
weirdArr.fill(1); // this mutates the original array

// from method
const newArr = Array.from({ length: 7 }, () => 1);
console.log(newArr); // [1, 1, 1, 1, 1, 1, 1]

const anotherNewArr = Array.from(
  { length: 7 },
  (_, currentIndex) => currentIndex + 1
); // [1, 2, 3, 4, 5, 6, 7]

// real use case example of Array.from method

// here the querySelectorAll returns an array of elements containing the class
// name movements__value. But it is not a real array so that we can't use array
// methods on it. In order to make it as a real array, pass it to the from method
const movementsValueFromUI = document.querySelectorAll(".movements__value");

// this is similar to [...movementsValueFromUI]
// but the difference is that Array.from method accepts a callback function as
// a second argument. So that we can apply the function in that line itself
const movementsFromUI = Array.from(movementsValueFromUI);
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (element) => Number(element.textContent.replace("€", ""))
  );
});

/* ---------- 12 Exercises ---------- */
// 01 calculate the total deposit across the bank
const bankDepositTotal = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement > 0)
  .reduce((accumulator, movement) => accumulator + movement, 0);

// 02 count how many deposits in the bank is atleast 1000
const numDeposit1000 = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement >= 1000).length;

const numDeposit1000UsingReduce = accounts
  .flatMap((account) => account.movements)
  .reduce((counter, movement) => (movement >= 1000 ? ++counter : counter), 0);

// 03 creating an object / array using reduce
const sums = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (accumulator, movement) => {
      // movement > 0
      //   ? (accumulator.deposits += movement)
      //   : (accumulator.withdrawal += movement);
      accumulator[movement > 0 ? "deposits" : "withdrawal"] += movement;
      return accumulator;
    },
    { deposits: 0, withdrawal: 0 }
  );
const { deposits, withdrawal } = sums;

// 04 title the string
const convertTitleCase = function (title) {
  const capitalize = (word) => word.at(0).toUpperCase() + word.slice(1);

  const exceptionTitleCase = [
    "a",
    "an",
    "and",
    "the",
    "but",
    "or",
    "on",
    "in",
    "with",
  ];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return exceptionTitleCase.includes(word) ? word : capitalize(word);
    })
    .join(" ");

  return titleCase;
};
convertTitleCase("this is a nice title!");
convertTitleCase("and another test string to test convertTitleCase function");
