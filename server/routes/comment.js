import { Router } from "express";
const router = Router();

import {
  returnCommentById,
  likeAComment,
  unlikeAComment,
  voteCommentMbti,
} from "../controllers/commentController.js";
export const commentRoutes = () => {
    router.get('/:commentId', returnCommentById);

    router.post('/:commentId/like', likeAComment);

    router.post('/:commentId/unlike', unlikeAComment);

    router.post('/:commentId/vote-mbti', voteCommentMbti);

  return router;
};
