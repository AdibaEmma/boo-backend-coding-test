import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/userController.js";
export const userRoutes = () => {
  router.post("/", createUser);

  router.get("/:userId", );

  router.post("/:userId/comments", postComment);

  router.get("/:userId/comments", returnAllCommentsByUSer);

  return router;
};
