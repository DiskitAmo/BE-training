// posts/dto/update-post.dto.ts
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto.js";

// All fields optional; authorId can't be changed after creation
export class UpdatePostDto extends PartialType(
  CreatePostDto,
  //["authorId"] as const
) {}
