const fs = require("fs");

//sync
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

fs.rename("text.txt", "test.txt", (err) => {
  if (err) throw err;

  console.log("Renamed");
});
