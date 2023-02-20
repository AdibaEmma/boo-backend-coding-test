import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export const Comment = model("Comment", commentSchema);
