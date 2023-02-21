import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId }],
    votes: {
      mbti: {
        type: String
      },
      enneagram: {
        type: String
      },
      zodiac: {
        type: String
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Comment = model("Comment", commentSchema);
