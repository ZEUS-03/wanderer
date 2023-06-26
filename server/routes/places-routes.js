const express = require("express");

const { check } = require("express-validator");

const placesController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesController.getPlacesByPid);

router.get("/users/:uid", placesController.getPlacesByUid);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createdPlaces
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
