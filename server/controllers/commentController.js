import { addComment } from "../services/comments/addComment";
import { getProfile } from "../services/profiles/getProfile"
import { errorResponse, successResponse } from "../utils/server-response";

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