import { Profile } from "../../models/Profile.js";

export const addProfile = async (input) => {
  const newProfile = await Profile.create(input);
  return newProfile;
};
