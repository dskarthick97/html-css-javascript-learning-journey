"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  label: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (obj) {
    console.log(obj);
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is ur delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}.`
    );
  },

  orderPizza: function (mainIgredient, ...otherIngredients) {
    console.log(mainIgredient, ...otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ---------- 01 Array Destructuring ----------
// way of unpacking values from array / object into variables.
// usual way
const arr = [2, 3, 4];
const firstValue = arr[0];
const secondValue = arr[1];
const thirdValue = arr[2];

// using destructuring
const [a, b, c] = arr; // here the original array is preserved.
console.log(a, b, c);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching / reassigning the values in the array.
[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// destructuring of nested array.
const nestedArr = [1, 2, [3, 4]];
const [i, , [k, l]] = nestedArr;
console.log(i, k, l);

// setting default values to variables while extracting.
// use case: not knowing the array length prior
const [p, q, r] = [1, 2]; // r is undefined.
const [x = 1, y = 1, t = 2] = [1, 2]; // assigning default values

// ---------- 02 Object Destructuring ----------
const { label, openingHours, categories } = restaurant;
console.log(label, openingHours, categories);

// providing different variable name
const {
  label: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

// providing default value if there is no property in the object.
const {
  menu = [],
  starterMenu: starter = [], // default value will not apply since the property exists.
} = restaurant;

// mutating / reassigning variables
let a = 111;
let b = 222;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);

// destructuring nested objects.
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// ---------- 03 Spread Operator ----------
/*
unpacking all the array elements in one go. Can work on all iterables and won't
in objects

iterables: arrays, strings, map, set. NOT object

NOTE: From ES16 spread operator also works on objects eventhough they're not iterable.

use cases:
01 to create shallow copy of an array.
02 merge two arrays together.
*/
const oldArr = [1, 2, 3];

// old way of creating a new array
const badWayArrayCreation = [oldArr[0], oldArr[1], oldArr[2], 4, 5];
console.log(badWayArrayCreation);

// new and convenient way of creating a new array
const goodWayArrayCreation = [...oldArr, 4, 5];
console.log(goodWayArrayCreation);

console.log(oldArr); // oldArr
console.log(...oldArr); // 1, 2, 3

// creating new menu in the restaurant object
const newMenu = [...restaurant.mainMenu, "Chickpeas masala"];
console.log(newMenu);

// creating shallow copy of an array.
const mainMenuCopy = [...restaurant.mainMenu]; // similar to Object.assign()

// merging two arrays
const mainStarterMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// using on other iterables
const str = "Bruce";
const letters = [...str, "W."];

// example using a function
const ingredients = ["Cheese", "Mushrooms", "Asparagus"];
restaurant.orderPasta(...ingredients);

// example on objects
const newRestaurant = {
  ...restaurant,
  foundedIn: 1997,
  founder: "Christina Tozi",
};
console.log(newRestaurant);

// ---------- 04 Rest pattern and parameters ----------
/*
Packs the element into an array. Works opposite of spread operator. 
*/
const [a, b, ...c] = [1, 2, 3, 4, 5];
console.log(a, b, c); // 1, 2, [3, 4, 5]

const [pizza, , risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; // rest element must be the last eleemnt.

// using in objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays); // contains only thur and fri

// example function
const add = function (...numbers) {
  console.log(numbers); // array of arguments
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum;
};
add(2, 3);
add(5, 6, 7, 8);

restaurant.orderPizza("Mushroom");
restaurant.orderPizza("Mushroom", "Onion", "Spinach");

// ---------- 05 Short circuting (&& and ||) ----------
// use any data type, return any data type and short-circuting
console.log(3 || "Atom");
console.log(0 && 18);

// ---------- 06 Nullish Coalesching operator (??) ----------
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish values: null and undefined. NOT 0 and ''
const noGuests = restaurant.numGuests ?? 10; // only nullish values will short-circuit here.
console.log(noGuests); // 0

// ---------- 07 Logical assigment operators ----------
const restaurant1 = {
  name: "Buhari",
  noOfGuests: 18,
};

const restaurant2 = {
  name: "Aashife",
  owner: "Iniyazh",
};

restaurant1.noOfGuests = restaurant1.noOfGuests || 15;
restaurant2.noOfGuests = restaurant2.noOfGuests || 9;

// OR assigment operator
restaurant1.noOfGuests ||= 15;
restaurant2.noOfGuests ||= 9;

restaurant1.noOfGuests ??= 15;
restaurant2.noOfGuests ??= 9;

// ---------- 08 For of loop ----------
for (let i = 0; i < mainStarterMenu.length; i++) {
  console.log(mainStarterMenu[i]);
}

// for of loop. It gives access to current item.
for (const item of mainStarterMenu) console.log(item);

// to get the index and value of an element.
for (const item of mainStarterMenu.entries()) console.log(item);

// ---------- 09 Enhanced object literal ----------
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const inn = {
  label: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery(obj) {
    console.log(obj);
  },

  orderPasta(ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is ur delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}.`
    );
  },

  orderPizza(mainIgredient, ...otherIngredients) {
    console.log(mainIgredient, ...otherIngredients);
  },

  // openingHours: openingHours, // before es6

  openingHours, // es6 enchanced object literal
};

// ---------- 10 Optional Chaining (?.) ----------
console.log(inn.openingHours.mon.open); // error since mon doesn't exist.

// can do this to prevent the error
if (inn.openingHours.mon) console.log(inn.openingHours.mon.open);

// with optional chaining.
console.log(inn.openingHours.mon?.open); // if mon exists then checks for open else immediately returns undefined.
console.log(inn.openingHours?.mon?.open);

// example
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
for (const day of days) {
  console.log(day);
  const open = inn.openingHours[day]?.open ?? "closed";
  console.log(open);
}

// checking if the method exists before calling.
console.log(inn.order?.(0, 1) ?? "Method doesn't exist'");

// in arrays
const users = [{ _name: "Natasha", email: "natashablackwidow@shield.com" }];
console.log(users[0]?._name ?? "User array is empty");

// ---------- 11 Looping Objects: Object keys, values and entries ----------
const properties = Object.keys(openingHours); // will get the object keys.
console.log(properties);

for (const day in Object.keys(openingHours)) {
  console.log(day);
}

const propertyValues = Object.values(openingHours); // will get the values of object properties.
const propertyKeysValues = Object.entries(openingHours); // will return both the key and value.
for (const [key, { open, close }] of propertyKeysValues) {
  console.log(`On ${key} we open at ${open} and closes at ${close}`);
}

// ---------- 12 Sets ----------
// sets is a collection of unique properties.
const ordersSet = new Set(["Pasta", "Pizza", "Risotto", "Pizza", "Pasta"]);
console.log(ordersSet);
console.log(new Set("Karthick"));

ordersSet.size; // returns the size of a set
ordersSet.has("Pizza"); // checks if an element is present in set
ordersSet.add("Bread"); // adds an element to the set
ordersSet.delete("Pasta"); // removes an element from the set
ordersSet.clear(); // empties the set

for (const order of ordersSet) {
  console.log(order);
}

// use case of set - remove duplicates in an array
const staffs = ["Waiter", "Cheff", "Waiter", "Manager", "Cheff", "Waiter"];
const uniqueStaffs = new Set(staffs);
console.log(uniqueStaffs);

// since set is also an iterable, we can use spread opertor on set
staffs = [...uniqueStaffs]; // creates an array from a set

// ---------- 13 Maps ----------
/*
data is stored in key value pairs in map. It is similar to object literal but
the difference is that keys in map can be of any types while in object literal
the keys should be of string type
*/
const rest = new Map();
rest.set("_name", "Thalappakatti"); // set also returns the map
rest.set(1, "Mutton Biriyani");

// chain the properties
rest
  .set(categories, ["Organic", "Vegetarian", "Italian"])
  .set("open", 6)
  .set("close", 22)
  .set(true, "We are open :D")
  .set(false, "We are closed :("); // can continue even further
console.log(rest);

rest.get("_name"); // retrieving the data from the map.

const time = 21;
rest.get(time > rest.get("open") && time < rest.get("close"));

console.log(rest.has("categories"));
console.log(rest.delete(1));
console.log(rest.size);
console.log(rest.clear());

// using arrays / objects as a map keys
rest.set([1, 2], "numbers");
rest.get([1, 2]); // undefined. Coz both of the objects are not same.

const arr = [1, 2];
rest.set(arr, "num");
rest.get(arr); // this will work since both of them are same object.

// populating the map object with multiple properties
const question = new Map([
  // [key, value]
  ["question", "What is the best programming language in the world?"],
  [1, "Java"],
  [2, "C"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);
console.log(question);

// iteration
for (const [key, value] of question) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}

// converting map to an array
[...question];

// ---------- 14 Strings ----------
const airline = "Air India";
const plane = "A320";

console.log(plane[0]); // A
console.log("B737"[0]); // B
console.log(airline.length); // 9
console.log("B737".length);

// string methods
airline.indexOf("r"); // 2. first occurrence
airline.lastIndexOf("i"); // 8. last occurrence
airline.indexOf("India"); // case sensitive

airline.slice(4); // India
airline.slice(4, 7); // Ind

airline.slice(0, airline.indexOf(" ")); // Air
airline.slice(airline.lastIndexOf(" ") + 1);

airline.slice(-2); // ia

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const ceat = seat.slice(-1);
  if (ceat === "B" || ceat === "E") {
    console.log("You've got the middle seat");
  }
};

checkMiddleSeat("11B");

// this is happening in the background. Prmitive string is converted into an
// string object. But the result is converted back into the primitive string.
new String("string");

airline.toLowerCase(); // air india
airline.toUpperCase(); // AIR INDIA

// fix capitalization in name
const passenger = "bRuCE";
const passengerLower = passenger.toLowerCase(); // bruce
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1); // Bruce

// check / compare user input email
const passengerEmail = "passenger@gmail.com";
const loginEmail = " Passenger@Gmail.Com \n";

// const lowerCaseEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerCaseEmail.trim();

// in one step
const normalizedEmail = loginEmail.toLowerCase().trim();

// replace parts of a string
const priceUS = "$288,97";
const price = priceUS.replace(",", ".");

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
announcement.replace("door", "gate"); // replace the first occurence

plane.includes("A32"); // true
airline.startsWith("Air"); // true

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed to board :(");
  } else {
    console.log("Welcome Onboard :D");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and Camera");
checkBaggage("Got some food, snacks and a gun for protection");

// split method
console.log("a+very+nice+string".split("+"));
const [firstName, lastName] = "Bruce Wayne".split(" "); // ["Bruce", "Wayne"]

// join method
const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");

const capitalizeName = function (name) {
  const names = name.split(" ");
  const nameUpper = [];

  for (const word of names) {
    // nameUpper.push(word[0].toUpperCase() + word.slice(1));
    nameUpper.push(word.replace(word[0], word[0].toUpperCase()));
  }

  console.log(nameUpper.join(" "));
};

capitalizeName("panjavan paarivendhan");

// padding a string
const message = "Go to gate 23!";
message.padStart(25, "+"); // +++++++++++Go to gate 23!

// masking
const maskCreditCard = function (cardNumber) {
  const str = number + "";
  const last = cardNumber.slice(-4);
  return last.padStart(str.length, "*");
};
console.log(maskCreditCard(123456789987654)); // ***********7654

// repeat
const text = "Bad weather... All Departures Delayed... ";
text.repeat(5);

const plansInLine = function (line) {
  console.log(`There are ${line} planes in line!`);
};
plansInLine(5);
