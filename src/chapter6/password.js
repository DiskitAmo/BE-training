//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

// const password = "myPassword123";

// const hash = await bcrypt.hash(password, 12);

// console.log(hash);
// const isCorrect = await bcrypt.compare(password, hash);

// console.log(isCorrect);

// const token = jwt.sign(
//   {
//     sub: "123",
//     role: "user",
//   },
//   //process.env.JWT_SECRET,
//   "secret",
//   {
//     expiresIn: "15m",
//   },
// );

// console.log(token);
// const decoded = jwt.verify(token, "secret");
// console.log(decoded);

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  // Example only
  const user = {
    id: "123",
    email: "test@example.com",
    password: await bcrypt.hash("password123", 12),
    role: "USER",
  };

  if (email !== user.email) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.json({
    accessToken,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
