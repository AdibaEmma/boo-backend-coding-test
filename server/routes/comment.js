import { Router } from "express";
const router = Router();

import { returnCommentById, likeAComment } from "../controllers/commentController.js";
export const commentRoutes = () => {
    router.get('/:commentId', returnCommentById);

    router.post('/:commentId/like', likeAComment);
  return router;
};
