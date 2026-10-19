export type AppError = Error & {
  statusCode: number;
  code: string;
  details: Record<string, unknown>;
};

export function createError(
  statusCode: number,
  code: string,
  message: string,
  details: Record<string, unknown> = {},
): AppError {
  return Object.assign(new Error(message), { statusCode, code, details });
}

export function validationError(
  fields: Record<string, string[] | undefined>,
  form: string[] = [],
): AppError {
  return createError(400, "VALIDATION_ERROR", "Request validation failed", {
    fields,
    form,
  });
}
