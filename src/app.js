//const greet = require("./greet");
// import greet from "./greet.js";
// import path from "path";
// import { fileURLToPath } from "url";

//console.log("Node Practice Project");
//TASK-1A

//fetch 5 urls using for of loop and await

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];
const fetchUrls = async () => {
  const startTime = new Date().toLocaleTimeString();
  const start = Date.now();
  console.log("Start Time:", startTime);
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.id);
  }
  console.log("Done for of fetching");
  const endTime = new Date().toLocaleTimeString();
  const end = Date.now();
  console.log("End Time:", endTime);
  console.log("Time taken:", end - start, "ms");
};

//fetch 5 urls using Promise.all
const fetchUrlsWithPromiseAll = async () => {
  const startTimePromiseAll = new Date().toLocaleTimeString();
  const start = Date.now();
  console.log("Start Time for Promise.all:", startTimePromiseAll);

  const fetchPromises = urls.map((url) => fetch(url).then((res) => res.json()));
  const results = await Promise.all(fetchPromises);
  console.log(
    "Promise.all result:",
    results.map((data) => data.id),
  );

  const endTimePromiseAll = new Date().toLocaleTimeString();
  const end = Date.now();
  console.log("End Time for Promise.all:", endTimePromiseAll);
  console.log("Time taken for Promise.all:", end - start, "ms");
};
//fetchUrls();
//fetchUrlsWithPromiseAll();

//promises TASK-1B
const promiseREsolve = async () => {
  const promise = new Promise((resolve, reject) =>
    setTimeout(resolve("Promise resolved!"), 1000),
  );
  promise
    .then((message) => {
      console.log("result:", message);
      return "first message";
    })
    .then((message) => console.log("message:", message))
    .catch((err) => console.error("Error in promise:", err));
};

//promiseREsolve();
//console.log("Before promiseREsolve");
const fetchData = async () => {
  try {
    const message = await new Promise((resolve, reject) =>
      setTimeout(resolve("Promise resolved in try block!"), 1000),
    );
    console.log(message);
    console.log("try block executed");
    console.log("successfully executed");
  } catch (error) {
    console.error("Error:", error);
  }
};
//console.log("After promiseREsolve");
//fetchData();

// //TASK-1C
const numbers = [1, 2, -3, 4, 5];

const sumOfPositiveNumbersPromise = () => {
  const sumOfpositiveNumbers = new Promise((resolve, reject) => {
    const sum = numbers.reduce((acc, num) => {
      if (num < 0) {
        reject("Negative number");
      }
      return acc + num;
    }, 0);
    resolve(sum);
  });

  sumOfpositiveNumbers
    .then((sum) => console.log("Sum of positive numbers:", sum))
    .catch((error) => console.error("Error:", error));
};

//sumOfPositiveNumbersPromise();

//using  async and try catch

const sumOfPositiveNumbersAsync = () => {
  try {
    const sum = numbers.reduce((acc, num) => {
      if (num < 0) {
        throw new Error("Negative number (async)");
      }
      return acc + num;
    }, 0);
    console.log("Sum of positive numbers (async):", sum);
  } catch (error) {
    console.error("Error (async):", error.message);
  }
};

//sumOfPositiveNumbersAsync();

//TASK-1D

const promiseAllSettledExample = () => {
  const p1 = Promise.resolve("User");
  const p2 = Promise.reject("Error 1");
  const p3 = Promise.resolve("Product");
  const p4 = Promise.reject("Error 2");

  Promise.allSettled([p1, p2, p3, p4]).then(console.log);
};

//promiseAllSettledExample();

//TASK-1E

// console.log(greet("angmo"));
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// console.log("dirname:", dirname);
// console.log("path:", path.join(dirname, "greet.js"));
// console.log("filename:", filename);

//TASK-1F

const macroAndMicroTaskExample = () => {
  console.log("Start "); //1

  setTimeout(() => {
    console.log("setTimeout"); //5
  }, 0);

  Promise.resolve().then(() => {
    console.log("Promise"); //4
  });

  process.nextTick(() => {
    console.log("process.nextTick"); //3
  });

  console.log("End"); //2
};

macroAndMicroTaskExample();
