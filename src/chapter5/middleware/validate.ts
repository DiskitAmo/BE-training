import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";
import { validationError } from "../errors/apperror.ts";

export type Target = "body" | "params" | "query";
declare global {
  namespace Express {
    interface Request {
      validated: Partial<Record<Target, unknown>>;
    }
  }
}
export function validate(schema: ZodType, target: Target) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error);
      return next(validationError(fieldErrors, formErrors));
    }

    req.validated = { ...req.validated, [target]: result.data };
    next();
  };
}
