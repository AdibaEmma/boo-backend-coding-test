import { Router } from "express";
const router = Router();

import { createUserAccount, returnUserById } from "../controllers/userController.js";
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

  router.get("/:userId", returnUserById);

  router.post("/:userId/comments", postComment);

  router.get("/:userId/comments", returnAllCommentsByUSer);

  return router;
};
