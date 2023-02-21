import { Router } from "express";
const router = Router();

import {
  returnCommentById,
  likeAComment,
  unlikeAComment,
  voteCommentMbti,
  voteCommentEnneagram,
  voteCommentZodiac,
} from "../controllers/commentController.js";
export const commentRoutes = () => {
    router.get('/:commentId', returnCommentById);

    router.post('/:commentId/like', likeAComment);

    router.post('/:commentId/unlike', unlikeAComment);

    router.post('/:commentId/vote-mbti', voteCommentMbti);

    router.post("/:commentId/vote-enneagram", voteCommentEnneagram);

    router.post("/:commentId/vote-zodiac", voteCommentZodiac);
  return router;
};
