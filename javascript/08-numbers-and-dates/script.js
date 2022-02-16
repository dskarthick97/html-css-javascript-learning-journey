"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Panjavan Pariventhan",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2022-02-15T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Kosaksi Pasapugazh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// formatting the currency
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    // internationalizing numbers
    const formattedMovement = formatCurrency(
      mov,
      account.locale,
      account.currency
    );
    // new Intl.NumberFormat(account.locale, {
    //   style: "currency",
    //   currency: account.currency,
    // }).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);
  // `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );
  // `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
  // `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// logout functionality using timer functions
const startLogoutTimer = function () {
  const tick = function () {
    const minutes = String(Math.trunc(timer / 60)).padStart(2, 0);
    const seconds = timer % 60;

    // in each callback call, print the remaining time to UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // after the timer expires i.e., at 0, stop timer and logout the user
    if (timer === 0) {
      clearInterval(logoutIntervalTimer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    timer--; // decrease 1s
  };

  // setting the time to 5mins
  let timer = 120;

  // call the timer every seconds
  tick();
  const logoutIntervalTimer = setInterval(tick, 1000);
  return logoutIntervalTimer;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let logoutIntervalTimer;

// faking always logged in --> for testing purpose
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// implementing date using Date module
// const now_ = new Date();
// const day = `${now_.getDate()}`.padStart(2, 0);
// const month = `${now_.getMonth() + 1}`.padStart(2, 0);
// const year = now_.getFullYear();
// const hour = now_.getHours();
// const minutes = now_.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

// implementing date and time using internalization apis
const now_ = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", // other options - long, 2-digit
  year: "numeric",
  weekday: "long",
};

/*
by default Intl displays only the date and not time. Have to provide options
to the object if needed time along with date. see ln no: 194

locale list --> http://www.lingoes.net/en/translator/langcode.htm
*/
const locale = navigator.language; // getting the locale from the browser
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now_);

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // current date and time
    const now_ = new Date();
    // const day = `${now_.getDate()}`.padStart(2, 0);
    // const month = `${now_.getMonth() + 1}`.padStart(2, 0);
    // const year = now_.getFullYear();
    // const hour = `${now_.getHours()}`.padStart(2, 0);
    // const minutes = `${now_.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // see ln. no: 194 for more info
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", // other options - long, 2-digit
      year: "numeric",
      // weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now_);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // logout functionality
    if (logoutIntervalTimer) clearInterval(logoutIntervalTimer);
    logoutIntervalTimer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value); // +inputTransferAmount.value
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // reset the timer
    clearInterval(logoutIntervalTimer);
    logoutIntervalTimer = startLogoutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // reset the timer
      clearInterval(logoutIntervalTimer);
      logoutIntervalTimer = startLogoutTimer();
    }, 2500);
  }

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* ---------- 01 Numbers ---------- */
/* 
all numbers are represented internally as floating point numbers. That's
why there is only one number type - number

numbers are stored as binary format (base 2). So we cannot do precise scientific
calculations in js
base 10 - 0 to 9. Here 1/10 = 0.1 where 3/10 = 3.33333..
binary is base 2 - 0 and 1. Here 1/10 = 0.10000...
*/
console.log(23 === 23.0); // true
console.log(0.1 + 0.2); // 0.300000000004
console.log(0.1 + 0.2 === 0.3); // false. But it has to be true

// converting string to number
console.log(Number("23"));
console.log(+"23"); // much cleaner way

// parsing
console.log(Number.parseInt("30px", 10)); // 30. Will automatically figure out the numbers
console.log(Number.parseInt("e20", 10)); // NaN. Should start with a number

console.log(Number.parseFloat("2.5rem")); // 2.5
console.log(Number.parseInt("2.5rem")); // 2

// above methods are global functions. We can also call as parseInt and
// parseFloat. But the modern js recommends to call these methods using the
// Number object where Number is a namespace

// check if the value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN("20")); // false
console.log(Number.isNaN(+"20")); // true

23 / 0; // Infinite type

// check if the value is number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite("20")); // false
console.log(Number.isFinite(23 / 0)); // false

/* ---------- 02 Math and rounding ---------- */
// Math is a namespace
Math.sqrt(16); // 4
16 ** (1 / 2); // 4. same as Math.sqrt method

Math.max(1, 2, 3, 4, 5, 6); // 6
Math.max(1, 2, 3, 4, "5"); // 6. max method will do type coercion
Math.max(1, 2, 3, 4, "5px"); // NaN. It won't do parsing

Math.min(1, 2, 3, 4, 5, 6); // 1

Math.PI; // pi value
Math.PI * Number.parseFloat("10px") ** 2; // pi r sqaure

Math.trunc(Math.random() * 6) + 1;

// 0...1 -> 0...(max - min) -> min...(max - min + min) -> min...max
const randomInt = (minNum, maxNum) =>
  Math.trunc(Math.random() * (maxNum - minNum) + 1) + minNum;

// rounding integers
Math.trunc(23.3); // 23
Math.round(23.3); // 23. rounds it to the nearest value

Math.ceil(23.9); // 24. rounds it to the highest value
Math.floor(23.9); // 23. rounds it to the lowest value

/*
all the above methods do type coercion
Math.trunc and Math.floor works exactly the same for positive numbers. For
negative numbers,floor works the opposite
floor is better than trunc
*/
Math.trunc(-23.3); // -23
Math.floor(-23.3); // -24.

// rounding decimals. With decimals, it works in a little diff way
(2.7).toFixed(0); // 3 of type string. toFixed method returns a string
(2.7).toFixed(3); // 2.700. 3 as argument represents length after the decimal point
(2.345).toFixed(2); // 2.35. To convert into number insert + sign or use Number

/* ---------- 03 Remainder operator ---------- */
// also called modulo operator. It returns the remainder of a division
5 % 2; // 1
8 % 3; // 2

// checking even or odd
const isEven = (num) => num % 2 === 0;
isEven(8); // true
isEven(23); // false

labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, index) => {
    if (index % 2 === 0) row.style.backgroundColor = "orangered";
    if (index % 3 === 0) row.style.backgroundColor = "blue";
  });
});

/* ---------- 04 Numeric separators ---------- */
// feature of 2021. Used to format numbers
let solarSystemDiameter = 287460000000; // hard to read this

// numeric separator helps with readablility
solarSystemDiameter = 287_460_000_000; // js engine ignores the separators

const priceInCents = 345_99;
const transferFee = 15_00; // 15 dollars and 0 cents

// Exception: converting string with numeric separator (underscore) won't work
Number("230000"); // work
Number("230_000"); // NaN. won't work
Number.parseInt("230_000"); // 230

/* ---------- 05 Bigint ---------- */
/*
special type of integer introduced in 2020.

Numbers are internally represented as 64 bits i.e., there are exactly 64 0s and
1s to represent any given number. Only 53 are used to store digits and rest of
them are used to store position of decimal points and the signs
*/

// the biggest number that js can safely represent
2 ** 53 - 1; // 9007199254740991. 2 is because of base 2 (0s and 1s)
Number.MAX_SAFE_INTEGER; // 9007199254740991

// in order to store and safely represent bigger numbers than above number.
// use bigint - added as a new primitive type from es2020
console.log(123456789987654321); // won't produce precise numbers
console.log(123456789987654321n); // type bigint
BigInt(123456789987654321); // similar to above code

// operator works same with bigInt
10000n + 10000n;

const largeNumber = 4987954649875468987987643132131n;
const regularNumber = 23;
// largeNumber * regularNumber; // error. Coz different value types
largeNumber * BigInt(regularNumber); // work

// exception cases
20n > 15; // true. will work as expected
20n === 20; // false
// bigint is converted to string
`${largeNumber} is of type bigint`; // 4987954649875468987987643132131 is of type bigint

// won't work with Math operations

// divisions
10n / 3n; // 3n. returns the closest bigint number

/* ---------- 06 Dates and Time ---------- */
// creating Dates
// 01
const now = new Date();
console.log(now);

// 02
console.log(new Date("Feb 16 2022"));

// 03
console.log(new Date(2022, 1, 16, 11, 30));
// 33rd day of month is not available. So will auto-correct happens
console.log(new Date(2022, 10, 33));

// providing ms will convert it to a date based on unix time
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 1000 is to convert milliseconds

// working with Dates have their own methods
const future = new Date(2049, 10, 19, 15, 23); // month starts with 0
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // day of week. Starts with 0
future.getHours();
future.getMinutes();
future.getSeconds();

future.toISOString(); // working with internationalization
future.getTime(); // timestamp (milliseconds)

// timestamp of current moment
Date.now();

future.setFullYear(2099); // changing the year of the already setted date

/* ---------- 07 Operations / calculations with Dates ---------- */
// can change date into number type which result in a timestamp
Number(future);

// performs operations between two dates and returns the result of it
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
calcDaysPassed(new Date(2049, 3, 14), new Date(2049, 3, 24));

/* ---------- 07 Internationalizing (intl) dates and numbers ---------- */
// Intl - used for formatting dates and numbers based on the persons locale
// for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

// 01 Internationalizing Dates --> refer ln. no 194

/// 02 Internationalizing Numbers
const testNum = 3889098.18;
const options_ = {
  style: "unit", // other options --> percent, currency
  unit: "celsius",

  style: "currency",
  currency: "EUR",

  useGrouping: false,
}; // style has to defined explicitly as it's not available in the locale

console.log(
  new Intl.NumberFormat(navigator.language, options_).format(testNum)
);

/* ---------- 08 Timers: setTimeout and setInterval ---------- */
/*
two kinds of timers --> setTimeout and setInterval

setTimeout --> run once after a defined time
setInterval --> run continuously after a certain specified interval untill it stopped
*/

// simulating pizza order using setTimeout function
/*
here js won't wait for 3s. It will register the callback function to the callback queue
and start executing the next lines. That call-back function runs asynchronously
*/
setTimeout(() => console.log("Here is your Pizza!!!"), 3000);

// here the function invocation is happening implicitly. so it is difficult to
// pass the arguments. But the function has the internal solution, arguments
// passing after the wait period considered as arguments
setTimeout(
  (ingredient1, ingredient2) =>
    console.log(`Here is your Pizza with ${ingredient1} and ${ingredient2}`),
  3000,
  "mushroom",
  "cheese"
);

// can cancel the timeout period before it actually ends and execute the funtion
const ingredients = ["mushroom", "cheese"];
const pizzaOrderTimer = setTimeout(
  (ingredient1, ingredient2) =>
    console.log(`Here is your Pizza with ${ingredient1} and ${ingredient2}`),
  3000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaOrderTimer);

// setInterval --> runs the function over and over after certain time interval
const interval = setInterval(() => {
  const now = new Date();
  console.log(now);
}, 1000);

// to stop the interval
clearInterval(interval);

// leveraging both the timer functions
const counter = setInterval(() => {
  const now = Date();
  console.log(now);
}, 1000);

setTimeout((interval) => clearInterval(interval), 5000, counter);
