import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type Target = "body" | "params" | "query";

declare global {
  namespace Express {
    interface Request {
      validated: Partial<Record<Target, unknown>>;
    }
  }
}

export function validate(schema: ZodType, target: Target) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed",
          details: {
            fields: result.error.flatten().fieldErrors,
          },
        },
      });
    }

    req.validated = { ...req.validated, [target]: result.data };

    next();
  };
}
