const uuid = require("uuid");
const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");

let USERS = [
  {
    id: "u1",
    Name: "Dushyant",
    email: "test@test.com",
    password: "tester",
  },
];

const allUsers = (req, res, err) => {
  res.status(200).json({ users: USERS });
};

const signup = (req, res, err) => {
  const { name, email, password } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data!", 422);
  }

  const userExists = USERS.find((u) => u.email === email);

  if (userExists) {
    throw new HttpError("User already registered. Login Instead?", 422);
  }

  const createdUser = {
    id: uuid.v1(),
    name,
    email,
    password,
  };
  USERS.push(createdUser);
  res.status(200).json({ user: createdUser });
};

const login = (req, res, err) => {
  const { email, password } = req.body;
  const isRegisteredUser = USERS.find((u) => email === u.email);

  if (!isRegisteredUser || password !== isRegisteredUser.password) {
    throw new HttpError(
      "Credentials not matched! could not identify the users.",
      401
    );
  }

  res.json({ message: "logged in" });
};

exports.allUsers = allUsers;
exports.signup = signup;
exports.login = login;
