import { User } from "../../models/User.js";

export const createUser = async (userDetails) => {
  const newUser = await User.create(userDetails);
  return newUser;
};
