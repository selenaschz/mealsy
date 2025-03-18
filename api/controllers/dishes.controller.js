const Dish = require("../models/dish.model");
const Review = require("../models/review.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { body } = req;
  const permittedParams = [
    "name",
    "description",
    "duration",
    "cuisine",
    "instructions",
    "ingredients",
    "calories",
    "tags",
    "image",
  ];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Dish.create(body)
    .then((dish) => res.status(201).json(dish))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Dish.findByIdAndDelete(id)
    .then((dish) => {
      if (!dish) next(createError(404, "Dish not found"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = [
    "name",
    "description",
    "duration",
    "ingredients",
    "calories",
    "instructions",
    "tags",
    "image",
  ];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Dish.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((dish) => {
      if (!dish) next(createError(404, "Dish not found"));
      else res.status(201).json(dish);
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  // Query params:
  const {
    limit = 20,
    page = 0,
    sort = "name",
    name,
    cuisine,
    tags,
    ingredients,
    caloriesMin,
    caloriesMax,
    duration,
  } = req.query;

  // Limit:
  if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { limit: "Must be >= 0" },
      })
    );
  }
  // Page:
  if (Number.isNaN(Number(page)) || Number(page) < 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { page: "Must be >= 0" },
      })
    );
  }

  const criterial = {};
  // if (name) criterial.name = new RegExp(name, "i"); // Case-insensitive
  // if (cuisine) criterial.cuisine = { $in: req.query.cuisine.split(",") };
  // if (tags) criterial.tags = { $in: tags.split(",") }; // Includes if the value matches any of the enum values.
  // if (ingredients) {
  //   const ingredientsList = ingredients.split(","); // to array
  //   criterial["ingredients.ingredient"] = { $in: ingredientsList };
  // }

  // if (duration) {
  //   const [minDuration, maxDuration] = duration.split(",").map(Number);
  
  //   if (!Number.isNaN(minDuration) && !Number.isNaN(maxDuration)) {
  //     criterial.duration = { $gte: minDuration, $lte: maxDuration };
  //   } else {
  //     return next(
  //       createError(400, {
  //         message: "Invalid query parameter",
  //         errors: { duration: "Must be a valid range (e.g., 0,600)" },
  //       })
  //     );
  //   }
  // }
  
  // if (caloriesMin || caloriesMax) {
  //   criterial.calories = {};
  //   if (caloriesMin) criterial.calories.$gte = Number(caloriesMin); 
  //   if (caloriesMax) criterial.calories.$lte = Number(caloriesMax);
  // }

  // Find dishes filtering by criterials
  Dish.find(criterial)
    .sort({ [sort]: "asc" })
    .limit(Number(limit))
    .skip(Number(limit) * page)
    .populate("reviews") // Dish virtual reviews field
    .then((dishes) => res.json(dishes))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Dish.findById(id)
    .then((dish) => {
      if (!dish) next(createError(404, "Dish not found"));
      else res.json(dish);
    })
    .catch((error) => next(error));
};

//-- Review--
// Create review
module.exports.createReview = (req, res, next) => {
  const { text, rating } = req.body;
  const user = req.user.id;
  const dish = req.params.id;

   // Check if the user has write a comment
   Review.findOne({ where: { user, dish } })
      .then(existingReview => {
        if (existingReview) return res.status(400).json({ message: "You have already written a review for this dish." });
      })
     
  Review.create({
    text,
    rating,
    user,
    dish,
  })
    .then((review) => res.status(201).json(review))
    .catch(next);
};

// List reviews
module.exports.listReviews = (req, res, next) => {
  const { id } = req.params;

  Review.find({ dish: id })
    .populate("user")
    .then((reviews) => {
      // Total reviews
      const total = reviews.length;
      // Average Rating:
      const average =
        total > 0
          ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
          : 0;
      res.status(200).json({ reviews, average, total })
    })
    .catch(next);
};

// Update review
module.exports.updateReview = (req, res, next) => {
  const { reviewId } = req.params;
  const { body } = req;

  const permittedParams = ["text", "rating"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Review.findByIdAndUpdate(reviewId, body, { runValidators: true, new: true })
    .then((review) => {
      console.log(review)
      if (!review) return next(createError(404, "Review not found"));
      else res.status(201).json(review);
    })
    .catch(next);
};

module.exports.deleteReview = (req, res, next) => {
  const { reviewId } = req.params;

  Review.findByIdAndDelete(reviewId)
    .then((review) => {
      if (!review) {
        return next(createError(404, "Review not found"));
      }
      res.status(204).send();
    })
    .catch(next);
};
