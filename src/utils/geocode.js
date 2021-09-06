const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2h1YmhhbXJhaGVqYSIsImEiOiJja3NvbDIweXgzc2FkMnFvZGh1ejV0c3p0In0.81H6upjvt5Hgo5NTxEbI7w&limit=1";

  request({ url: url, json: true }, (error, response) => {
    const data = response.body;
    if (error) {
      callback("UNABLE TO CONNECT TO WEATHER SERVICE!!!!", {
        undefined,
        undefined,
        undefined,
      });
    } else if (response.body.features.length === 0) {
      callback("UNABLE TO FIND LOCATION!!!", {
        undefined,
        undefined,
        undefined,
      });
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
