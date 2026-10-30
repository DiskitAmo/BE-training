import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

export interface AppConfig {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
}

@Injectable()
export class ConfigLoggerService implements OnModuleInit {
  constructor(
    @Inject("APP_CONFIG")
    private readonly config: AppConfig,
  ) {}

  onModuleInit() {
    console.log("Application configuration loaded:");
    console.log("PORT:", this.config.port);
    console.log("DATABASE_URL:", this.config.databaseUrl);

    // Never print the actual JWT secret.
    console.log(
      "JWT_SECRET:",
      this.config.jwtSecret ? "[configured]" : "[missing]",
    );
  }
}
