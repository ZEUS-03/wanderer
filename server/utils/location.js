const axios = require("axios");
const HttpError = require("../models/http-errors");

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
      "X-RapidAPI-Key": "33d15553dbmsh5667d32b0b183fbp149dcbjsnc83c544639fc",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  const data = response.data;

  if (data.isEmpty()) {
    throw new HttpError("Please enter a valid address!", 404);
  }
  const coordinates = { lng: data[0].lon, lat: data[0].lat };
  return coordinates;
}
module.exports = getCoordsForAddr;
