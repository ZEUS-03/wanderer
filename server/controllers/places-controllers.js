const HttpError = require("../models/http-errors");

const { validationResult } = require("express-validator");

let PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th st, New York, NY 100011",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th st, New York, NY 100011",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const getPlacesByPid = (req, res, next) => {
  const pid = req.params.pid;
  const place = PLACES.find((p) => {
    return p.id === pid;
  });
  if (!place) {
    throw new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );

    // const err = new Error("Path is invalid!");
    // err.code = 404;
    // return next(err);
  }
  res.json({ place });
};

const getPlacesByUid = (req, res, next) => {
  const uid = req.params.uid;
  const places = PLACES.filter((p) => {
    return p.creator === uid;
  });
  if (!places || places.length === 0) {
    throw new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );
  }
  res.json({ places });
};

const createPlaces = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data!", 422);
  }

  const { title, description, imageUrl, address, coordinates, creator } =
    req.body;
  const createdPlaces = {
    title,
    description,
    imageUrl,
    location: coordinates,
    address,
    creator,
  };
  PLACES.push(createdPlaces);
  res.status(201).json({ place: createdPlaces });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeid = req.params.pid;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data!", 422);
  }

  const updatedPlace = { ...PLACES.find((p) => p.id === placeid) }; // not directly updating the PLACE as if any error occured it may cause the unnecessary modification.
  const placeIndex = PLACES.findIndex((p) => p.id === placeid);

  updatedPlace.title = title;
  updatedPlace.description = description;
  // once the update is finishied then only it's preferred to update the PLACES variable.
  PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
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
