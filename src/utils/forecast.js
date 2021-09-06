const request = require("request");

const foreCast = (a, b, callback) => {
  //   const lat = a.toString();
  //   const long = b.toString();
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(a) +
    "&lon=" +
    encodeURIComponent(b) +
    "&appid=7a9c44c66cb7672e90d095e3406f03e7&units=metric";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("UNABLE TO CONNECT TO WEATHER SERVICE!!!!", undefined);
    } else if (response.body.message) {
      callback("WRONG COORDINATES", undefined);
    } else {
      callback(undefined, {
        CityName: response.body.name,
        Temp: response.body.main.temp,
        WeatherToday: response.body.weather[0].description,
        Humidity: response.body.main.humidity,
      });
    }
  });
};

module.exports = foreCast;
