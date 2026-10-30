import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TransformInterceptor } from "./utils/transform.interceptor.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in the DTO
      forbidNonWhitelisted: true, // throw if extra properties are sent
      transform: true, // convert plain objects into DTO class instances
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>("PORT");

  await app.listen(port);
  console.log(`Application running on port ${port}`);
}

bootstrap();
