const http = require("http");

const notes = [
  { id: 1, title: "Learn Node.js", content: "Study HTTP module" },
  { id: 2, title: "Practice", content: "Build CRUD API" },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/notes") {
    console.log(notes);
    res.end(JSON.stringify(notes));
  }

  if (req.method === "POST" && req.url === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        console.log(data);

        const note = {
          id: notes.length + 1,
          ...data,
        };
        notes.push(note);
        res.statusCode = 201;
        res.end("Note created");
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });

    return;
  }
  const url = new URL(req.url, "http://localhost");

  if (req.method === "PUT" && url.pathname.startsWith("/notes/")) {
    const id = url.pathname.split("/")[2];
    console.log(id);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const updatedData = JSON.parse(body);
        console.log("Data updated:", updatedData);

        const note = notes.find((note) => note.id === Number(id));
        console.log(note);
        if (!note) {
          res.statusCode = 404;
          return res.end("Note not found");
        }

        Object.assign(note, updatedData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Note updated");
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Invalid JSON payload");
      }
    });
  }

  if (req.method === "DELETE" && url.pathname.startsWith("/notes/")) {
    const id = Number(url.pathname.split("/")[2]);
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      res.statusCode = 404;
      return res.end("Note not found");
    }

    notes.splice(index, 1);
    res.statusCode = 200;
    res.end("Note deleted");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
