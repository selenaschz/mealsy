const createError = require("http-errors");
const User = require("../models/user.model");
const mongoose = require("mongoose");


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
          username: req.body.username,
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
  const { username } = req.params; 

  User.findOne({ username })  
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found"));
      }

      const permittedBody = {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req.body?.email,
        password: req.body?.password,
        avatar: req.file?.path,
      };

      Object.keys(permittedBody).forEach((key) => {
        if (permittedBody[key] === undefined) {
          delete permittedBody[key];
        }
      });

      Object.assign(user, permittedBody);

      return user.save();
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);
};


module.exports.profile = (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found"));
      }
      res.json(user);
    })
    .catch(next);
};
