const mongoose = require("mongoose");
const { isURL } = require("../validators/string.validators");

//--Bcrypt--
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

//--Patterns--:
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const NAME_PATTERN = /^[a-zA-Z\s]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [30, "First name cannot exceed 30 characters"],
      trim: true,
      match: [NAME_PATTERN, "Invalid first name pattern"],
    },
    lastName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [60, "Last name cannot exceed 60 characters"],
      trim: true,
      match: [NAME_PATTERN, "Invalid last name pattern"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "User email is required"],
      match: [EMAIL_PATTERN, "Invalid user email pattern"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [20, "Username characters cannot exceed 20 characters"],
      trim: true,
      match: [USERNAME_PATTERN, "Username can only contain letters, numbers, and underscores, with no spaces",
      ],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      match: [PASSWORD_PATTERN, "Invalid user password pattern"],
    },
    role: {
      type: String,
      enum: ["admin", "guess"],
      default: "guess",
    },
    avatar: {
      type: String,
      default: function () {
        return `https://i.pravatar.cc/350?u=${this.email}`;
      },
      validate: {
        validator: isURL,
        message: function () {
          return "Invalid avatar URL";
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;

        ret.id = doc.id;
        return ret;
      },
    },
  }
);

//-- Pre save  --
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

// Chech user password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
