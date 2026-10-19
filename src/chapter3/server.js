const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  //console.log(req.method);
  //console.log(req.headers);
  //console.log(req.headers["content-type"]);
  const user = {
    id: 1,
    name: "Diskit",
  };
  const url = new URL(req.url, "http://localhost");
  // if (req.url === "/") {
  //   // res.writeHead(200, { "Content-Type": "text/html" });
  //   res.setHeader("Content-Type", "text/plain");
  //   res.statusCode = 200;
  //   res.write("Hello ");
  //   res.write("from ");
  //   res.write("Node.js");

  //   res.end("\n<h1>Welcome to the Home Page</h1>");
  //   //res.end(JSON.stringify(user));
  // }
  if (req.url === "/") {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading page");
        return;
      }

      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });

    return;
  }
  if (req.method === "GET" && url.pathname === "/about") {
    // const url = new URL(req.url, "http://localhost");
    // console.log(url.pathname);
    // console.log(url.searchParams);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(body);
      const data = JSON.parse(body);
      console.log(data);
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    //res.end("<h1>About Us</h1>");
    res.end("Get users");
  }

  if (req.method === "POST" && url.pathname === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        console.log(data);
        console.log(data.name);
        console.log(data.email);

        res.statusCode = 201;
        res.end("User created");
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });

    return;
  }

  res.statusCode = 404;
  res.end("Route not found");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
