import { z } from "zod";

export const postFields = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),

  content: z.string().min(1, "Content is required"),
  //task 5e
  status: z.string().min(1, "Status cannot be empty"),
  authorId: z.coerce
    .number()
    .int()
    .positive("authorId must be a positive number"),
});

//export const updatePostSchema = postFields.partial();

//task 5e

export const CreatePostDto = postFields.extend({
  status: postFields.shape.status.default("draft"),
});

export const UpdatePostDto = postFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const postIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

//task 5c
export const SORTABLE_FIELDS = ["createdAt", "updatedAt", "title"];

export const listPostsQuerySchema = paginationSchema.extend({
  status: z.string().optional(),
  authorId: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(SORTABLE_FIELDS).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
export type CreatePostInput = z.infer<typeof CreatePostDto>;
export type UpdatePostInput = z.infer<typeof UpdatePostDto>;
