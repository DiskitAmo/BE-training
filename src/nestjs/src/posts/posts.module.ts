import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller.js";
import { PostsService } from "./posts.service.js";
import { UserModule } from "../user/user.module.js";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UserModule],
})
export class PostsModule {}
