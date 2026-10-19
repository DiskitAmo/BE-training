const express = require("express");
//const { randomUUID } = require("crypto");

const app = express();
app.use(express.json());

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// const id = randomUUID();
// console.log(id);

const notes = [
  { id: 1, title: "Learn Node.js", content: "Study HTTP module" },
  { id: 2, title: "Practice", content: "Build CRUD API" },
];

app.get("/notes", (req, res) => {
  console.log(notes);
  res.status(200).json({
    message: "Get notes data",
    notes: notes,
  });
  //res.send("Get users");
});

app.post("/notes", (req, res) => {
  console.log("body:", req.body);

  const data = req.body;

  const note = {
    id: notes.length + 1,
    ...data,
  };
  notes.push(note);
  res.status(201).json({
    message: "Note created",
    notes: notes,
  });
});

app.put("/notes/:id", (req, res) => {
  const updatedData = req.body;
  console.log("Data updated:", updatedData);

  const note = notes.find((note) => note.id === Number(req.params.id));
  console.log(note);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // if (!note) {
  //   res.statusCode = 404;
  //   return res.end("Note not found");
  // }

  Object.assign(note, updatedData);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updatedData));
});

app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex((note) => note.id === req.params.id);

  if (index === -1) {
    res.statusCode = 404;
    return res.end("Note not found");
  }

  notes.splice(index, 1);
  res.statusCode = 200;
  res.end("Note deleted");
});

app.get("/notes/test-error", async (req, res, next) => {
  // try {
  //   throw new AppError("Something went wrong", 500);
  // } catch (error) {
  //   next(error);
  // }
  throw new AppError("Something went wrong", 500);
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server using express running on port 3000");
});
