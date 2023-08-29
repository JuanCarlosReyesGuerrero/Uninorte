const express = require("express");
const movieSchema = require("../models/movie.model");

const router = express.Router();

// create movie
router.post("/movies", (req, res) => {
  const movie = movieSchema(req.body);
  movie
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all movies
router.get("/movies", (req, res) => {
  movieSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a movie
router.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  movieSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a movie
router.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  movieSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a movie
router.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  movieSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;