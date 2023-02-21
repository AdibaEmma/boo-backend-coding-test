import { Comment } from "../../models/Comment.js"

export const voteMbti = async (filter, mbtiInput, options = {}) => {
    const update = {
  $set: {
    "votes.mbti": mbtiInput,
  }
};
    const { acknowledged } = await Comment.updateOne(filter, update, options);
    return acknowledged;
}