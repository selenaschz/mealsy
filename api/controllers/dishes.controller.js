const Dish = require("../models/dish.model");
const Review = require("../models/review.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { body } = req;
  const permittedParams = [
    "name",
    "description",
    "duration",
    "instructions",
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
  if (name) criterial.name = new RegExp(name, "i"); // Case-insensitive
  if (cuisine) criterial.cuisine = cuisine;
  if (tags) criterial.tags = { $in: tags.split(",") }; // Includes if the value matches any of the enum values.
  if (duration) criterial.duration = { $lte: Number(duration) }; // Duration less than or equal
  if (ingredients) {
    const ingredientsList = ingredients.split(","); // to array
    criterial["ingredients.ingredient"] = { $in: ingredientsList };
  }

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
  Review.create({
    text: req.body.text,
    rating: req.body.rating,
    user: req.body.user,
    dish: req.params.id,
  })
    .then((review) => res.status(201).json(review))
    .catch(next);
};


// List reviews
module.exports.listReviews = (req, res, next) => {
  const { dishId } = req.params;

  Review.find({ dish: dishId })
    .populate("user")
    .populate("dish")
    .then((reviews) => res.status(200).json(reviews))
    .catch(next);
};


// Update review
module.exports.updateReview = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = ["text", "rating"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Review.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((review) => {
      if (!review) next(this.createError(404, "Review not found"));
      else res.status(201).json(review);
    })
    .catch(next);
};


// Delete review
module.exports.deleteReview = (req, res, next) => {
  const { id } = req.params;
  Dish.findByIdAndDelete(id)
    .then((review) => {
      if (!review) next(createError(404, "Review not found"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};
