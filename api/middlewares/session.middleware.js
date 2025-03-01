const createError = require("http-errors");
const User = require("../models/user.model");
const Review = require("../models/review.model")

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    req.user = undefined;
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => next(error));
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401, "Unauthorized, missing credentials"));
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next(createError(403, "Forbidden, insufficient access level"));
  }
};


module.exports.isReviewCreator = (req, res, next) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .then((review) => {
      if (!review) {
        return next(createError(404, "Review not found"));
      }

      if (review.user.toString() !== req.user.id) {
        return next(createError(403, "You are not the owner of this review"));
      }

      next(); 
    })
    .catch((error) => next(error));
};

