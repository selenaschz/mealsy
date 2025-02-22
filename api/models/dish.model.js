const mongoose = require("mongoose");
const { isURL } = require("../validators/string.validators");

const disheschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [80, "Name must be less than 80 characters"],
    },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: [true, "Ingredient is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [20, "Description must be at least 20 characters"],
      maxLength: [300, "Description must be less than 300 characters"],
    },
    duration: {
      type: Number,
      min: [1, "Duration must be at least 1 minute"],
      max: [240, "Duration must be less than 240 minutes"], // 4h
    },
    instructions: {
      type: [String],
      trim: true,
      minLength: [50, "Instructions should have at least 50 characters"],
      maxLength: [1500, "Instructions should be less than 1500 characters"],
    },
    tags: {
      type: [String],
      lowercase: true,
      enum: [
        "vegetarian",
        "gluten-free",
        "vegan",
        "dairy-free",
        "high-protein",
        "cold",
        "breakfast",
        "lunch",
        "dinner",
        "sweet",
        "quick",
      ],
    },
    image: {
      type: String,
      trim: true,
      default:
        "https://i.pinimg.com/736x/e0/8d/e0/e08de0d85b3f0a4fe809aff8a8b3f3ea.jpg",
      validate: {
        validator: isURL,
        message: function () {
          return "Invalid poster URL";
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id;
        return ret;
      },
    },
  }
);

disheschema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "dish",
  justOne: false,
});

const dish = mongoose.model("dish", disheschema);
module.exports = dish;
