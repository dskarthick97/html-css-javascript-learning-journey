"use strict";

/* -------------------- 01 Object Oriented Programming (OOP) -------------------- */
/*
Paradigm based on the concept of objects

----- a. Classes and Instances

----- b. Fundamental OOP Principles
b.01 ABSTRACTION
    - Ignore or hide details that don't matter.

b.02 ENCAPSULATION
    - prevents external code from accidentally manipulating the internal state 
    or properties.
    - Keeping properties and methods private inside the class, so they are not
    accessible by the outside classes. Some methods can be exposed as a public
    interface (API).

b.03 INHERITANCE
    - Making all properties and methods of a certain class available to the 
    child class, forming a hierachical relationship b/w classes.
    - This allows us to reuse common logic and to mode real-world relationships.

b.04 POLYMORPHISM
    - a child class can overwrite a method it inherited from the parent class.
*/

/* -------------------- 02 OOP in JavaScript -------------------- */
/*
In Js, OOP is implemented slightly different from general / classical OOPs

----- a. Prototype
    - all objects are linked to a prototype object.

----- b. Prototypal Inheritance / Delegation
    - The prototype contains methods that are accessible to all the objects
    linked to that prototype.
    - NOTE: This inheritance is different from the classical inheritance. 
    In classical inheritance, one class inherites from another class. In this
    inheritance, an instance inheriting from a class
    - NOTE: Here objects delegates behavior to the prototype whereas in the 
    classical inheritance, the methods are copied from the class to objects
    while instantiating.

----- c. Ways of implementing Prototypal Inheritance
c.01 Constructor functions

c.02 ES6 Classes

c.03 Object.create()
*/

/* -------------------- 03 Constructor function and new operator -------------------- */
// 01 constructor function --> it's not a feature of Js. It's a patter

// function declaration and function expression will work for constructor function
// but arrow function won't work since it doesn't have its own this keyword
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // creating methods inside a constructor function is a bad practice.
  // should not do this bcoz every object will have this function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
const bruce = new Person("Bruce", 1995); // constructor function
console.log(bruce);

/*
Behind the scenes when we call a function with new keyword. There are 4 steps

----- 01. New empty object is created
----- 02. function is called, and then this = {}
----- 03. {} linked to the prototype
----- 04. constructor function automatically returns the {}
*/
const elon = new Person("Elon", 1971);

console.log(bruce instanceof Person); // true

/* -------------------- 04 Prototypes -------------------- */
/*
Each and every function in Js, automatically has the property called prototype.
And all the objects created using the function will have the access 
to the methods or property assigned using the prototype.
*/
typeof Person.prototype; // object
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; // this function can be accessed by all the objects created by using Person constructor function

bruce.calcAge();

/*
Defining methods inline to the constructor function is considered to be a bad 
practice bcoz while creating an object using that constructor function, the
methods are copied and attached to each objects.

Use Prototypal inheritance to attach the method to the constructor function, so
that the method won't be copied to each and every object instead that method
stays in one global place and all the objects can use that without copying &
attaching to itself.
*/
// here bruce object won't contain the calcAge method. But it has the access to
// it since Person.prototype object has that method
console.log(bruce);

console.log(bruce.__proto__);
console.log(bruce.__proto__ === Person.prototype);

// NOTE: Person.prototype is not the prototype of Person.
// Instead Person.prototype is used as the prototype for all the objects created
// by the Person constructor function
console.log(Person.prototype.isPrototypeOf(bruce)); // true
console.log(Person.prototype.isPrototypeOf(bruce)); // false

// setting properties using prototype property
Person.prototype.species = "Homo Sapiens";

// Assigning methods and properties to an object using prototype property,
// won't become objects own property
console.log(bruce.hasOwnProperty("firstName")); // true
console.log(bruce.hasOwnProperty("species")); // false

/* -------------------- 05 Prototypal Inheritance on Built-in Objects -------------------- */
// inspecting the above Person constructor function

// Object.prototype --> top of the prototype chain
console.log(bruce.__proto__.__proto__);
console.log(bruce.__proto__.__proto__.__proto__); // null

// checking the prototype of an array
const arr = [1, 2, 3, 4, 5, 6, 6, 6, 3]; // new Array() === []
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

/*
extending the prototype of a built-in object is not a good idea. bcoz

01 next version of js might add the method that we used
*/
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector("h1");

/* -------------------- 06 ES6 Classes -------------------- */
// classes won't work like the way it works in other programming languages like
// java, c++, etc.. Instead it just a syntactic sugar layer over the
// constructor functions

// class expression
const ClExPerson = class {};

// class declaration
class ClDlPerson {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // NOTE: All the methods inside the class, outside the constructor will be on
  // the prototype of the object and not on the object itself
  calcAge() {
    return 2035 - this.birthYear;
  }
}

const morgan = new ClDlPerson("Morgan", 1985);
console.log(morgan.__proto__ === ClDlPerson.prototype); // true

ClDlPerson.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}`);
};
morgan.greet(); // Hey, Morgan

/*
NOTE: while using Classes

----- 01 Classes are not hoisted even if they are function declarations
----- 02 Classes are also first class citizens
----- 03 Classes are always executed in strict mode
*/

/* -------------------- 07 Setters and Getters -------------------- */
// common to all objects in Js. They are very useful for data validation

// 01 example using object literal
const account = {
  owner: "Bruce",
  movements: [200, 530, 120, 300],

  // getter
  get latestMovements() {
    return this.movements.slice(-1).pop();
  },

  // setter
  // any setter method should exactly has one parameter
  set latestMovements(movement) {
    this.movements.push(movement);
  },
};
// simple use getter and setters as a property
console.log(account.latestMovements); // 300
account.latestMovements = 50; // set it like any other property

// 02 example using class
// getters and setters works exactly the same way as in object literal
class Cricketer {
  constructor(fullName, country, birthYear) {
    this.fullName = fullName;
    this.country = country;
    this.birthYear = birthYear;
  }

  get age() {
    const date = new Date();
    return date.getFullYear() - this.birthYear;
  }

  // data validation
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // underscore is convention
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}
const virat = new Cricketer("Virat Kohli", "India", 1988);
virat.age;

/* -------------------- 08 Static methods -------------------- */
// In Array, .from method attached to the Array constructor. So all the array
// objects do not inherit this method. Bcoz it is not on the prototype, it is
// attached to the Array constructor itself

// we can do this
Array.from(document.querySelectorAll("h1"));

// not this
// [1, 2, 3].from();

// in constructor function
const Batman = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const wayne = new Batman("Wayne", 1988);
Batman.hey = function () {
  console.log(`I'am Vengance`);
};

// we can do
Batman.hey();
// wayne.hey(); // this won't work bcoz hey method is not in the prototype

// in classes
class Astronomer {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  get age() {
    const date = new Date();
    return date.getFullYear() - this.birthYear;
  }

  // data validation
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // underscore is convention
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log(`Full of Cosmos`);
  }
}
Astronomer.hey();

/* -------------------- 09 Object.create -------------------- */
/*
works in a different way than constructor functions and classes
there is still the idea of Prototypal Inheritance but there is no prototype
property, no constructor function and no new operator are involved. Instead set
the prototype manually
 */

// this is actually the prototype property
const PersonProto = {
  calcAge() {
    const date = new Date();
    return date.getFullYear() - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// here the banner object is linked manually to the PersonProto
const banner = Object.create(PersonProto);
console.log(banner);
banner.name = "Banner";
banner.birthYear = 1985;
banner.calcAge();

console.log(banner.__proto__ === PersonProto); // true

const cage = Object.create(PersonProto);
cage.init("Cage", 1980);
cage.calcAge();

/* -------------------- 10 Inheritance b/w Classes: Constructor functions -------------------- */
// Parent class
const Individual = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Individual.prototype.calcAge = function () {
  const date = new Date();
  return date.getFullYear() - this.birthYear;
};

// Child class
const Student = function (firstName, birthYear, course) {
  // Individual(firstName, birthYear); // won't work
  Individual.call(this, firstName, birthYear);
  this.course = course;
};

// this creates the connection to the parent (linking prototype)
// Student.prototype = Individual.prototype; // this won't work
Student.prototype = Object.create(Individual.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}. I study ${this.course}`);
};

const robin = new Student("Robin", 1998, "Archealogy");
robin.introduce();
console.log(robin.calcAge());

Student.prototype.constructor = Student;
