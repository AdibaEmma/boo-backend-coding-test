import { Comment } from "../../models/Comment"
export const addComment = async (commentInput) => {
    const newComment = await Comment.create(commentInput)
    return newComment
}