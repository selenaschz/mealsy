const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const dishes = require("../controllers/dish.controller");
const users = require("../controllers/users.controller");
const ingredients = require("../controllers/ingredients.controller");
const plans = require("../controllers/plans.controller");

//--ROUTES--
// Dishes
router.get("/dishes", dishes.list);
router.post("/dishes", dishes.create);
router.get("/dishes/:id", dishes.detail);
router.delete("/dishes/:id", dishes.delete);
router.patch("/dishes/:id", dishes.update);

// Users
router.post("/users", users.create);

//--Errors--
router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  res.status(error.status).json(data);
});

module.exports = router;
