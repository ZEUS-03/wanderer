const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const placesRouter = require("./routes/places-routes");

app.use(bodyParser.json());

app.use("/api/places", placesRouter);

app.listen(3000);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code);
  res.json(err.message || { message: "An unknown error occured!" });
});
