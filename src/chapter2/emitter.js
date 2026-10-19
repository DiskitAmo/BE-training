const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener for the 'greet' event
// emitter.on("greet", (name) => {
//   console.log(`Hello, ${name}!`);
// });

// const greet = (name, age) => {
//   console.log(`Hello hi, ${name}! You are ${age}.`);
// };

// const ask = (name) => {
//   console.log(`How are you, ${name}!`);
// };

// emitter.on("greet", greet);
// emitter.on("greet", ask);

// // Emit the event
// console.log("Before removing listener:");
// emitter.emit("greet", "Angmo", 25);

// // Remove only the first listener
// emitter.off("greet", greet);

// console.log("\nAfter removing listener:");
// emitter.emit("greet", "Angmo", 25);

const { spawn, exec } = require("child_process");

// const child = spawn("ping", ["google.com"]);

// child.stdout.on("data", (data) => {
//   console.log(data.toString());
// });

// child.on("close", (code) => {
//   console.log("Exited with", code);
// });

exec("dir", (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(stdout);
});
