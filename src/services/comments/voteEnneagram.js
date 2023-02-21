import { Comment } from "../../models/Comment.js";

export const voteEnneagram = async (filter, enneagramInput, options = {}) => {
  const update = {
    $set: {
      "votes.enneagram": enneagramInput,
    },
  };
  const { acknowledged } = await Comment.updateOne(filter, update, options);
  return acknowledged;
};
