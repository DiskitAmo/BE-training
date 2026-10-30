import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService, User } from "../user/user.service.js";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private nextId = 1;
  constructor(private readonly usersService: UserService) {}
  // CREATE
  create(data: Omit<Post, "id">): Post {
    const post: Post = {
      id: this.nextId++,
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    };

    this.posts.push(post);
    return post;
  }

  // READ ALL
  findAll(): Post[] {
    return this.posts;
  }

  // READ ONE
  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  findAuthorByPostId(postId: number): User {
    const post = this.findOne(postId);
    const author = this.usersService.findOneUserById(post.authorId);

    if (!author) {
      throw new NotFoundException(`User with ID ${post.authorId} not found`);
    }

    return author;
  }

  // UPDATE PARTIALLY
  // update(id: number, data: Partial<Omit<Post, "id">>): Post {
  //   const post = this.findOne(id);

  //   Object.assign(post, data);
  //   return post;
  // }

  // // REPLACE ENTIRE RESOURCE
  // replace(id: number, data: Omit<Post, "id">): Post {
  //   const post = this.findOne(id);

  //   post.title = data.title;
  //   post.content = data.content;

  //   return post;
  // }
  update(id: number, data: Partial<Omit<Post, "id">>): Post {
    const post = this.findOne(id);

    if (data.authorId !== undefined) {
      const author = this.usersService.findOneUserById(data.authorId);

      if (!author) {
        throw new NotFoundException(`User with ID ${data.authorId} not found`);
      }
    }

    Object.assign(post, data);
    return post;
  }

  replace(id: number, data: Omit<Post, "id">): Post {
    const post = this.findOne(id);
    const author = this.usersService.findOneUserById(data.authorId);

    if (!author) {
      throw new NotFoundException(`User with ID ${data.authorId} not found`);
    }

    post.title = data.title;
    post.content = data.content;
    post.authorId = data.authorId;

    return post;
  }

  // DELETE
  remove(id: number): { message: string } {
    this.findOne(id);

    this.posts = this.posts.filter((p) => p.id !== id);

    return { message: `Post ${id} deleted successfully` };
  }
}
