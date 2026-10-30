import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";

import { PostsService } from "./posts.service.js";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // POST /posts
  @Post()
  create(@Body() body: { title: string; content: string; authorId: number }) {
    return this.postsService.create(body);
  }

  // GET /posts
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // GET /posts/:id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Get(":id/author")
  findAuthor(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.findAuthorByPostId(id);
  }

  // PATCH /posts/:id
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.postsService.update(id, body);
  }

  // PUT /posts/:id
  @Put(":id")
  replace(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { title: string; content: string; authorId: number },
  ) {
    return this.postsService.replace(id, body);
  }

  // DELETE /posts/:id
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
