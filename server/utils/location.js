const axios = require("axios");
const HttpError = require("../models/http-errors");
const constants = require("./config");

async function getCoordsForAddr(address) {
  const options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/search",
    params: {
      q: address,
      "accept-language": "en",
      polygon_threshold: "0.0",
    },
    headers: {
      "X-RapidAPI-Key": constants.rapid_api,
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  const data = response.data;

  if (data === {}) {
    throw new HttpError("Please enter a valid address!", 404);
  }
  const coordinates = { lng: data[0].lon, lat: data[0].lat };
  return coordinates;
}
module.exports = getCoordsForAddr;
