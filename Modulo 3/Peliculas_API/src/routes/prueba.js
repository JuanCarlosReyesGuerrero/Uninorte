const express = require("express");
const movieSchema = require("../models/movie.model");

const router = express.Router();

// get all movies
router.get("/movies", (req, res) => {
    movieSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

module.exports = router;