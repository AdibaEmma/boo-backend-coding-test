import { ObjectId } from "mongodb";
import { addComment } from "../services/comments/addComment.js";
import { findComments } from "../services/comments/findComments.js";
import { getComment } from "../services/comments/getComment.js";
import { likeComment } from "../services/comments/likeComment.js";
import { getUser } from "../services/users/getUser.js";
import { errorResponse, successResponse } from "../utils/server-response.js";

export const postComment = async (req, res, next) => {
    const userId = req.params.userId;
    const { text } = req.body
    try {
        const user = await getUser({ _id: userId });
        if(!user) {
            return errorResponse(res, "User not found", 404)
        }
        const newComment = await addComment(user._id, text)

        return successResponse(res, { newComment }, "New comment added", 201)

    } catch (error) {
        return errorResponse(res, error.message)
    }
}

export const returnAllCommentsByUSer = async (req, res, next) => {
    const profileId = req.params.profileId
    const { sortBy } = req.query
    try {
        const filteredComments = await findComments(
          { profileId },
          sortBy
        );

        return successResponse(res, { filteredComments }, "Return filtered comments", 200)
    } catch (error) {
        return errorResponse(res, error.message)
    }
}

export const returnCommentById = async (req, res, next) => {
    const commentId = req.params.commentId
    try {
        const comment = await getComment({ _id: commentId })
        if(!comment) {
            return errorResponse(res, "Comment not found", 404)
        }

        return successResponse(res, { comment }, "Returned comment", 200)
    } catch (error) {
        return errorResponse(res, error.message)
    }
}

export const likeAComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { userId } = req.body
    try {
        const comment = await getComment({ _id: commentId });
        if (!comment) {
          return errorResponse(res, "Comment not found", 404);
        }

        const user = await getUser({ _id: userId })
        if(!user) {
            return errorResponse(res, "User not found", 404)
        }

        const likesCount = await likeComment(comment, user._id)
        return successResponse(res, { likesCount }, "Comment liked", 200)
    } catch (error) {
        return errorResponse(res, error.message)
    }
}