import { Router } from "express";
const router = Router();

import { createUserAccount } from "../controllers/userController.js";
import {
  postComment,
  returnAllCommentsByUSer,
} from "../controllers/commentController.js";

import {
  createUserValidationRules,
  validateUser,
} from "../middlewares/validators/userValidator.js";

export const userRoutes = () => {
  router.post(
    "/",
    createUserValidationRules(),
    validateUser,
    createUserAccount
  );

  router.get("/:userId");

  router.post("/:userId/comments", postComment);

  router.get("/:userId/comments", returnAllCommentsByUSer);

  return router;
};
