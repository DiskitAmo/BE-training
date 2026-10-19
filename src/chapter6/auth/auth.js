import "dotenv/config";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const app = express();

app.use(express.json());

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Temporary in-memory database

const users = [];
const refreshTokens = [];

// POST /auth/register

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      role: "USER",
    };

    users.push(user);

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// POST /auth/login

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password with stored bcrypt hash
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create short-lived access token

    const accessToken = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // Create long-lived refresh token

    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Hash refresh token before storing it
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Store hashed refresh token
    refreshTokens.push({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      revokedAt: null,
    });

    // Send raw refresh token to client
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// POST /auth/refresh

app.post("/auth/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    // Hash incoming refresh token
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find stored token
    const storedToken = refreshTokens.find(
      (token) => token.tokenHash === tokenHash,
    );

    if (!storedToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Check if token was revoked
    if (storedToken.revokedAt) {
      return res.status(401).json({
        message: "Refresh token has been revoked",
      });
    }

    // Check expiration
    if (storedToken.expiresAt < Date.now()) {
      return res.status(401).json({
        message: "Refresh token expired",
      });
    }

    // Find user
    const user = users.find((user) => user.id === storedToken.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ROTATE refresh token

    // Revoke old refresh token
    storedToken.revokedAt = Date.now();

    // Create new access token
    const accessToken = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // Create new refresh token
    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    // Hash new refresh token
    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    // Store new refresh token hash
    refreshTokens.push({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash: newRefreshTokenHash,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      revokedAt: null,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// POST /auth/logout

app.post("/auth/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(204).send();
    }

    // Hash refresh token
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find token
    const storedToken = refreshTokens.find(
      (token) => token.tokenHash === tokenHash,
    );

    if (storedToken) {
      // Revoke it
      storedToken.revokedAt = Date.now();
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
