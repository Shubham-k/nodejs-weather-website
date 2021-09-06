const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const foreCast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/viewsHBS");
const partialsPath = path.join(__dirname, "../templates/viewsPartials");

//setup handlerbars engine and views loaction
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve up
app.use(express.static(publicDirectoryPath));

//index/home page using handler
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "SHUBHAM RAHEJA",
  });
});

//about page using handler
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Cristiano Ronaldo 🐐",
    name: "SHUBHAM RAHEJA",
  });
});

//help page using handler
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "SHUBHAM RAHEJA",
    message: "hello every one my name is shubham raheja and GOD is with me",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please proivde city name",
    });
  }
  // ******
  geoCode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    foreCast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        location: location,
        cityData: [foreCastData],
        address: req.query.address,
      });
    });
  });
  // ******
});

//HAVE A LOOK
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

//for help's further pages that doesn't exit
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "SHUBHAM RAHEJA",
    errorMessage: "help page article not found!",
  });
});

//for 404 page if any match doesn't found the program will execute this function
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "SHUBHAM RAHEJA",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
