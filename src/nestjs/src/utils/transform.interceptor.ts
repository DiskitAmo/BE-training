import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode ?? 200; // Default to 200 if statusCode is undefined

    return next.handle().pipe(
      map((data: any) => ({
        statusCode,
        message: "Success",
        data,
      })),
    );
  }
}
