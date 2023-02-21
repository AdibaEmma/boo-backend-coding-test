export const likeComment = async (comment, userId) => {
  // check if the user has already liked the comment
  const liked = comment.likes.includes(userId);

  if (!liked) {
    comment.likes.push(userId);
    await comment.save();
  }

  return comment.likes.length;
}