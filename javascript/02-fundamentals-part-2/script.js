/*
use case of strict mode:

01 forbids us to do certain things.
02 Will make the errors visible in the browser console.
03 reserves the varible name that will be used later. eg., interface, private
*/
"use strict"; // strict mode activated.

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// javascript has reserved coz it might implement it in the future.
// will produce error - unexpected strict mode reserved word.
const interface = "Audio";
const private = 420;

// ---------- 02 Functions. ----------
function logger() {
  // function body.
  console.log("Simple logger function");
}
logger(); // invoking / calling / running the function.

function fruitProcessor(apples, oranges) {
  // apples and oranges are parameters.
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
console.log(fruitProcessor(3, 4)); // 3 and 4 are arguments.

// ---------- 03 Function Declaration and Expression. ----------
// difference between them is that we can call the function declaration before
// it is defined / initialized.

// function declaration.
calAgeFunctionDeclaration(1997); // calling before function definition.

function calAgeFunctionDeclaration(birthYear) {
  // function to calculate age from birth year.
  return 2037 - birthYear;
}
calAgeFunctionDeclaration(1997);

// function expression. Also called as anonymous function.
const calAgeFunctionExpression = function (birthYear) {
  return 2037 - birthYear;
};
calAgeFunctionExpression(1997);

// ---------- 04 Arrow functions. ----------
// special / shorter form function expression.

// here the return happens implicitly.
const calAgeArrowFunction = (birthYear) => 2037 - birthYear;
calAgeArrowFunction(1997);

const yearsUntillRetirement = (birthYear, firstName) => {
  const age = 2022 - birthYear;
  const retirementAge = 65;
  return `${firstName} retires in ${retirementAge - age} years`;
};
console.log(yearsUntillRetirement(1997, "Karthick"));

// ---------- 05 Functions calling another functions. ----------
function cutFruitIntoPieces(fruit) {
  return fruit * 4;
}

function newFruitProcessor(apples, oranges) {
  const applePieces = cutFruitIntoPieces(apples);
  const orangePieces = cutFruitIntoPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
  return juice;
}

// ---------- 06 Arrays. ----------
const friend1 = "Bruce Wayne";
const friend2 = "Elon Musk";
const friend3 = "Naval Ravikant";

const friends = ["Bruce Wayne", "Elon Musk", "Naval Ravikant"];
const years = new Array(1997, 1998, 2003); // another way of creating array.

// here this works. But the contradiction is that friends variable is const.
friends[0] = "Tony Stark";

const firstName = "Andrew Garfield";
const dynamicArrayValues = [firstName, "Tobey Maguire", 2022 - 1997, friends];

// basic array operations.
friends.push("Minnal Murali"); // adds the value to the end of the array.
friends.unshift("Superman"); // adds the value to the beginning of the array.
friends.pop(); // removes the last element of the array.
friends.shift(); // removes the first element of the array.
console.log(friends);

friends.indexOf("Elon Musk"); // tells in which position is in the array.
friends.includes("Bruce Wayne"); // returns true if the element is in the array.
if (friends.includes("Tony Stark")) {
  console.log("Have a friend called Tony Stark!");
}

// ---------- 07 Objects. ----------
const bruce = {
  // called object literal syntax.
  firstName: "Bruce",
  lastName: "Wayne",
  age: 25,
  job: "Vigilante",
  friends: ["Alfred", "Robin", "Wonder woman"],
};

// accessing the object property - dot vs. bracket notation.
console.log(bruce.firstName); // another way - bruce["firstName"]
bruce.fullName; // undefined response.
bruce["fullName"]; // undefined response.

// adding properties to the object.
bruce.location = "Gotham City";
console.log(bruce);

// challenge.
// Bruce Wayne has 3 friends, and his best friend is Alfred.
console.log(
  `${bruce.firstName} ${bruce.lastName} has ${bruce.friends.length} friends, and his best friend is ${bruce.friends[0]}.`
);

// objects methods.
const peter = {
  firstName: "Peter",
  lastName: "Parker",
  birthYear: 1994,
  job: "Web-Slinger",
  friends: ["Ned", "MJ", "Harrie Osborn"],
  hasDriversLicense: true,

  //   calcAge: function (birthYear) {
  //     return 2022 - birthYear;
  //   },

  // this - equal to the object on which the method is called.
  //   calcAge: function () {
  //     return 2022 - this.birthYear;
  //   },

  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} ${
      this.lastName
    } is a ${this.calcAge()} year old ${this.job}.`;
  },
};

console.log(jonas.calcAge()); // jonas["calcAge"]()
console.log(jonas.age);

// challenge
// Peter Parker is a 28 year old Web-Slinger.
console.log(jonas.getSummary());

// ---------- 08 Loops. ----------
// for(initialization; condition; increment)
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

const viratsArray = [
  "Virat",
  "Kohli",
  33,
  "cricketer",
  ["Dhoni", "AB de", "Gayle"],
];

for (let i = 0; i < viratsArray.length; i++) {
  console.log(viratsArray[i]);
}

// continue and break.
// break - completely terminate the whole loop.
// continue - exit the current iteration of the loop.

// looping backwards.
for (let i = viratsArray.length - 1; i >= 0; i--) {
  console.log(viratsArray[i]);
}

// loop inside another loop.

// while loop
// use case: when we don't actually know how many loop / iteration has to done.
let i = 0;
while (i < viratsArray.length) {
  console.log(viratsArray[i]);
  i++;
}

// rolling dice
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
}
