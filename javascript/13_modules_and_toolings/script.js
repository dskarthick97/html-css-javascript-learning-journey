/* ---------- 01 An overview of Modern Js development ---------- */

/* ---------- 02 Exporting and Importing ES6 modules ---------- */
// 01 importing a module without importing any value

/*
NOTE: all the imported modules are get parsed ane executed before the module
that imported them

--- All import statements are hoisted first
--- All modules are executed in strict mode
--- Variables that are global to a module are scoped to that module itself
    i.e., all top level codes are private to that module
    In order to use those variable / top level code, we have to export it first
--- ** Imports are live connection to exports. Not the copies
*/

// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

// console.log(shippingCost); // cannot access top level code of other module

// addToCart("bread", 5);
// console.log(price, tq);

console.log("Importing module...");

// importing all at the same time
import * as ShoppingCart from "./shoppingCart.js";

ShoppingCart.addToCart("apple", 3);
console.log(ShoppingCart.totalPrice);

// importing default export. We can also mix named and default import / exports
// import add, { cart } from "./shoppingCart.js";
// add("pizza", 6);

// import is the live connection to export i.e., if the exported statement in a
// module is changed then that change is reflected in the imported module
ShoppingCart.addToCart("banana", 6);
ShoppingCart.addToCart("pineapple", 9);
console.log(ShoppingCart.cart);

/* ---------- 03 Top level await ---------- */
// from ES2022 we can use await keyword outside of async function
// will work only in modules not in scripts

// await keyword works outside of async function
// NOTE: This blocks the execution of entire module :(
/*
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts/1/comments"
);
const data = await response.json();
console.log(data);
 */

const getLastPost = async function () {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );
  const data = await response.json();
  //   console.log(data);

  return { title: data.at(-1).name, text: data.at(-1).body };
};

// before top level await
getLastPost().then((res) => console.log(res));

// using top level await
const lastPost = await getLastPost();
console.log(lastPost);

/* ---------- 04 The Module Pattern ---------- */
// Goal of module pattern is to encapsulate the private api and expose the public api

// here all the datas are private since they are inside of the function
// to expose some of them as public api return a object containing what to expose
const NewShoppingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 21;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

NewShoppingCart.addToCart("shawarma", 3);
console.log(NewShoppingCart.cart);
console.log(NewShoppingCart.shippingCost); // undefined. Bcoz it is private

// the above NewShoppingCart works bcoz of closure

/* ---------- 05 CommonJs modules ---------- */
/*
Besides native import / export (ES6 module) and module pattern, js uses other 
module system which are not native js feature. They rely on external implementations
i.e., 3rd party libraries eg., commonjs is used in nodejs

// using commonjs
// this won't work in the browser but would work in nodejs

// export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

// import
const { addToCart } = require("./shoppingCart.js");
*/

/* ---------- 06 Introduction to command line ---------- */

/* ---------- 07 NPM ---------- */
/*
package.json -- file that stores the entire configuration of our project
*/

// import { cloneDeep } from "./node_modules/lodash-es/cloneDeep.js";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "egg", quantity: 6 },
  ],
  user: { loggedIn: true },
};

// copy using js
const stateClone = Object.assign({}, state);
console.log(stateClone);

state.user.loggedIn = false; // this change also will reflect in the cloned object itself

// to avoid the problem use cloneDeep module of lodash-es

/* ---------- 08 Building with parcel and npm scripts ---------- */
// Parcel and webpack are building tools. Parcel works with zero configs whereas
// webpack needs heavy configurations
