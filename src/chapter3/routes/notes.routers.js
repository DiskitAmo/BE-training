const express = require("express");

const router = express.Router();

const notes = [
  { id: 1, title: "Learn Node.js", content: "Study HTTP module" },
  { id: 2, title: "Practice", content: "Build CRUD API" },
];

router.get("/", (req, res) => {
  console.log(notes);
  res.status(200).json({
    message: "Get notes",
    notes: notes,
  });
});

router.post("/", (req, res) => {
  console.log("body:", req.body);
  const data = req.body;

  const note = {
    id: notes.length + 1,
    ...data,
  };
  notes.push(note);
  res.status(201).json({
    message: "Note created",
  });
});

router.put("/:id", (req, res) => {
  const updatedData = req.body;
  console.log("Data updated:", updatedData);

  const note = notes.find((note) => note.id === Number(req.params.id));
  console.log(note);
  if (!note) {
    res.statusCode = 404;
    return res.end("Note not found");
  }

  Object.assign(note, updatedData);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("Note updated");
});

router.delete("/:id", (req, res) => {
  const index = notes.findIndex((note) => note.id === Number(req.params.id));

  if (index === -1) {
    res.statusCode = 404;
    return res.end("Note not found");
  }

  notes.splice(index, 1);
  res.statusCode = 200;
  res.end("Note deleted");
});

module.exports = router;
