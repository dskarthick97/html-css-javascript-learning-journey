"use strict";

// ---------- 01 Scoping. ----------

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age} born in ${birthYear}`;
    console.log(output);

    // block scope.
    if (birthYear >= 1982 && birthYear <= 1996) {
      var milleneal = true;
      const firstName = "Wayne";
      const str = `Oh, and you're a milleneal, ${firstName}`;
      console.log(str);

      function add(a, b) {
        // cannot access this function outside in strict mode
        return a + b;
      }

      output = "NEW OUTPUT";
    }
    // console.log(str);
    console.log(milleneal);
  }

  printAge();
  return age;
}

let firstName = "Bruce";
calcAge(1991);
// firstName = "Bruce";
// console.log(age); // cannot able to access age variable outsite the calcAge scope.

// ---------- 02 Hoisting and Temporal Dead Zone (TDZ) ----------

// variable hoisting
console.log(me); // hoisted but the value is undefined.
console.log(job); // cannot access before initialization
console.log(city); // cannot access before initialization.

var me = "Bruce Wayne";
let job = "Vigilante";
const city = "Gotham";

// functions hoisting
console.log(declaration(2, 3)); // function declaration is hoisted.
console.log(functionExpression(3, 4)); // cannot access before initialization.
console.log(arrowFunction(4, 5)); // cannot access before initialization.

function declaration(a, b) {
  return a + b;
}

const functionExpression = function (a, b) {
  return a + b;
};

const arrowFunction = (a, b) => a + b;

// here var will create a property in the window object.
// bbut let and const won't be created in the window object.
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true.
console.log(y === window.y); // false.
console.log(z === window.z); // false.

// ---------- 03 this keyword ----------
// this will be created for every execution context.

console.log(this); // here this is the window object.

// normal function.
const calcAgev2 = function (birthYear) {
  const age = 2022 - birthYear;

  // Here the function will have its own this keyword. But it's undefined.
  console.log(this);
};

calcAgev2(1997);

// arrow function.
const arrowCalcAge = (birthYear) => {
  const age = 2022 - birthYear;

  // arrow function does not has his own this keyword. Instead it uses its
  // parent scopes this keyword. Here the parent object is window object.
  console.log(this);
};

arrowCalcAge(1990);

// inside the object.
const wayne = {
  firstName: "Bruce",
  dateOfBirth: 1994,
  objectCalcAge: function () {
    this.age = 2022 - this.dateOfBirth;

    // here this keyword is the *object calling the function*.
    console.log(this); // wayne object.
  },
};

wayne.objectCalcAge(1994);

const stark = {
  dateOfBirth: 2000,
};
// method borrowing - copies the wayne's function to the stark object.
wayne.objectCalcAge = stark.objectCalcAge;
stark.objectCalcAge();

const func = wayne.objectCalcAge;
func(); // here the this keyword is undefined coz we took the function out from the object.

// ---------- 03 Regular vs. Arrow functions ----------
// this keyword pitfalls between regular and arrow functions.
const cooper = {
  firstName: "Murphy",
  year: 2000,

  // regular function
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);

    // solution 1
    // const self = this;
    // const isMillenial = function () {
    //   console.log(this); // undefined. since this is the regular function call.
    //   //   console.log(this.year >= 1981 && this.year <= 1996);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // solution 2
    // here this works coz arrow function don't have this keyword.
    // here the arrow function uses its parent scope this keyword.
    const isMillenial = () => {
      console.log(this); // undefined. since this is the regular function call.
      //   console.log(this.year >= 1981 && this.year <= 1996);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
  },

  // arrow function
  greet: () => {
    console.log(this); // this is the window object here.
    console.log(`Hey ${this.firstName}`); // Hey undefined.
  },
};
cooper.greet(); // Hey undefined.

// argument keyword.
// similar to this keyword. arguments keyword will available to function expressions.
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5);
addExpr(6, 7, 8, 9); // this will acceptable.

var addArrow = (a, b) => {
  console.log(arguments); // produces error.
  return a + b;
}; // does not get arguments keyword.

// ---------- 03 Primitives vs. Object or Reference types ----------
let age = 30;
let oldAge = age;
age = 24;
console.log(age); // 24
console.log(oldAge); //30

const myself = {
  name: "Mimi",
  age: 25,
};

const friend = myself;
friend.age = 27;
console.log(friend);
console.log(myself);

// another example
// primitives
let lastName = "Osborn";
let oldLastName = lastName;
lastName = "Octavius";
console.log(lastName);
console.log(oldLastName);

// reference types
const loki = {
  firstName: "Loki",
  lastName: "Odinson",
  age: 29,
};

const lokiLaufeyson = loki;
lokiLaufeyson.lastName = "Laufeyson";
console.log(loki);
console.log(lokiLaufeyson);

lokiLaufeyson = {}; // this won't work as this changes the memory address of the variable.

// copying objects.
const wanda = {
  firstName: "Wanda",
  lastName: "Maximoff",
  age: 31,
  family: ["Vision", "Wicken"],
};

/*
here the object is copied to another object and so the memory address of
both will be different. Changing the property of one object won't reflect
in another object since the references are not same.

Object.assign()  will only produce the shallow copy which means that if the 
wanda object contains an object inside it, then it won't be copied to 
wandaClone instead both the inner object points to the same memory.
*/
const wandaClone = Object.assign({}, wanda);
wandaClone.lastName = "Vision";

// manipulating object which is in another object.
wandaClone.family.push("Speed");
wandaClone.family.push("Quicksilver");
