const HttpError = require("../models/http-errors");
const getCoordsForAddr = require("../utils/location");
const Place = require("../models/Place");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

let PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th st, New York, NY 100011",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th st, New York, NY 100011",
    creator: "u2",
  },
];

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
  let places;
  try {
    places = await Place.find({ creator: uid });
  } catch (err) {
    const error = new HttpError("Failed to get any place.", 500);
    return next(error);
  }
  if (!places || places.length === 0) {
    const error = new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
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
  try {
    await createdPlaces.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Can't add new place.", 404);
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

const deletePlace = (req, res, next) => {
  const placeid = req.params.pid;
  PLACES = PLACES.filter((p) => p.id !== placeid);
  res.status(200).json({ message: "item Deleted" });
};

exports.getPlacesByPid = getPlacesByPid; // Passing pointer of functions instead of functions
exports.getPlacesByUid = getPlacesByUid;
exports.createdPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
