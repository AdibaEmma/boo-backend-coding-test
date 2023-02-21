import { ObjectId } from "mongodb";
import { addComment } from "../services/comments/addComment.js";
import { findComments } from "../services/comments/findComments.js";
import { getComment } from "../services/comments/getComment.js";
import { getProfile } from "../services/profiles/getProfile.js"
import { errorResponse, successResponse } from "../utils/server-response.js";

export const postComment = async (req, res, next) => {
    const profileId = req.params.profileId
    const { text } = req.body
    try {
        const profile = await getProfile({ _id: profileId });
        if(!profile) {
            return errorResponse(res, "Profile not found", 404)
        }
        const newComment = await addComment(profile._id, text)

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