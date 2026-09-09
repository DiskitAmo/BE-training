const express = require("express");
const { randomUUID } = require("crypto");
const noteRouter = require("./routes/notes.routers");

const app = express();

app.use(express.json());

//TASK 3C & 3D
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(`[${req.method}] ${req.path} - ${timestamp}`);

  next();
});

app.use((req, res, next) => {
  const requestId = randomUUID();

  req.requestId = requestId;

  res.setHeader("X-Request-Id", requestId);

  next();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

app.use("/notes", noteRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
