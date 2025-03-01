const Ingredient = require("../models/ingredient.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { body } = req;
  Ingredient.create(body)
    .then((ingredient) => res.status(201).json(ingredient))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Ingredient.findByIdAndDelete(id)
    .then((ingredient) => {
      if (!ingredient) next(createError(404, "Ingredient not found"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    Ingredient.findById(req.params.id)
      .then((ingredient) => {
        if (!ingredient) return next(createError(404, "Ingredient not found"));
        res.json(ingredient);
      })
      .catch(next);
  };
  

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = ["name", "category", "calories", "unit"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Ingredient.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((ingredient) => {
      if (!ingredient) next(createError(404, "Ingredient not found"));
      else res.status(201).json(ingredient);
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  Ingredient.find()
    .then((ingredients) => res.json(ingredients))
    .catch((error) => next(error));
};
