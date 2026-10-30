import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log("headers:", req.headers);
    console.log("expected:", JSON.stringify(process.env.API_KEY));
    console.log("received:", JSON.stringify(req.headers["x-api-key"]));
    // ...rest unchanged
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== this.config.get<string>("API_KEY")) {
      throw new UnauthorizedException("Invalid API key");
    }
    next();
  }
}
