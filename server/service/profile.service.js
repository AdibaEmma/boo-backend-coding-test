import { Profile } from "../models/Profile.js";

export const saveProfile = async (input) => {
    return await Profile.create(input);
}

