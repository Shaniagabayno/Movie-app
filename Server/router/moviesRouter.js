const express = require("express");
const router = express.Router();
const movieBL = require("../models/movieBL")
const authToken = require("../middlewear/authToken")


router.get("/", authToken, async (req, resp) => {

  try {
    let movies = await movieBL.getAllMovies()
    return resp.json(movies)
  } catch (error) {
    console.error("ERROR!!");
  }
})

router.get("/:id", authToken, async function (req, resp) {
  let id = req.params.id
  let movie = await movieBL.getMovie(id)
  resp.json(movie)
})

router.post("/", async function (req, resp) {
  let obj = req.body
  await movieBL.addMovie(obj)
  return resp.json("Created!")
})

router.put("/:id", async function (req, resp) {
  let id = req.params.id
  let obj = req.body
  await movieBL.updateMovie(id, obj)
  return resp.json("Updated!")
})

router.delete("/:id", async function (req, resp) {
  let id = req.params.id
  await movieBL.deleteMovie(id)
  return resp.json("Deleted Successfully!")
})


module.exports = router