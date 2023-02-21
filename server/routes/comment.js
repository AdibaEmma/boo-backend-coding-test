import { Router } from "express";
const router = Router();

import { returnCommentById, likeAComment, unlikeAComment } from "../controllers/commentController.js";
export const commentRoutes = () => {
    router.get('/:commentId', returnCommentById);

    router.post('/:commentId/like', likeAComment);

    router.post('/:commentId/unlike', unlikeAComment)
  return router;
};
