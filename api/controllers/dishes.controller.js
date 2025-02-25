const Dish = require("../models/Dish.model");

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
