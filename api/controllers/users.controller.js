const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "This email is already registered",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.name,
          avatar: req.file?.path,
        }).then((user) => {
          res.status(201).json(user);
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    avatar: req.file?.path,
  };

  // Remove -> Undefined Keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // Merge -> Body into req.user
  Object.assign(req.user, permittedBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  const { email } = req.params;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found"));
      }
      res.json(user);
    })
    .catch(next);
};
