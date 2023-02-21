import { Comment } from "../../models/Comment.js"

export const addComment = async (userId, text) => {
    const comment = new Comment({ userId, text });
    await comment.save();
    return comment
}