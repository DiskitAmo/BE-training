// src/filters/prisma-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "../../../../generated/prisma/client.js";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Database error";

    switch (exception.code) {
      case "P2025":
        status = HttpStatus.NOT_FOUND;
        message = "Record not found";
        break;
      case "P2002":
        status = HttpStatus.CONFLICT;
        message = "A record with this value already exists";
        break;
      case "P2003":
        status = HttpStatus.BAD_REQUEST;
        message = "Related record does not exist";
        break;
      default:
        this.logger.error(
          `Unhandled Prisma error ${exception.code}`,
          exception.stack,
        );
    }

    response
      .status(status)
      .json({ statusCode: status, message, code: exception.code });
  }
}
