const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["g", "kg", "ml", "l", "tsp", "tbsp", "cup"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id; 
        return ret;
      },
    },
  }
);

const ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;
