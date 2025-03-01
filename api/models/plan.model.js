const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    week: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },
        breakfast: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
        },
        lunch: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
        },
        dinner: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
        },
      },
    ],
    predefined: Boolean,
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

// Validate that no day of the week is duplicated
planSchema.pre("validate", function (next) {
  const days = this.week.map((menu) => menu.day);
  const uniqueDays = new Set(days); // No duplicated

  if (uniqueDays.size !== days.length) {
    return next(new Error("Duplicate days in the week"));
  }

  next();
});

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
