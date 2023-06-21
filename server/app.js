const express = require("express");

const bodyParser = require("body-parser");

const HttpError = require("./models/http-errors");

const app = express();

const placesRouter = require("./routes/places-routes");

const usersRouter = require("./routes/users-routes");

app.use(bodyParser.json());

app.use("/api/places", placesRouter);

app.use("/api/users", usersRouter);

// Any path other than the above will then leads to run the below middleware.
// The below middleware will only gets executed when any response is not sent.

app.use((req, res, next) => {
  throw new HttpError("Path is not defined!", 404);
});

app.listen(3000);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code);
  res.json(err.message || { message: "An unknown error occured!" });
});
