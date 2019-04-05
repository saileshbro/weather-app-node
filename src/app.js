const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || 3000;
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../", "templates/views"));
hbs.registerPartials(path.join(__dirname, "../", "templates/partials"));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sailesh Dahal"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sailesh Dahal"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help message",
    title: "Help",
    name: "Sailesh Dahal"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: "You must provide an address!"
    });
  }
  geocode(
    req.query.address,
    (error, {
      latitude,
      longitude,
      location
    } = {}) => {
      if (error) {
        return res.json({
          error
        });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }
  res.send({
    products: []
  });
});
app.get("/help/*", (req, res) => {
  res.status(404).render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Sailesh Dahal"
  });
});
app.get("*", (req, res) => {
  res.status(404).render("404", {
    errorMessage: "Page Not Found",
    title: "404",
    name: "Sailesh Dahal"
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});