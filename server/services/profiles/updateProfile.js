import { Profile } from "../../models/Profile.js";

export const updateProfile = async (query, updateDetails, options = {}) => {
    const { acknowledged } = await Profile.updateOne(query, updateDetails, options);
    return acknowledged
}