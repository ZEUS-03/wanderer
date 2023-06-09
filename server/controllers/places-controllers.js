const HttpError = require("../models/http-errors");

const PLACES = [
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
  const place = PLACES.find((p) => {
    return p.creator === uid;
  });
  if (!place) {
    throw new HttpError(
      "Path is not valid... Please enter a valid pathname.",
      404
    );
  }
  res.json({ place });
};

const createPlaces = (req, res, next) => {
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

exports.getPlacesByPid = getPlacesByPid; // Passing pointer of functions instead of functions
exports.getPlacesByUid = getPlacesByUid;
exports.createdPlaces = createPlaces;
