const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 255,
      required: true,
    },
    phone: {
      type: String,
      minlength: 9,
      required: true,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 255,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 1024,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    reset_token: {
      type: String,
      default: null,
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string()
      .min(9)
      .regex(/^0[2-9][ -]?\d{7}$|^0[2-9]\d[ -]?\d{7}$/)
      .required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .required(),
    confirm_password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
