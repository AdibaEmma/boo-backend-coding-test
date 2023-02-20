import mongoose from "mongoose";
const { Schema, model } = mongoose

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mbti: {
    type: String
  },
  enneagram: {
    type: String
  },
  variant: {
    type: String
  },
  tritype: {
    type: Number
  },
  socionics: {
    type: String
  },
  sloan: {
    type: String
  },
  psyche: {
    type: String
  },
  image: {
    type: String,
    default: "https://soulverse.boo.world/images/1.png",
  },
});

export const Profile = model("Profile", profileSchema);