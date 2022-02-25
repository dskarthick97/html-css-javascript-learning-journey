"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
  event.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);
btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// SMOOTH SCROLLING FUNCTIONALITY
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (event) {
  // finding the co-ordinates of section1
  // getBound method gives the x and y co-ordinates from the current viewport
  // const section1Coordinates = section1.getBoundingClientRect();

  // console.log(event.target.getBoundingClientRect());
  // console.log(
  //   "Height & Width of the current viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // scrolling
  // 01 - traditional way of implementing scroll
  // window.scrollTo(
  //   section1Coordinates.left + window.pageXOffset,
  //   section1Coordinates.top + window.pageYOffset
  // );

  // 02 - modern way
  // window.scrollTo({
  //   left: section1Coordinates.left + window.pageXOffset,
  //   top: section1Coordinates.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // 03 - more modern way. Only works in modern browsers
  section1.scrollIntoView({ behavior: "smooth" });
});

// PAGE NAVIGATION FUNCTIONALITY
// approach -- 01
// document.querySelectorAll(".nav__link").forEach(function (element) {
//   element.addEventListener("click", function (event) {
//     event.preventDefault();

//     const id = this.getAttribute("href"); // this is a query selector itself
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

/*
The problem in the above approach is that we are attaching the callback function
to all the three nav__link elements. Here it is okay since there is only three
nav elements. But imagine attaching the same functions to 100+ or 1000+ elements.
That would still fine and work as expected. But it would certainly impact the 
performance and also violates the DRY principle.

The better solution is to use Event Delegation. It needs 2 steps
01 Add event listeners to the common parent element
02 In that event listener, determine which element originated the event
*/
// approach -- 02 -- much much better than approach 01
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // matching strategy
    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href"); // this is a query selector itself
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// TABBED COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  // guard clause
  if (!clicked) return;

  // removing active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // active tab
  clicked.classList.add("operations__tab--active");

  // content-area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE AWAY ANIMATION
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

const handleHover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");

    siblings.forEach((siblingEl) => {
      if (siblingEl !== link) siblingEl.style.opacity = this;
    });
  }
};

// mouseenter and mouseover are similar events but the only difference is that
// mouseenter won't bubble events whereas mouseover will bubble
// navLinks.addEventListener("mouseover", function (event) {
//   handleHover(event, 0.5);
// }); // this works but the better solution is to use bind method
navLinks.addEventListener("mouseover", handleHover.bind(0.5)); // use bind to pass arguments to handler function

// opposite of mouseover, opposite of mouseenter is mouseleave
navLinks.addEventListener("mouseout", handleHover.bind(1));

// STICKY NAVIGATION BAR
// 01 using scroll event
// this scroll event fires each time when scrolling happens in the window
// it is not efficient as it affects the performance and so it should be avoided
/*
const initialCoordinates = section1.getBoundingClientRect();
window.addEventListener("scroll", function (event) {
  if (window.scrollY > initialCoordinates.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/

// sticky navigation using INTERSECTION OBSERVER API
// First hands-on of the API
// syntax --> new IntersectionObserver(callBackFunction, option)
/*
const observerOptions = {
  root: null, // here null is to indicate viewport
  threshold: [0, 0.2],
};

// this callback function invocation is based on the threshold value of the
// options. If the threshold value is 0.1, then the callback function gets
// triggered when the target element moving into the view and moving out of the
// view i.e., intersects the viewport at 10% and the target element leaves the
// viewport i.e., at <10%
const observerCallback = function (entries, observer) {
  // entries is the array of threshold values
  entries.forEach(function (entry) {
    console.log(entry);
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);
*/
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEALING ELEMENTS ON SCROLL
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  // unobserve
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll(".section"); // NodeList
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES
const targetImgs = document.querySelectorAll(".features__img");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace the src with data-src
  entry.target.src = entry.target.dataset.src;

  // behind the scenes --> js finds the image, loads the image and emits the load event
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
targetImgs.forEach((image) => {
  imgObserver.observe(image);
});

// SLIDER - PART 01
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = function (slideNum) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - slideNum)}%)`)
  );
}; // 0%, 100%, 200%, 300%
goToSlide(0);

// next slide
const nextSlide = function () {
  if (currentSlide === maxSlides - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};
btnRight.addEventListener("click", nextSlide);

// previous slide
const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlides - 1;
  else currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};
btnLeft.addEventListener("click", previousSlide);

// adding keyboard keys for scrolling
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") previousSlide(); // if statement
  event.key === "ArrowRight" && nextSlide(); // short-circuting
});

// SLIDER - PART 02
const dotsContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, index) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

function activateDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}
activateDot(0);

dotsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("dots__dot")) {
    const slide = event.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

///////////////////////////////////////

/* ---------- 01 Selecting, creating and deleting elements ---------- */
// 01 selecting the element
// selects the document elements
console.log(document.documentElement); // selects the entire html
console.log(document.head);
console.log(document.body);

// const header = document.querySelector(".header");
document.querySelectorAll(".section"); // returns NodeList

document.getElementById("section--1");

/* 
this returns an HTMLCollection (different from NodeList)

HTMLCollection is a live collection i.e., if DOM changes, then this
collection is immediately updated automatically
But the NodeList is won't update automatically
*/
document.getElementsByTagName("button");
document.getElementsByClassName("btn");

// 02 creating and inserting elements
// quick and easy way of creating elements --> .insertAdjacentHTML

// programmatically creating elements from scratch
const message = document.createElement("div"); // creates a dom element but not yet in the dom itself
message.classList.add("cookie-message");
message.textContent =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepend - adds as a first child of an element
// header.append(message); // append - adds as a last child of an element

// in the above case, message won't be in both the places (prepend and append)
// coz that is a live element in the DOM and it cannot be in two places at the same time

// what if we wanted to message be in the both places?
// clone and prepend / append
// header.append(message.cloneNode(true));

// inserts the element before / after the header element
header.before(message);
header.after(message);

// 03 deleting elements
// message.remove(); // recent method. Before this, removeChild method

/* ---------- 02 Styles, Attributes and Classes ---------- */
// 01 styles syntax --> element.style.property

// these styles apply as inline styles
message.style.backgroundColor = "#37383d";
message.style.width = "100%";

// reading styles
// message.styles.height; // empty result. Coz using the style property only works for inline style
// we cannot get the styles apply with the class

// in-order to access the styles applied on classes
getComputedStyle(message); // this contains all of the properties and values
getComputedStyle(message).color; // color
getComputedStyle(message).height; // height with unit
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// css custom properties / css variables
// in css they are defined in :root which is equal to document object in js
// can use setProperty method to set for non root properties. eg., message

// document.documentElement.style.setProperty("--color-primary", "orangered");

// 02 attributes
const logo = document.querySelector(".nav__logo");
logo.src; // will be an absolute url. Use getAttribute to get the relative url
logo.alt; // Bankist logo
logo.className; // nav__logo

// setting attributes
logo.alt = "Beautiful minimalist logo";

// reading non-standard attributes
logo.designer; // undefined eventhough it defined
logo.getAttribute("designer"); // will work
logo.setAttribute("company", "Bankist");

const navLinkBtn = document.querySelector(".nav__link--btn");
navLinkBtn.href; // will be an absolute url. Use getAttribute to get the relative
navLinkBtn.getAttribute("href");

// special type of attribute --> has to start with data eg. data-version-number
// use data attributes to store the data in the html code
// these special attributes are always stored in the dataset object
// Eg., consider data-version-number="3.0" attribute in .nav__logo
logo.dataset.versionNumber; // 3.0

// 03 Classes
logo.classList.add("test-class", "another-test-class"); // adds the classname
logo.classList.remove("test-class"); // remove the classname
logo.classList.toggle("another-test-class");
logo.classList.contains("another-test-class"); // not includes

// setting the classname
// don't use className to set the class name coz it over-rides all the classname
// and allows only one classname to insert in the element
logo.className = "Something";

/* ---------- 03 Types of Events and Event Handlers ---------- */
// an event is a signal generated by a DOM node

// 01 another way of adding events listeners - old way of adding event listeners
// const h1 = document.querySelector("h1");
// h1.onmouseenter = function () {
//   alert("Great! You're reading this heading :D");
// }; // TODO: have to remove from the comment

// 02 using addEventListener
/*
addEventListeners are better
01. helps to add multiple event listeners to the same event
02. can remove the event listeners if no more needed
*/

// mouseenter event --> mouseenter is like hover event in css
// const alertH1 = function () {
//   alert("Great! You're reading this heading :D");

//   h1.removeEventListener("mouseenter", alertH1);
// };
// h1.addEventListener("mouseenter", alertH1); // TODO: have to remove from the comment

// 03 using html attribute
/*
<h1 onclick="alert('HTML alert')">Heading</h1>
*/

/* ---------- 04 Event Propogation: Bubbling and Capturing ---------- */
/*
Capturing phase --> Target phase --> Bubbling phase

By default, events are listened only in target and bubbling phases. And we can
able to make the element listen to the capture phase too by setting the third
parameter of the addEventListener function true / false
*/
// 01 event bubbling
// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

/* 
NOTE: 
target is where the event is originated and not the element to which the 
event listener is attached

currentTarget is the element to which the event listener is attached.
currentTarget and this keyword are exactly the same
*/
// document
//   .querySelector(".nav__link")
//   .addEventListener("click", function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log("LINK", event.target, event.currentTarget);
//     console.log(event.currentTarget === this); // true

//     // stop the event propogation
//     event.stopPropagation(); // this is not the good idea
//   });

// document
//   .querySelector(".nav__links")
//   .addEventListener("click", function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log("CONTAINER", event.target, event.currentTarget);
//   });

// document.querySelector(".nav").addEventListener("click", function (event) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", event.target, event.currentTarget);
// }); // TODO: have to remove all 3 listeners from the comment

/* ---------- 05 DOM Traversing ---------- */
// Walking throught the DOM i.e., That we can select an element based on other element
const h1 = document.querySelector("h1");

// 01 going downwards: selecting child elements
// using querySelector on ELEMENTS
h1.querySelectorAll(".highlight");
h1.childNodes; // NodeList of every single child nodes of h1
h1.children; // HTMLCollections of h1 child elements
h1.firstElementChild;
h1.lastElementChild;

// 02 going upwards: selecting parents
h1.parentNode; // parent element with its direct children
h1.parentElement; // only the parent element

// closest finds the parent of an element no matter how far the DOM tree is
// closest is opposite of querySelector. querySelector finds the siblings no
// matter how deep it is whereas closest finds the closest parent of an element
// no matter how high it is.
h1.closest(".header"); // closest parent element Header of h1
h1.closest("h1"); // this will be the element itself and returns null if no element found

// 03 going sideways: selecting siblings
h1.previousElementSibling;
h1.nextElementSibling;

// getting all the siblings
h1.parentElement.children;
// HTMLCollections is not an array but an iterable so we can spread it
// [...h1.parentElement.children].forEach(function (child) {
//   if (child !== h1) child.style.transform = "scale(0.5)";
// });

/* ---------- 06 Passing arguments to Event Handlers ---------- */
// Look at MENU FADE AWAY SECTION

/* ---------- 07 Intersection Observer API ---------- */
// look at line no. 166

/* ---------- 08 Lifecycle DOM Events ---------- */
// Lifecycle --> from the initial page load to till user left the page

// 01 DOMContentLoaded event
/*
This event is fired by the document as soon as the html file is fully parsed
and all the scripts has been executed.

This event won't wait for the images or other external resources to be loaded.
Only waits for the html and js files to be loaded.

NOTE: don't need to listen to this event explicitly bcoz in the html file the 
script tag is at the end of the body. So script will be loaded once the HTML
is loaded entirely
*/
document.addEventListener("DOMContentLoaded", function (event) {
  console.log("HTML is parsed and DOM tree built!", event);
});

// 02 Load event
/*
This event is fired on window when all the images and the other external files 
are completely loaded
*/
window.addEventListener("load", function (event) {
  console.log("Page fully loaded", event);
});

// 03 BeforeUnload event
/*
This event is fired on window before a user is about to leave a page i.e., after
clicking a close button
*/
window.addEventListener("beforeunload", function (event) {
  event.preventDefault(); // to make this event to work (in some browsers)
  console.log(event);

  // display leaving confirmation
  event.returnValue = ""; // no matter the content, we get the same pop-up
});

/* ---------- 08 Efficient Script Loading: defer and async ---------- */
// different way of loading js in HTML. We can write the script tag in the
// head or in the end of the body element

// 01 regular way
// <script src="script.js"></script>

// 02 async
// <script async src="script.js"></script>

// 03 defer
// <script defer src="script.js"></script>
