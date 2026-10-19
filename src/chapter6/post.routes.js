import { Router } from "express";
import { prisma } from "../chapter5/lib/prisma.ts";
import { authenticateToken, requireRole } from "./middleware/authenticate.js";

const router = Router();

router.delete(
  "/:id",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: req.params.id,
        },
      });

      return res.json({
        data: post,
        message: "Post deleted successfully",
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Post not found",
          },
        });
      }

      next(error);
    }
  },
);

export default router;
