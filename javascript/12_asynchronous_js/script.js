"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/* ---------- 01 Asynchronous Js, AJAX and APIs ---------- */
/*
SYNCHRONOUS
    -- Code is executed line by line in the exact order as we defined
    -- Each line of code waits for previous line to finish

ASYNCHRONOUS
    -- Code is executed after a task that runs in the background finishes
    -- Execution doesn't wait for an asynchronous task to finish work
    ** NOTE: Callback functions / eventListeners alone do NOT make the code asynchronous

    AJAX --> Asynchronous JavaScript And XML: Allows to communicate with remote 
        web servers in an asynchronous way. With AJAX calls, we can request data 
        from webservers dynamically without reloading the page
*/

/* ---------- 02 First AJAX Call ---------- */
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // old school way of doing AJAX in Js
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // asynchronous / non-blocking call

  // saving the result of above code won't work. Therefore, we need to attach an
  // event listener to it. It will emit the LOAD event once it fetches the result
  // asynchronously
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags?.png}" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages?.tam}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies?.INR?.name
            }</p>
            </div>
        </article>
      `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("india");
getCountryData("usa");
// here two ajax calls happening at the same time. i.e., multiple ajax calls
// made at the same at parallel. Therefore we cannot control which one has to
// finish the execution first. SOLUTION: See Callback hell
*/

/* ---------- 03 How web works: Requests and Responses ---------- */

/* ---------- 04 Callback Hell ---------- */
// lets create a sequence of ajax call so that the second one runs after the
// first one finished

const renderCountry = function (data, className = "") {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags?.png}" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages?.tam}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies?.INR?.name
            }</p>
            </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  // countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  // first ajax call
  const request1 = new XMLHttpRequest(); // old school way of doing AJAX in Js
  request1.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request1.send(); // asynchronous / non-blocking call

  // saving the result of above code won't work. Therefore, we need to attach an
  // event listener to it. It will emit the LOAD event once it fetches the result
  // asynchronously
  request1.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    // get the neighbour country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // second ajax call
    // this second ajax call won't be possible without the first ajax call
    const request2 = new XMLHttpRequest(); // old school way of doing AJAX in Js
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send(); // asynchronous / non-blocking call

    // having callback inside of the other callback function i.e., nested callback function
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbour("france");
*/

// callback hell --> lot of nested callback inorder to execute asynchronous task
// in sequence. Happens for all asynchronous tasks handled by callback function
// and not just for ajax. Eg
/*
setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 second passed");
    setTimeout(() => {
      console.log("3 second passed");
      setTimeout(() => {
        console.log("4 second passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// This makes the code hard to understand, maintain and difficult to reason about
// Therefore need a way to solve and escape the callback hell.
// **Promises to the rescue (from ES6)

/* ---------- 05 Promises and Fetch API ---------- */
// modern js feature that helps us to escape from callback hell

// old school way of doing AJAX in Js
/*
const request1 = new XMLHttpRequest();
request1.open("GET", `https://restcountries.com/v3.1/name/${country}`);
request1.send();
*/

// replacing old xmlhttprequest function using Fetch API
// const requestUsingFetch = fetch("https://restcountries.com/v3.1/name/india");
// console.log(requestUsingFetch); // response object of type promise

/*
PROMISE -- An object that used as a placeholder for the future result of an
asynchronous operation i.e., a container for an asynchronously delivered value 
i.e., a container for a future value

ADVANTAGE OF USING PROMISES
  -- No longer need to rely on the events and callback functions passed into
asynchronous functions to handle asynchronous results
  -- Instead of nesting promises, can chain promises for a sequence of async
operations i.e., escaping the callback hell

PROMISE LIFECYCLE
  -- Promises are time sensitive
  -- Build Promise --> Consume Promise

  PROMISES STATUSES:
    Pending --> Settled

    a. Pending (Before the future value is available)
    b. Settled (Asynchronous task has finished)
      i. Fulfilled (Success - Value is now available)
      ii. Rejected (An error happened)
*/

/* ---------- 06 Consuming Promises ---------- */
// consuming / using a promise return by fetch function

/*
// implementing getCountryData function using Promise
const getCountryDataPromise = function (country) {
  // returns promise in pending state
  // but at certain point Promises will be settled. Handle the success response
  // using then function
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      // console.log(response.json()); // problem here -- json function itself a async function i.e., it returns a promise
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryDataPromise("portugal");
*/

// more clean way of above code
/*
const getCountryDataPromiseCl = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data));
};
getCountryDataPromiseCl("portugal");
*/

/* ---------- 07 Chaining Promises ---------- */

/*
const getCountryDataPromiseChainingCl = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"));
};
// getCountryDataPromiseChainingCl("portugal");

///////// ---------- 08 Handling Rejected Promises ---------- /////////
// Eg. for error,  user loses internet connection
btn.addEventListener("click", function () {
  getCountryDataPromiseChainingCl("portugal");
});
*/

// 2 ways of handling rejections

// 01 passing 2nd callback function into the then method -- here the problem is
// that we have to provide the callback function for every then method thus
// results in the code repetition

/*
const getCountryDataPromiseChainingCl = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      (response) => response.json(),
      (error) => alert(error)
    )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(
      (response) => response.json(),
      (error) => alert(error)
    )
    .then((data) => renderCountry(data, "neighbour"));
};
*/

// helper function
const getJSON = function (url, errorMessage = "Something went wrong") {
  return fetch(url).then((response) => {
    // throwing errors manually
    // rejecting the promise on purpose
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }

    return response.json();
  });
};

// 02 providing a catch method at the end of the chain
// chain method will catch the error which happens anywhere inside the chain

// besides catch, there is another method called finally which is called whatever
// the result of the promise. Eg. hide the loading circle. This works bcoz
// catch returns a promise
/*
const getCountryDataPromiseChainingCl = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      // throwing errors manually
      // rejecting the promise on purpose
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then((response) => {
      // throwing errors manually
      // rejecting the promise on purpose
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }

      return response.json();
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error} ❌❌❌`);
      renderError(`Something went wrong -- ${error.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

// simplifying the above code
const getCountryDataPromiseChainingCl = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // if (!neighbour) return;
      if (!neighbour) throw new Error("No neighbour found!");

      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/name/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error} ❌❌❌`);
      renderError(`Something went wrong -- ${error.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener("click", function () {
//   getCountryDataPromiseChainingCl("portugal");
// });

// simulating an error by providing the country that doesn't exists
// getCountryDataPromiseChainingCl("australia");

/* ---------- 09 Throwing errors manually ---------- */
// refer line 312

/* ---------- 10 Asynchronous behind the scenes: The Event Loop ---------- */

/* ---------- 11 The Event Loop in practice ---------- */
/*
console.log("Test Starts!");
setTimeout(() => console.log("0 sec timer"), 0);

// promise that immediately resolves
Promise.resolve("Resolved promise 1").then((response) => console.log(response));

Promise.resolve("Resolved promise 2").then((response) => {
  for (let i = 0; i < 1000000000; i++) {}

  console.log(response);
});

console.log("Test Ends!");

// in the above example setTimeout function won't run immediately after 0sec
// bcoz the microtask queue has higher priority than the callback queue
/*

/* ---------- 12 Building a simple promise ---------- */
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  // called as executor function
  // this functions contains async behaviour

  console.log("Lottery draw is happening 💰");

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WON :)"); // we use resolve function as a success / fulfilled promise
    } else {
      reject(new Error("You LOST your money :(")); // reject function is for error promise
    }
  }, 2000);
});

lotteryPromise
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

// Promisifying setTimeout
// fetch method is implemented similar to this way -- encapsulating all the
// async callback functions
const wait = function (seconds) {
  return new Promise(function (resolve) {
    // here no need of reject parameter since timer won't fail
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.log("I waiter for 3 seconds");
    return wait(2); // this is similar to what we did in fetch function
  })
  .then(() => console.log("I waited for 2 seconds"));

// wait function can be written as
Promise.resolve("Wait").then((response) => console.log(response));
Promise.reject(new Error("Problem")).catch((error) => console.log(error));
*/

/* ---------- 13 Promisifying the geolocation api ---------- */
/*
// callback based api
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (error) => console.log(error)
);

// converting callback based api to promise baased (promisifying) api
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (error) => reject(error)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then((response) => console.log(response));
*/

/* ---------- 14 Consuming Promises with async / await ---------- */
// async / await is just a syntactic sugar over consuming promises using then method

// recreating whereAmI function using async / await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// async function keeps running in the background while performing what is
// inside of it.

// async function returns promise once it finished
/*
const whereAmI = async function () {
  // await - stops the execution at certain point until the promise is fulfilled
  // NOTE: await only can be used inside the async function

  // geolocation
  const position = await getPosition();
  const { latitude: lat, longitude: lon } = position.coords;

  // reverse geocoding
  const resGeo = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
  );
  const dataGeo = await resGeo.json();

  // country data
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.address.country}`
  );

  // the above code is similar to
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) => console.log(res))

  const data = await res.json();
  renderCountry(data[0]);
};
whereAmI();
console.log("Printed first");
*/

// NOTE: async / await is also used along with then method of consuming promises

/* ---------- 15 Error handling with try...catch ---------- */
// simple example using try...catch block
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (error) {
//   alert(error.message);
// }

// handling errors in async / await function
/*
const whereAmI = async function () {
  try {
    // geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lon } = position.coords;

    // reverse geocoding
    const resGeo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
    );

    if (!resGeo.ok) throw new Error(`Unable to get the location data`);
    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.address.country}`
    );

    if (!res.ok) throw new Error(`Unable to get the country`);

    const data = await res.json();
    renderCountry(data[0]);
  } catch (error) {
    console.error(error);
    renderError(`${error.message}`);
  }
};
whereAmI();
*/

/* ---------- 16 Returning values from Async functions ---------- */
const whereAmI = async function () {
  try {
    // geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lon } = position.coords;

    // reverse geocoding
    const resGeo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
    );

    if (!resGeo.ok) throw new Error(`Unable to get the location data`);
    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.address.country}`
    );

    if (!res.ok) throw new Error(`Unable to get the country`);

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.address.county}, ${dataGeo.address.country}`;
  } catch (error) {
    console.error(error);
    renderError(`${error.message}`);

    // rethrowing the error
    // rejecting promsie returned from async function
    throw error;
  }
};

console.log("1: Will get location");
// const city = whereAmI();
// console.log(city); // here is the proof that async always returns a promise

// whereAmI().then((response) => console.log(response));

// if an error occurs in the async function, the error gets caught in the catch
// block of that function. But the function will still returns the fulfilled
// promise. So even the promise returns an error, the catch function won't catch
// that error here (below) and instead then function will execute

// In order to catch the error here, rethrow the error in the async function
// catch block. See ln. no. 591
/*
whereAmI()
  .then((response) => console.log(response))
  .catch((error) => console.log(error.message))
  .finally(() => console.log("2: Finished fetching location"));
*/

// the above code works fine but the notion here is we are mixing the async / await
// and usual promise then function

// handling the above code using async / await
// using await won't work outside the async function. Therefore use iife
(async function () {
  try {
    const res = await whereAmI();
    console.log(res);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("2: Finished fetching location");
  }
})();

/* ---------- 17 Running Promises in parallel ---------- */
// getting datas at the same time but the order doesn't matter

const getThreeCountries = async function (country1, country2, country3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country1}`
    // );

    // const [data2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country2}`
    // );

    // const [data3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country3}`
    // );

    // NOTE: in the above code, no async call is dependent on other
    // so it doesn't make sense of data2 waiting for the data1 to finish and
    // data3 waiting for data2 to finish

    // running them in parallel - use promise combinator -- all
    // here if one promise is rejected then all promises will be rejected as well
    const datas = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${country1}`),
      getJSON(`https://restcountries.com/v3.1/name/${country2}`),
      getJSON(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(datas.map((data) => data[0].capital[0]));
  } catch (error) {
    console.log(error.message);
  }
};
getThreeCountries("india", "australia", "france");

/* ---------- 18 Other Promise combinators: race, allSettled and any ---------- */
// 01 Promise.all

// 02 Promise.race -- receives an array of promises and returns a promise
// here if one promise gets settled then all promises in the array will be
// settled as well and the result will be the result of that promise
// it doesn't matter the promise is fulfilled or rejected

(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/australia`),
  ]);
})();

// race will be helpfull in never ending / very long running promises
// simulating bad internet connection
const timeout = async function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request takes too long"));
    }, seconds * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/russia`),
  timeout(1),
])
  .then((response) => console.log(response))
  .catch((error) => console.error(error.message));

// 03 Promise.allSettled -- receives an array of promises and returns an array
// of all the settled promises. Same as Promise.all but Promise.all short-circuits
// if any one input promise is rejected but Promise.allSettled never short-circuits
// it returns all the results of all the promises
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another Success"),
]).then((response) => console.log(response));

// 04 Promise.any -- receives an array of promises and returns the first
// fulfilled promises and rejected promises are ignored which is it always returns
// fulfilled promise
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another Success"),
]).then((response) => console.log(response));
