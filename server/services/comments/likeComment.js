export const likeComment = async (comment, userId) => {
   const liked = comment.likes.includes(userId);

   if (!liked) {
     comment.likes.push(userId);
     await comment.save();
   }

   return comment.likes.length;
}