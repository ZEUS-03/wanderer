const HttpError = require("../models/http-errors");
const getCoordsForAddr = require("../utils/location");
const Place = require("../models/Place");
const User = require("../models/users");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const getPlacesByPid = async (req, res, next) => {
  const pid = req.params.pid;
  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong! can not find a place!",
      500
    );
    return next(err);
  }
  if (!place) {
    const error = new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );
    return next(error);
    // const err = new Error("Path is invalid!");
    // err.code = 404;
    // return next(err);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUid = async (req, res, next) => {
  const uid = req.params.uid;
  let placesByUid;
  try {
    placesByUid = await User.findById(uid).populate("places");
  } catch (err) {
    const error = new HttpError("Failed to get any place.", 500);
    return next(error);
  }
  if (!placesByUid || placesByUid.places.length === 0) {
    const error = new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );
    return next(error);
  }
  res.json({
    places: placesByUid.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlaces = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data!", 404));
  }

  const { title, description, imageUrl, address, coordinate, creator } =
    req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddr(address);
  } catch (error) {
    return next(error);
  }

  const createdPlaces = new Place({
    title,
    description,
    image: "https://media.timeout.com/images/101705309/image.jpg",
    location: coordinates,
    address,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating Place failed! Please try again later.",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError("User does not exist with the given id!", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlaces.save({ session: sess });
    user.places.push(createdPlaces);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlaces });
};

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeid = req.params.pid;
  let place;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data!",
      422
    );
    return next(error);
  }

  try {
    place = await Place.findById(placeid);
  } catch (err) {
    const error = new HttpError(
      "Can't update the existing field! Try again later.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Can't update place!",
      500
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeid = req.params.pid;
  console.log(placeid);
  let place;
  try {
    console.log("Before findById");
    place = await Place.findById(placeid).populate("creator"); // used to get the document of user having same id.
    console.log("after findById");
  } catch (err) {
    const error = new HttpError(
      "Unknown error occured! Could not delete Place.",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not delete the project! Please try again.",
      404
    );
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Can't delete the Place. Please try later!",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "item Deleted" });
};

exports.getPlacesByPid = getPlacesByPid; // Passing pointer of functions instead of functions
exports.getPlacesByUid = getPlacesByUid;
exports.createdPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
