import { createUser } from "../services/users/createUser.js";
import { getUser } from "../services/users/getUser.js";
import { errorResponse, successResponse } from "../utils/server-response.js";

export const createUserAccount = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    return successResponse(res, { newUser }, "User account created", 201)
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const returnUserById = async (req, res, next) => {
  try {
    const user = await getUser({_id: req.params.userId})
    if(!user) {
      return errorResponse(res, "User not found", 404)
    }

    return successResponse(res, { user }, "Returned user account")
  } catch (error) {
    return errorResponse(res, error.message)
  }
}
