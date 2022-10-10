// exporting module
console.log("Exporting module...");

// top level await
// this will block the execution of the entire module where it is imported
console.log("Start fetching comments...");
await fetch("https://jsonplaceholder.typicode.com/posts/1/comments");
console.log("Finished fetching comments...");

// top level variables are private to this module. i.e., it won't be accessed
// until it gets exported here
const shippingCost = 10;
export const cart = [];

/* 
Exporting:
    -- Named export. Main use case is exporting multiple at the same time
    -- Default export. Use when to export only one thing per module

--- All exports statements always need to happen in top level code
*/

// 01 named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// this won't work. Bcoz export need to happen at top level
/*
if (true) {
  export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
}
*/

const totalPrice = 239;
const totalQuantity = 18;

// named export
export { totalPrice, totalQuantity as tq };

// default export - exporting the actual value. No name/variable involved here
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
