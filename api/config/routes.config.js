const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const dishes = require("../controllers/dish.controller");
const users = require("../controllers/users.controller");
const ingredients = require("../controllers/ingredients.controller");
const plans = require("../controllers/plans.controller");

//--ROUTES--
// Dishes
router.get("/dishes", auth.isAuthenticated, dishes.list);
router.post("/dishes", auth.isAuthenticated, auth.isAdmin, dishes.create);
router.get("/dishes/:id", dishes.detail);
router.delete("/dishes/:id", auth.isAuthenticated, auth.isAdmin, dishes.delete);
router.patch("/dishes/:id", auth.isAuthenticated, auth.isAdmin, dishes.update);

// Users
router.post("/users", users.create);
router.patch("/users/:username", auth.isAuthenticated, users.update);
router.get("/users/:username", users.profile);

// Reviews
router.post("/dishes/:id/reviews", auth.isAuthenticated, dishes.createReview);
router.get("/dishes/:id/reviews", auth.isAuthenticated, dishes.listReviews);
router.delete("/dishes/:id/reviews/:reviewId", auth.isAuthenticated, dishes.deleteReview);
router.patch("/dishes/:id/reviews/:reviewId", auth.isAuthenticated, dishes.updateReview);



//--Errors--
router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});


router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
