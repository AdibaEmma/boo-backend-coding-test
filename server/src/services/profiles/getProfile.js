import { Profile } from "../../models/Profile.js";

export const getProfile = async (query, options = {}) => {
    const foundProfile = await Profile.findOne(query, options)
    return foundProfile;
}
