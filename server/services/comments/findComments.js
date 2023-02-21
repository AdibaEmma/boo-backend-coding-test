import { Comment } from "../../models/Comment.js";

export const findComments = async (filterQuery, sortBy, options = {}) => {
    let key = sortBy
    const sortOptions = {}

    sortOptions[key] = 'desc'
    const comments = await Comment.find(filterQuery, options).sort(sortOptions)
    return comments;
};
