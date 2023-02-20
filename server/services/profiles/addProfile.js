import { Profile } from "../../models/Profile.js";

export const addProfile = async (input) => {
  return await Profile.create(input);
};
