const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const dishes = require("../controllers/dishes.controller");
const users = require("../controllers/users.controller");
const ingredients = require("../controllers/ingredients.controller");
const plans = require("../controllers/plans.controller");
const mongoose = require("mongoose");


//--ROUTES--
// Dishes
router.get("/dishes", dishes.list);
router.post("/dishes", dishes.create);
router.get("/dishes/:id", dishes.detail);
router.delete("/dishes/:id", dishes.delete);
router.patch("/dishes/:id", dishes.update);

// Users
router.post("/users", users.create);
router.patch("/users/:username", users.update);
router.get("/users/:username", users.profile);

// Reviews
router.post("/dishes/:id/reviews", dishes.createReview);
router.get("/dishes/:id/reviews", dishes.listReviews);
router.delete("/dishes/:id/reviews/:reviewId", dishes.deleteReview);
router.patch("/dishes/:id/reviews/:reviewId", dishes.updateReview);

// Ingredients
router.get("/ingredients", ingredients.list);         
router.post("/ingredients", ingredients.create);      
router.get("/ingredients/:id", ingredients.detail);   
router.patch("/ingredients/:id", ingredients.update); 
router.delete("/ingredients/:id", ingredients.delete);




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
