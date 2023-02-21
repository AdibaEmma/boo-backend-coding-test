import { Comment } from "../../models/Comment"
import { Profile } from "../../models/Profile"

export const addComment = async (profileId, commentInput) => {
    const comment = new Comment({ profileId, commentInput });
    await comment.save();
    return comment
}