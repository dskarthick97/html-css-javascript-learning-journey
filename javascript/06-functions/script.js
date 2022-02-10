"use strict";

/* ---------- 01 Default parameters ---------- */
const bookings = [];

const createBooking = function (flightNum, numOfPassengers = 1, price = 199) {
  const booking = {
    flightNum,
    numOfPassengers,
    price,
  };

  bookings.push(booking);
};

createBooking("LH123"); // default parameters value will take effect for undefined arguments.
createBooking("B737", 3);
createBooking("NA45R", undefined, 899); // numOfPassengers uses the default value.

/* ---------- 02 Passing Arguments - Value vs. Reference ---------- */
const flightNumber = "LH234";
const pepper = {
  firstName: "Pepper",
  passport: 23456789,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.firstName = `Mr. ${passenger.firstName}`;

  if (passenger.passport === 23456789) {
    alert("Check In :D");
  } else {
    alert("Wrong passport number :(");
  }
};

checkIn(flightNumber, pepper);

/*
Passing a primitive type to the function is passing a value type. As the copy
of the varible is passed to the function. Therefore changing the argument won't
affect the variable outside.

Passing the reference type to the function if passing a reference type. Here
just the reference is copied and both the argument and the variable points to
the same object. Therefore manipulating the argument inside the function
actually manipulates the object outside.

JavaScript is actually Passing by Value eventhough it's look like it's
Passing by Reference.
*/

/* ---------- 03 First-Class and Higher order functions ---------- */

// functions accepting call back functions
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(" ");
  return [firstWord.toUpperCase(), ...others].join(" ");
};

const transformer = function (str, fn) {
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// functions returning other functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Natasha"); // Hey Natasha
greeterHey("Bucky"); // Hey Bucky

greet("Hello")("Red Skull");

// greet as arrow function
const arrowGreet = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

/* ---------- 04 Call, apply and bind methods ---------- */
// call method - used for manually setting this keyword
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, "Pikachu");
lufthansa.book(635, "Ezhil");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// this won't work coz this keyword is undefined since this is a regular function call.
book(420, "Jillu");

// solutions
book.call(eurowings, 420, "Jillu"); // lufthansa.book.call(eurowings, 420, "Jillu");

// apply method
/* call and apply works exactly the same. But the difference is that apply
method don't accept arguments after the object instead it arguments as list.

apply method is not used anymore in modern js.
*/
book.apply(eurowings, [420, "Victor Van Doom"]);

// bind method
// here bind method won't immediately calls the function instead it returns the
// function in which this keyword is bound.
const bookEW = book.bind(eurowings);
bookEW(23, "Steven Spielberg");

// we can also do
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Shrek"); // here only the name is needed since flightNum is already setted.

// with event listeners
lufthansa.numOfPlanes = 300;
lufthansa.buyPlane = function () {
  // here this keyword points to the element from which this callback is called.
  this.plane++;
  console.log(this.plane);
};
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// buyPlane needs this object to work. Solution is
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// partial application - preset parameters
/*
Here we can use default parameters instead of using bind function. But here
we are creating a more specific function from more general function.

addTax - more general function
addVAT - more specific function
*/
const addTax = (rate, value) => {
  return value + value * rate;
};
console.log(addTax(0.1, 200));

// here the this keyword is null since addTax is a regular function
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(50));

// challenge - function returning another function
const addTaxRate = (rate) => {
  return (value) => {
    return value + value * rate;
  };
};
const addValue = addTaxRate(0.23);
addValue(200);

/* ---------- 05 immediately invoked function expression (iife) ---------- */
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// iife
(function () {
  console.log("This will never run again");
})();

(() => {
  console.log("This will never run again");
})();

/* ---------- 06 Closures ---------- */
// a closed-over variable environment
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`Passenger count: ${passengerCount}`);
  };
};
const booker = secureBooking();
booker(); // 1
booker(); // 2
booker(); // 3

// closure examples
// example 01
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// re-assigning f function
h();
f();
console.dir(f);

// example 02 - timer
const boardPassengers = function (numOfPassengers, waitTime) {
  const perGroup = numOfPassengers / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${numOfPassengers} passengers!`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, waitTime * 1000);

  console.log(`Will start boarding in ${waitTime}s`);
};

boardPassengers(180, 3);
