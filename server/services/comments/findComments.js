import { Comment } from "../../models/Comment.js";

export const findComments = async (filterQuery, options = {}) => {
    const comments = await Comment.find(filterQuery, options)
    return comments;
};
