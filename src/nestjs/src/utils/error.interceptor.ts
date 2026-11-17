import { catchError, Observable, throwError } from "rxjs";
import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          return throwError(() => err); // keep our own HTTP errors as they are
        }
        return throwError(() => new BadGatewayException("Upstream failure"));
      }),
    );
  }
}
