import express from "express";
import getListings from "./get-listings.js"

const app = express();

app.get("/get-listings", (req, res) => {
  const city = req.query.city;
  const bedrooms = parseInt(req.query.bedrooms);
  const bathrooms = parseInt(req.query.bathrooms);

  try {
    const listings = getListings(city, bedrooms, bathrooms);
    res.send(listings);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(8080);
