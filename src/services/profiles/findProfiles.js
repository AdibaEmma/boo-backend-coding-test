import { Profile } from "../../models/Profile.js";

export const findProfiles = async (query = {}, options = {}) => {
  const foundProfile = await Profile.find(query, options);
  return foundProfile;
};
