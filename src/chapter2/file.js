const fs = require("fs");
const { Transform } = require("stream");
const { pipeline } = require("stream/promises");
//const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");

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

//TASK 2A

const Task2a = () => {
  const args = process.argv;

  //console.log(args?.[2], args?.[3]);
  const filter = args?.[3];
  const [column, value] = filter?.split("=") || [];
  //console.log("column", column, "value", value);
  const readable = fs.createReadStream(`${args?.[2]}`, { encoding: "utf8" });
  const write = fs.createWriteStream("filtered.csv");

  readable.on("data", (chunk) => {
    //console.log(chunk);
    chunk.split("\n").forEach((line) => {
      const columns = line.split(",");
      //console.log("line", line, columns);
      const [id, name, age, city] = columns;
      //console.log("city:", JSON.stringify(city), "value:", JSON.stringify(value));
      if (city.trim() === value) {
        console.log("Matched!");
        write.write(`${id},${name},${age},${city}\n`);
      }
    });
  });
};

//Task2a();

//TASK 2B
const readDirectory = async () => {
  try {
    const files = await fs.readdir(__dirname);
    console.log(files);
    const textFiles = files.filter((file) => {
      console.log("ext:", path.extname(file));
      return path.extname(file) === ".txt";
    });
    console.log(textFiles);
  } catch (err) {
    console.error(err);
  }
};

//readDirectory();

//TASK 2C

const filePathwithCommonJS = () => {
  const path = require("path");
  const currentFile = __filename;

  // dirname()
  const currentDir = path.dirname(currentFile);
  // join()
  const configPath = path.join(currentDir, "config", "config.json");
  //resolve()
  const absoluteConfigPath = path.resolve(configPath);
  // extname()
  const extension = path.extname(configPath);

  console.log("Current file:", currentFile);
  console.log("Current directory:", currentDir);
  console.log("Config path:", configPath);
  console.log("Absolute config path:", absoluteConfigPath);
  console.log("Extension:", extension);
};

//filePathwithCommonJS();

// import path from "path";
// import { fileURLToPath } from "url";

// const filePathwithModules = () => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const configPath = path.join(__dirname, "config", "config.json");

//   console.log("Filename:", __filename);
//   console.log("Directory:", __dirname);
//   console.log("Config path:", configPath);
//   console.log("Extension:", path.extname(configPath));
// };
//filePathwithModules();

//TASK 2D
const BufferTask = () => {
  const buffer = Buffer.from("Diskit", "utf8");
  console.log(buffer);

  console.log(buffer.toString("hex"));
  const hexDecoded = Buffer.from("4469736b6974", "hex");
  console.log(hexDecoded.toString());

  console.log(buffer.toString("base64"));
  const decoded = Buffer.from("RGlza2l0", "base64");
  console.log(decoded.toString());
};
//BufferTask();

//TASK 2E
const streamTask = async () => {
  const input = path.join(__dirname, "test.txt");
  const output = path.join(__dirname, "copy.txt");

  console.log("input:", input);
  console.log("output:", output);

  const readable = fs.createReadStream(input);

  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const upperCaseChunk = chunk.toString().toUpperCase();

      callback(null, upperCaseChunk);
    },
  });

  const write = fs.createWriteStream(output);

  try {
    await pipeline(readable, upperCaseTransform, write);

    console.log("Pipeline completed successfully");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};
//streamTask();

//Task 2G

// console.log(fs.readFileSync("../../.env", "utf8"));
// const dotenv = require("dotenv");
// const envPath = path.resolve(__dirname, "../../.env");
// dotenv.config({ path: envPath });
// console.log("PORT:", process.env.PORT);
//node app.js --env production

const loadEnv = () => {
  const args = process.argv;

  const envFlag = args.indexOf("--env");
  if (envFlag === -1) {
    console.error("Usage: node file.js --env <environment>");
    process.exit(1);
  }
  const env = args[envFlag + 1];

  console.log("Environment:", env);

  //console.log(fs.readFileSync(`../../.env.${env}`, "utf8"));
  const envPath = path.resolve(__dirname, `../../.env.${env}`);
  console.log("Env path:", envPath);

  //console.log("File contents:", fs.readFileSync(envPath, "utf8"));

  dotenv.config({ path: envPath });

  console.log("PORT:", process.env.NODE_ENV);
  console.log("DB_URL:", process.env.DB_URL);
};

//loadEnv();

//TASK 2F

const eventBusTask = () => {
  const EventEmitter = require("events");

  class EventBus extends EventEmitter {}

  const eventBus = new EventBus();

  const userDetails = (user) => {
    console.log("New user created:");
    console.log("ID:", user.id);
    console.log("Name:", user.name);
  };

  const sendWelcomeEmail = (user) => {
    console.log(`Sending welcome email to ${user.name}`);
  };

  // Subscribe to the event
  eventBus.on("userCreated", userDetails);
  eventBus.on("userCreated", sendWelcomeEmail);

  //emove the listener for sendWelcomeEmail after the first event is emitted
  eventBus.removeListener("userCreated", sendWelcomeEmail);

  // Publish the event
  eventBus.emit("userCreated", {
    id: 1,
    name: "Angmo",
  });
};
//eventBusTask();
