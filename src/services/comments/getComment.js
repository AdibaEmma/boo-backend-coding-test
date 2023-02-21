import { Comment } from "../../models/Comment.js"

export const getComment = async (filterQuery, options = {}) => {
    const foundComment = await Comment.findOne(filterQuery, options);
    return foundComment;
}