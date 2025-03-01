const Plan = require("../models/plan.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { body, user } = req;
  const permittedParams = ["week", "predifined"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  body.user = user._id;

  console.log(user)
  // Predefined Plans
  if (user.role === "admin") {
    body.predefined = true;
  } else {
    body.predefined = false;
  }

  Plan.create(body)
    .then((plan) => res.status(201).json(plan))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Plan.findByIdAndDelete(id)
    .then((plan) => {
      if (!plan) next(createError(404, "Plan not found"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  Plan.find({ user: req.user.id })
    .then((plans) => {
      if (!plans || plans.length === 0) {
        return next(createError(404, "No plans found."));
      }
      res.json(plans);
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Plan.findById(id)
    .then((plan) => {
      if (!plan) next(createError(404, "Plan not found"));
      else res.json(plan);
    })
    .catch((error) => next(error));
};

// Get random plan (predifined plan)
module.exports.random = (req, res, next) => {
    console.log("Recibiendo solicitud para obtener plan aleatorio...");
  Plan.aggregate([{ $match: { predefined: true } }, { $sample: { size: 1 } }])
  
    .then((plan) => {
        console.log(plan + "encontrado")
      if (plan.length === 0) {
        next(createError(404, "No predefined plans found"));
      } else {
        console.log("no se encontro nada ")
        res.json(plan[0]);
      }
    })
    .catch((error) => {n
        console.log("Plan encontrado:", plan); 
        next(error)});
};
