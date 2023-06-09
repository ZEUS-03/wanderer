const express = require("express");
const placesController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesController.getPlacesByPid);

router.get("/users/:uid", placesController.getPlacesByUid);

router.post("/", placesController.createdPlaces);

module.exports = router;
