const express = require("express");
const movieController = require("../Controllers/movieController.js");

const movieRoutes = express.Router();

const {getAllMovies,getOneMovie,addNewMovie,updateMovieById,updatePartOfMovieById,deleteMovieById} = movieController;

movieRoutes.route("/").get(getAllMovies).post(addNewMovie);
movieRoutes.route("/:id").put(updateMovieById).patch(updatePartOfMovieById).delete(deleteMovieById).get(getOneMovie);

module.exports = movieRoutes;