const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        text: {
            type: String,
            trim: true,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        dish: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        }
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

const Review = mongoose.model("Review", schema);

module.exports = Review;