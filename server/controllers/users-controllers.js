const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");

const User = require("../models/users");

const allUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Unable to get Users this time! Please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data!",
      422
    );
    return next(error);
  }
  let doesUserExists;
  try {
    doesUserExists = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Problem signing you up! Please try again later.",
      422
    );
    return next(error);
  }

  if (doesUserExists) {
    const error = new HttpError("User already registered. Login Instead?", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: "www.someimage.com",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Unable to signup at the moment. Please try later!",
      500
    );
    return next(error);
  }
  res.status(200).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let registeredUser;
  try {
    registeredUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("invalid email or password!", 422);
    return next(error);
  }

  if (!registeredUser || registeredUser.password !== password) {
    const error = new HttpError(
      "Credentials not matched! could not identify the users.",
      401
    );
    return next(error);
  }

  res.json({ message: "logged in" });
};

exports.allUsers = allUsers;
exports.signup = signup;
exports.login = login;
