import { User } from "../../models/User";

export const createAuthor = async (userDetails) => {
  const newUser = await User.create(userDetails);
  return newUser;
};
