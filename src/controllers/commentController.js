import { ObjectId } from "mongodb";
import { addComment } from "../services/comments/addComment.js";
import { findComments } from "../services/comments/findComments.js";
import { getComment } from "../services/comments/getComment.js";
import { likeComment } from "../services/comments/likeComment.js";
import { unlikeComment } from "../services/comments/unlikeComment.js";
import { voteEnneagram } from "../services/comments/voteEnneagram.js";
import { voteMbti } from "../services/comments/voteMbti.js";
import { voteZodiac } from "../services/comments/voteZodiac.js";
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

export const unlikeAComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { userId } = req.body;
    try {
      const comment = await getComment({ _id: commentId });
      if (!comment) {
        return errorResponse(res, "Comment not found", 404);
      }

      const user = await getUser({ _id: userId });
      if (!user) {
        return errorResponse(res, "User not found", 404);
      }

      const likesCount = await unlikeComment(comment, user._id);
      return successResponse(res, { likesCount }, "Comment unliked", 200);
    } catch (error) {
      return errorResponse(res, error.message);
    }
}

export const voteCommentMbti = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { commentMbti } = req.body;
    try {
        const comment = await getComment({ _id: commentId });
      if (!comment) {
        return errorResponse(res, "Comment not found", 404);
      }

      const mbtiVoteCasted = await voteMbti({ _id: commentId }, commentMbti)
      if(!mbtiVoteCasted) {
        return errorResponse(res, "Could not cast vote")
      }

      return successResponse(res, { }, "Comment mbti vote updated")
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const voteCommentEnneagram = async (req, res, next) => {
  const commentId = req.params.commentId;
  const { commentEnneagram } = req.body;
  try {
    const comment = await getComment({ _id: commentId });
    if (!comment) {
      return errorResponse(res, "Comment not found", 404);
    }

    const enneagramVoteCasted = await voteEnneagram(
      { _id: commentId },
      commentEnneagram
    );
    if (!enneagramVoteCasted) {
      return errorResponse(res, "Could not cast vote");
    }

    return successResponse(res, {}, "Comment enneagram vote updated");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const voteCommentZodiac = async (req, res, next) => {
  const commentId = req.params.commentId;
  const { commentZodiac } = req.body;
  try {
    const comment = await getComment({ _id: commentId });
    if (!comment) {
      return errorResponse(res, "Comment not found", 404);
    }

    const zodiacVoteCasted = await voteZodiac(
      { _id: commentId },
      commentZodiac
    );

    if (!zodiacVoteCasted) {
      return errorResponse(res, "Could not cast vote");
    }

    return successResponse(res, {}, "Comment zodiac vote updated");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
