import { createUser } from "../services/users/createUser.js";
import { errorResponse, successResponse } from "../utils/server-response.js";

export const createUser = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    return successResponse(res, { newUser }, "User account created", 201)
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
