import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let code = err.code || "INTERNAL_ERROR";
  let message = err.message || "Something went wrong";
  let details = err.details || {};

  // Prisma: record not found (update/delete)
  if (err.code === "P2025") {
    statusCode = 404;
    code = "NOT_FOUND";
    message = "Resource not found";
    details = {};
  }

  // Prisma: unique constraint violation
  if (err.code === "P2002") {
    statusCode = 409;
    code = "CONFLICT";
    message = "Resource already exists";
    details = { fields: err.meta?.target };
  }

  // Don't leak internal messages
  if (statusCode === 500) {
    message = "Something went wrong";
    details = {};
  }

  res.status(statusCode).json({ error: { code, message, details } });
}
