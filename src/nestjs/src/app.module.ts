import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { UserModule } from "./user/user.module.js";
import { UserController } from "./user/user.controller.js";
import { ApiKeyMiddleware } from "./middleware/api-key.middleware.js";
import { ScopesDemoModule } from "./scope-demo.js";
import { HealthModule } from "./health/health.module.js";
import { PostsModule } from "./posts/posts.module.js";
import {
  AppConfig,
  ConfigLoggerService,
} from "./config/config-logger.service.js";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { resolve } from "node:path";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: resolve(process.cwd(), ".env"),
      envFilePath: resolve(process.cwd(), "..", "..", ".env"),
      validationSchema: Joi.object({
        PORT: Joi.number().port().required(),
        DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UserModule,
    ScopesDemoModule,
    PostsModule,
    HealthModule,
  ],
  controllers: [AppController],
  //providers: [AppService],
  providers: [
    {
      provide: "APP_CONFIG",
      useFactory: (configService: ConfigService): AppConfig => ({
        port: configService.getOrThrow<number>("PORT"),
        databaseUrl: configService.getOrThrow<string>("DATABASE_URL"),
        jwtSecret: configService.getOrThrow<string>("JWT_SECRET"),
      }),

      inject: [ConfigService],
    },

    ConfigLoggerService,
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(ApiKeyMiddleware).forRoutes(UserController);
  }
}
