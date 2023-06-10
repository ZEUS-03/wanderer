const express = require("express");
const placesController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesController.getPlacesByPid);

router.get("/users/:uid", placesController.getPlacesByUid);

router.post("/", placesController.createdPlaces);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
