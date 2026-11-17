// common/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const start = Date.now();
//     console.log("Before handler...");

//     return next
//       .handle()
//       .pipe(tap(() => console.log(`After handler... ${Date.now() - start}ms`)));
//   }
// }

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
      }),
    );
  }
}
