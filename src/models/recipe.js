import { Schema, model } from "mongoose";

const recipeIngridientSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },

    measure: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    area: { type: String },
    instructions: { type: String, required: true },
    description: { type: String },
    thumb: { type: String },
    time: {
      type: Number,
      required: true,
    },
    calories: { type: Number, default: 0 },
    ingredients: [recipeIngridientSchema],
  },
  {
    timestamps: true,
  },
);

export const Recipe = model("Recipe", recipeSchema);
