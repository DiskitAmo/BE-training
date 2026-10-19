import prisma from "../lib/prisma.js";

export async function requirePostAuthorOrAdmin(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Post not found",
        },
      });
    }

    const isAdmin = req.user.role === "ADMIN";
    const isAuthor = post.authorId === req.user.id;

    if (!isAdmin && !isAuthor) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You can only update your own posts",
        },
      });
    }

    // Make the post available to the next handler if useful.
    req.post = post;
    next();
  } catch (error) {
    next(error);
  }
}
