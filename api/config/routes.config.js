const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const dishes = require("../controllers/dishes.controller");
const users = require("../controllers/users.controller");
const plans = require("../controllers/plans.controller");
const mongoose = require("mongoose");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware");


//--ROUTES--
// Dishes
router.get("/dishes", auth.isAuthenticated, dishes.list);
router.post("/dishes", auth.isAuthenticated, auth.isAdmin, dishes.create);
router.get("/dishes/:id", auth.isAuthenticated, dishes.detail);
router.delete("/dishes/:id", auth.isAuthenticated, auth.isAdmin, dishes.delete);
router.patch("/dishes/:id", auth.isAuthenticated, auth.isAdmin, dishes.update);

// Users
router.post("/users", users.create);
router.patch("/users/", auth.isAuthenticated, users.update);
router.get("/users/:username", auth.isAuthenticated, users.profile);

// Sessions
router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy)

// Reviews
router.post("/dishes/:id/reviews", auth.isAuthenticated, dishes.createReview);
router.get("/dishes/:id/reviews", auth.isAuthenticated, dishes.listReviews);
router.delete("/dishes/:id/reviews/:reviewId", auth.isAuthenticated, dishes.deleteReview);
router.patch("/dishes/:id/reviews/:reviewId", auth.isAuthenticated, dishes.updateReview);

// Plans
router.get("/plans/random", auth.isAuthenticated, plans.random);
router.get("/plans", auth.isAuthenticated, plans.list);
router.post("/plans", auth.isAuthenticated, plans.create);
router.get("/plans/:id", auth.isAuthenticated, plans.detail);
router.delete("/plans/:id", auth.isAuthenticated, plans.delete);


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
