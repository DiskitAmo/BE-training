//const greet = require("./greet");
// import greet from "./greet.js";
// import path from "path";
// import { fileURLToPath } from "url";

//console.log("Node Practice Project");
//TASK-1A
const numbers = [1, 2, 3, 4, 5];

for (const num of numbers) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(num);
}

console.log("Done");

//fetch 5 urls using for of loop and await
const startTime = new Date();
console.log("Start Time:", startTime);
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];
for (const url of urls) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
console.log("Done for of fetching");
//console the time stamps befor and after the fetch

const endTime = new Date();
console.log("End Time:", endTime);

//fetch 5 urls using Promise.all
const startTimePromiseAll = new Date();
console.log("Start Time for Promise.all:", startTimePromiseAll);

const fetchPromises = urls.map((url) => fetch(url).then((res) => res.json()));
const results = await Promise.all(fetchPromises);
console.log("Promise.all result:", results);

const endTimePromiseAll = new Date();
console.log("End Time for Promise.all:", endTimePromiseAll);

//promises TASK-1B
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

fetchData();

//TASK-1C
const numbers = [1, 2, 3, 4, 5];

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

//using  async and try catch

const sumOfPositiveNumbersAsync = async () => {
  try {
    const sum = numbers.reduce((acc, num) => {
      if (num < 0) {
        throw new Error("Negative number (async)");
      }
      return acc + num;
    }, 0);
    console.log("Sum of positive numbers (async):", sum);
  } catch (error) {
    console.error("Error (async):", error);
  }
};

sumOfPositiveNumbersAsync();

//TASK-1D
const p1 = Promise.resolve("User");
const p2 = Promise.reject("Error 1");
const p3 = Promise.resolve("Product");
const p4 = Promise.reject("Error 2");

Promise.allSettled([p1, p2, p3, p4]).then(console.log);

//TASK-1E
// console.log(greet("angmo"));
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// console.log("dirname:", dirname);
// console.log("path:", path.join(dirname, "greet.js"));
// console.log("filename:", filename);

//TASK-1F
console.log("Start (Sync)"); //1

setTimeout(() => {
  console.log("setTimeout (Macro-task)"); //5
}, 0);

Promise.resolve().then(() => {
  console.log("Promise (Micro-task)"); //4
});

process.nextTick(() => {
  console.log("process.nextTick (Tick queue)"); //3
});

console.log("End (Sync)"); //2

// const fs = require("fs");

// console.log("Start");

// fs.readFile("./src/message.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// console.log("End");
