import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import { prisma } from "../chapter5/lib/prisma.ts";

const router = Router();
const ACCESS_TOKEN_LIFETIME = "15m";
const REFRESH_TOKEN_DAYS = 7;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_EXPIRY_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from .env");
}

function hashRefreshToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function createAccessToken(user) {
  return jwt.sign({ role: user.role }, JWT_SECRET, {
    subject: user.id,
    expiresIn: ACCESS_TOKEN_LIFETIME,
    issuer: "blog-api",
    audience: "blog-api",
  });
}

function createRefreshToken() {
  return randomBytes(64).toString("hex");
}

function refreshExpiry() {
  return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
}

// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Name and email are required; password must be 8-72 bytes",
        },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        error: {
          code: "EMAIL_EXISTS",
          message: "An account with this email already exists",
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: "USER",
        isAdmin: false,
        preferences: {},
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    // Also handles concurrent attempts to register
    // the same email address.
    if (error.code === "P2002") {
      return res.status(409).json({
        error: {
          code: "EMAIL_EXISTS",
          message: "An account with this email already exists",
        },
      });
    }

    next(error);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Email and password are required",
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
    }

    const refreshToken = createRefreshToken();

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashRefreshToken(refreshToken),
        expiresAt: refreshExpiry(),
      },
    });

    const accessToken = createAccessToken(user);

    return res.json({
      data: {
        accessToken,
        refreshToken,
        tokenType: "Bearer",
        expiresIn: 900,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /auth/refresh
// router.post("/refresh", async (req, res, next) => {
//   try {
//     const { refreshToken } = req.body;

//     if (
//       typeof refreshToken !== "string" ||
//       !/^[a-f0-9]{128}$/.test(refreshToken)
//     ) {
//       return res.status(401).json({
//         error: {
//           code: "INVALID_REFRESH_TOKEN",
//           message: "Refresh token is invalid or expired",
//         },
//       });
//     }

//     const oldHash = hashRefreshToken(refreshToken);
//     const newRefreshToken = createRefreshToken();
//     const now = new Date();

//     const user = await prisma.$transaction(async (tx) => {
//       const stored = await tx.refreshToken.findUnique({
//         where: { tokenHash: oldHash },
//         include: { user: true },
//       });

//       if (!stored || stored.revokedAt || stored.expiresAt <= now) {
//         throw new Error("INVALID_REFRESH_TOKEN");
//       }

//       // Atomic conditional update prevents two concurrent
//       // refresh requests from both rotating the same token.
//       const result = await tx.refreshToken.updateMany({
//         where: {
//           id: stored.id,
//           revokedAt: null,
//           expiresAt: { gt: now },
//         },
//         data: {
//           revokedAt: now,
//         },
//       });

//       if (result.count !== 1) {
//         throw new Error("INVALID_REFRESH_TOKEN");
//       }

//       await tx.refreshToken.create({
//         data: {
//           userId: stored.userId,
//           tokenHash: hashRefreshToken(newRefreshToken),
//           expiresAt: refreshExpiry(),
//         },
//       });

//       return stored.user;
//     });

//     const accessToken = createAccessToken(user);

//     return res.json({
//       data: {
//         accessToken,
//         refreshToken: newRefreshToken,
//         tokenType: "Bearer",
//         expiresIn: 900,
//       },
//     });
//   } catch (error) {
//     if (error.message === "INVALID_REFRESH_TOKEN") {
//       return res.status(401).json({
//         error: {
//           code: "INVALID_REFRESH_TOKEN",
//           message: "Refresh token is invalid or expired",
//         },
//       });
//     }

//     next(error);
//   }
// });
router.post("/refresh", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (typeof refreshToken !== "string" || !refreshToken) {
      return res.status(401).json({
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Refresh token is missing or invalid",
        },
      });
    }

    const tokenHash = hashRefreshToken(refreshToken);
    const now = new Date();

    // Look up the hash, never the raw token.
    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt <= now) {
      return res.status(401).json({
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Refresh token is invalid or expired",
        },
      });
    }

    // Generate the replacement tokens.
    const newRefreshToken = randomBytes(64).toString("hex");
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);
    const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);

    // Consume the old token and save the replacement atomically.
    const user = await prisma.$transaction(async (tx) => {
      const consumed = await tx.refreshToken.deleteMany({
        where: {
          id: storedToken.id,
          tokenHash,
          revokedAt: null,
          expiresAt: { gt: now },
        },
      });

      // Another request may already have consumed this token.
      if (consumed.count !== 1) {
        return null;
      }

      await tx.refreshToken.create({
        data: {
          userId: storedToken.userId,
          tokenHash: newRefreshTokenHash,
          expiresAt: newExpiresAt,
        },
      });

      return storedToken.user;
    });

    if (!user) {
      return res.status(401).json({
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Refresh token has already been used",
        },
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
      tokenType: "Bearer",
      expiresIn: 900,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
