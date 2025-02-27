const Dish = require("../models/Dish.model");
const Review = require ("../models/review.model");

module.exports.create = (req, res, next) => {
  const { body } = req;
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
        //TODO
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

//-- Review--
// Create review
module.exports.createReview = (req, res, next) => {
  Review.create({
      text: req.body.text,
      rating: req.body.rating,
      user: req.body.user,
      dish: req.params.id
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
  })

  Review.findByIdAndUpdate(id, body, {runValidators: true, new: true})
  .then((review) => {
      if(!review) next(this.createError(404, "Review not found"));
      else res.status(201).json(review);
  })
  .catch(next)
}

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

