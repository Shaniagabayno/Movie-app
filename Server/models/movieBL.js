const db = require("./allModels")

const getAllMovies = async () => {
  let movies = await db.Movie.find({})
  return movies;
}

const getMovie = async (id) => {
  let movie = await db.Movie.findById(id)
  return movie;
}

const addMovie = async (obj) => {
  let movie = new db.Movie(obj)
  await movie.save();
}

const updateMovie = async (id, obj) => {
  await db.Movie.findByIdAndUpdate(id, obj)
}

const deleteMovie = async (id) => {
  await db.Movie.findByIdAndDelete(id)
}


module.exports = { getAllMovies, getMovie, addMovie, updateMovie, deleteMovie }