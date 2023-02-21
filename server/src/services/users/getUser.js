import { User } from "../../models/User.js";

export const getUser = async (filterQuery, options= {}) => {
    const user = await User.findOne(filterQuery, options)
    return user;
}