// common/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    console.log("Before handler...");

    return next
      .handle()
      .pipe(tap(() => console.log(`After handler... ${Date.now() - start}ms`)));
  }
}
