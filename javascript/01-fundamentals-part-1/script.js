// 01 - values and variables
let js = "amazing";

console.log(js);
console.log(40 + 8 - 23 - 10);

// 02 - datatypes
let isJavascriptFun = true;
console.log(isJavascriptFun);

let variableWithoutValue;
console.log(variableWithoutValue);
console.log(typeof variableWithoutValue);

// js says typeof null as object. This considers as bug.
console.log(typeof null);

// 03 - let, var and const

// 04 strings and template literals
const firstName = "Karthick Sabari";
const job = "Python developer";
const birthYear = 1997;
const year = 2022;

const karthick = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(karthick);

// multi-line strings
console.log("String with \n\
multiple \n\
lines");

console.log(`String with 
multiple 
lines`);

// 05 if statement

// example 01
const age = 15;
if (age >= 18) {
  //block of code to be executed if the condition is true
  console.log("Karthick can start driving!");
} else {
  const yearsLeft = 18 - age;
  console.log(`Karthick is to young. Wait another ${yearsLeft} year!`);
}

// example 02
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

// 06 Type Conversion and Type Coercion.
// type conversion - explicit conversion of one type to another.
const inputYear = "1997";
console.log(inputYear + 18);

console.log(Number("Karthick")); // result will be NaN. Type of NaN is number.

// type coercion - implicit conversion of one type to another.
console.log("I'm" + 23 + " years old!");
console.log("23" + "10"); // only + operator will convert the number into string.
console.log("23" - "10");
console.log("23" * "10");
console.log("23" / "10");

// guess the number
let n = "1" + 1;
n = n - 1;
console.log(n);

// 07 Truthy and Falsy values.
// falsy values - 0, "", undefined, null, NaN
// use case 01
const money = 10;
if (money) {
  console.log("Don't spend it all!");
} else {
  console.log("You should get a job.");
}

// use case 02
let height;
if (height) {
  console.log("Yay, height is defined");
} else {
  console.log("height is undefined.");
}

// 08 Equality opertors
// === strict equality operator: will not perform type coercion.
const age = 18;
if (age === 18) console.log("You're allowed to drive!");
console.log("18" === 18); // false

// == loose equality operator: will perform type coercion.
console.log("18" == 18); // true

// 09 Boolean logic: The AND, OR and NOT operators.
const hasDriverLicense = true;
const hasGoodVision = true;
console.log(hasDriverLicense && hasGoodVision); // AND
console.log(hasDriverLicense || hasGoodVision); // OR
console.log(!hasDriverLicense); // NOT

if (hasDriverLicense && hasGoodVision) {
  console.log("Karthick is able to drive");
} else {
  console.log(
    "Karthick is not allowed to drive. Pls recruit someother person to drive"
  );
}

// 10 switch statements.
const day = "sunday";

switch (day) {
  case "monday": // day === 'monday';
    console.log("Plan course structure..");
    break;
  case "tuesday":
    console.log("Prepare theory videos..");
    break;
  default:
    console.log("Not a valid day!");
}

// 11 statements and expressions.
// statement  : performs a action but doesn't produce a value.
// expression : piece of code that produces a value. Eg., 3 + 4, 7
// use case: In template literal, cannot insert a statement. Only th eexpression is valid.

// 12 Ternary operator.
// syntax --> condition ? return this if condition is true : else return this;
