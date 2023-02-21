import { Comment } from "../../models/Comment.js";

export const voteZodiac = async (filter, zodiacInput, options = {}) => {
  const update = {
    $set: {
      "votes.zodiac": zodiacInput,
    },
  };
  const { acknowledged } = await Comment.updateOne(filter, update, options);
  return acknowledged;
};
