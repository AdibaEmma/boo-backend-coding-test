import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    otherNames: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    birthdate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.virtual("fullName").get(function (this) {
  return `${
    this.firstName
  } ${this.otherNames ? this.otherNames : ""} ${this.lastName}`;
});

userSchema.virtual("age").get(function (this) {
  return Math.floor(
    (Date.now() - this.birthdate.getTime()) / (1000 * 3600 * 24 * 365)
  );
});

export const User = model(`User`, userSchema);
