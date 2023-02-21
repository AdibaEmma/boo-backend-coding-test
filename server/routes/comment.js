import { Router } from "express";
const router = Router();

import { returnCommentById } from "../controllers/commentController.js";
export const commentRoutes = () => {
    router.get("/:commentId", returnCommentById);
  return router;
};
