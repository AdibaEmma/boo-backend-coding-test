const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Profile", profileSchema);