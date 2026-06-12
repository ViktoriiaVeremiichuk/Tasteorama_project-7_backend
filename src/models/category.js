import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {

    timestamps: true, 
  }
);

export const Category = model("Category", categorySchema);