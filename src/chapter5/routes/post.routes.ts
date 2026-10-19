import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { prisma } from "../lib/prisma.ts";
import {
  CreatePostDto,
  UpdatePostDto,
  postIdSchema,
  paginationSchema,
  listPostsQuerySchema,
} from "../schemas/post.schema.ts";
import { z } from "zod";
import { validate } from "../middleware/validate.ts";

const router = Router();
// router.get(
//   "/",
//   validate(paginationSchema, "query"),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { page, limit } = req.validated.query as {
//         page: number;
//         limit: number;
//       };

//       const skip = (page - 1) * limit;

//       const [posts, total] = await Promise.all([
//         prisma.blogPost.findMany({
//           skip,
//           take: limit,
//           orderBy: {
//             createdAt: "desc",
//           },
//         }),

//         prisma.blogPost.count(),
//       ]);

//       const totalPages = Math.ceil(total / limit);

//       res.json({
//         data: posts,
//         total,
//         page,
//         limit,
//         totalPages,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

//task 5c
router.get(
  "/",
  validate(listPostsQuerySchema, "query"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, status, authorId, sortBy, order } = req.validated
        .query as z.infer<typeof listPostsQuerySchema>;

      const where: { status?: string; authorId?: number } = {};
      if (status) where.status = status;
      if (authorId !== undefined) where.authorId = authorId;

      const skip = (page - 1) * limit;

      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: { [sortBy]: order },
          skip,
          take: limit,
        }),
        prisma.blogPost.count({ where }),
      ]);

      res.json({
        data: posts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  validate(CreatePostDto, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await prisma.blogPost.create({
        data: req.body,
      });

      res.status(201).json({
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.put(
  "/:id",
  validate(postIdSchema, "params"),
  validate(UpdatePostDto, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        return res.status(400).json({
          error: "Invalid post ID",
        });
      }
      const post = await prisma.blogPost.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });

      res.json({
        data: post,
      });
    } catch (error: any) {
      next(error);
    }
  },
);
// app.put(
//   "/posts/:id",
//   authenticateToken,
//   async (req, res, next) => {
//     try {
//       const post = await prisma.post.findUnique({
//         where: { id: req.params.id },
//         select: {
//           id: true,
//           authorId: true
//         }
//       });

//       if (!post) {
//         return res.status(404).json({
//           error: {
//             code: "NOT_FOUND",
//             message: "Post not found"
//           }
//         });
//       }

//       const isOwner = post.authorId === req.user.id;
//       const isAdmin = req.user.role === "ADMIN";

//       if (!isOwner && !isAdmin) {
//         return res.status(403).json({
//           error: {
//             code: "FORBIDDEN",
//             message: "You cannot edit this post"
//           }
//         });
//       }

//       const updatedPost = await prisma.post.update({
//         where: { id: post.id },
//         data: {
//           title: req.body.title,
//           content: req.body.content
//         }
//       });

//       res.json(updatedPost);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;
