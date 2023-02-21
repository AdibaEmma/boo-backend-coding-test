export const unlikeComment = async (comment, userId) => {
  // check if the user has already liked the comment
  const index = comment.likes.indexOf(userId);

  if (index !== -1) {
    // remove the user from the list of likes
    comment.likes.splice(index, 1);

    await comment.save();
  }

  return comment.likes.length;
};
