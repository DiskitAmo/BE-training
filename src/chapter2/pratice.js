const fs = require("fs");
const path = require("path");

// fs.writeFileSync("text.txt", "Hello, World YOUUUUU!");
// console.log("File written successfully!");

// const data = fs.readFileSync("text.txt", "utf8");
// console.log("File content:", data);

//fs.appendFileSync("text.txt", "\nAppended text sync.");

//fs.copyFileSync("text.txt", "copy.txt");

//fs.unlinkSync("copy.txt");
//console.log(fs.statSync("text.txt").isFile());
//fs.mkdirSync("newFolder");
//fs.mkdirSync("newFolders/a/b/c", { recursive: true });

//async
// fs.writeFile("text.txt", "Hello, World YOUUUUU!", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File written successfully!");
// });

// fs.readFile("text.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File content async:", data);
// });

// fs.appendFile("text.txt", "\nAppended text async.", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Text appended successfully!");
// });

// fs.unlink("copy.txt", (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log("Deleted");
// });

// fs.mkdir("images/uploads/profile", { recursive: true }, (err) => {
//   if (err) throw err;

//   console.log("Created");
// });

// fs.readdir("images", (err, files) => {
//   if (err) throw err;

//   console.log(files);
// });

// fs.rename("text.txt", "test.txt", (err) => {
//   if (err) throw err;

//   console.log("Renamed");
// });

//PATH MODULE

// console.log(path.basename("resume.pdf", ".pdf"));
// console.log(path.dirname("images/uploads/profile"));
// console.log(path.extname("resume.pdf"));
// console.log(path.isAbsolute("images/uploads/profile"));
// console.log(path.join("images", "uploads/", "/profile"));
// console.log(path.normalize("images/./uploads/../profile"));
// console.log(path.parse("images/uploads/profile"));
// console.log(path.resolve("images/uploads/profile"));

//const filePath = "users/" + "//images/" + "photo.jpg";
// const filePath = path.join("users1", "//images1", "../photo.jpg");
// console.log(filePath);

//BUFFER MODULE
// const buffer = Buffer.from("Diskit");
// console.log(buffer);
// console.log(buffer.toJSON());
// console.log(buffer.toString());

// const buf = Buffer.from([65, 66, 67]);
// console.log(buf.toString());

// console.log(buf.toString("hex"));
// console.log(buf.toString("latin1"));
// console.log(buf.toString("base64"));
// const decoded = Buffer.from("QUJD", "base64");
// console.log(decoded.toString());

// const buff = Buffer.alloc(10);
// buff.write("Hello");
// console.log(buff);

// const bufunsafe = Buffer.allocUnsafe(10);
// console.log(bufunsafe);

//STREAMS MODULE

//TASK 2e
// const readable = fs.createReadStream(
//   "test.txt",
//   //{ encoding: "utf8" }
// );
// const write = fs.createWriteStream("copy.txt");
// readable.on("data", (chunk) => {
//   console.log(chunk);
// });
// readable.on("end", () => {
//   console.log("Finished reading");
// });
// readable.pipeline(write);

// const writable = fs.createWriteStream("output.txt");
// writable.write("Hello\n");
// writable.write("World\n");
// if (!writable.write(bigChunk)) {
//   writable.once("drain", () => {
//     console.log("Continue writing...");
//   });
// }
// writable.end("Goodbye\n", () => {
//   console.log("Finished writing");
// });

//PROCESS AND ENVIROMENT

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// require("dotenv").config();
// console.log(process.env.PORT);
//console.log(process.argv);
// console.log(process.cwd());
// console.log(process.pid);
// process.on("exit", (code) => {
//   console.log("Exiting with code", code);
// });

// process.on("uncaughtException", (err) => {
//   console.error("Unexpected error:", err.message);
//   process.exit(1);
// });

// throw new Error("Something went wrong");

// process.on("SIGINT", () => {
//   console.log("Interrupted");

//   process.exit(0);
// });

// process.on("SIGTERM", () => {
//   console.log("Closing server...");

//   server.close(() => {
//     console.log("Server closed");
//     process.exit(0);
//   });
// });

// const readable = fs.createReadStream(
//   "test.txt",
//   //{ encoding: "utf8" }
// );
// const write = fs.createWriteStream("copy.txt");
// readable.on("data", (chunk) => {
//   console.log(chunk);
// });
// readable.on("end", () => {
//   console.log("Finished reading");
// });
// readable.pipe(write);

// console.log(fs.readFileSync("../../.env", "utf8"));
// const dotenv = require("dotenv");
// const envPath = path.resolve(__dirname, "../../.env");
// dotenv.config({ path: envPath });
// console.log("PORT:", process.env.PORT);
//node app.js --env production
