import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    avatar: {
      type: String,
      required: false,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
    },
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8, select: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
