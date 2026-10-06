import express from "express";

import postRoutes from "./routes/post.routes.ts";
import { notFoundHandler } from "./middleware/notfound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

app.use(express.json());

app.use("/posts", postRoutes);

// Must come AFTER all routes
app.use(notFoundHandler);

// Must come LAST
app.use(errorHandler);

export default app;
