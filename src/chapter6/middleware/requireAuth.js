import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Access token is required",
      },
    });
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Access token is required",
      },
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "blog-api",
      audience: "blog-api",
    });

    // The subject (sub) is the user ID from generateAccessToken().
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: {
          code: "TOKEN_EXPIRED",
          message: "Access token has expired",
        },
      });
    }

    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Access token is invalid",
      },
    });
  }
}
