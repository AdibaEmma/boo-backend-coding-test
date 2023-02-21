import { User } from "../../models/User";

export const getUser = async (filterQuery, options= {}) => {
    const user = await User.findOne(filterQuery, options)
    return user;
}