import { Comment } from "../../models/Comment.js"

export const addComment = async (profileId, text) => {
    const comment = new Comment({ profileId, text });
    await comment.save();
    return comment
}