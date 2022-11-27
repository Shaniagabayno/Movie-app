const express = require("express");
const router = express.Router();
const usersBL = require("../models/usersBL")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models/allModels")
require("dotenv").config()


router.get("/", async (req, resp) => {
  let users = await usersBL.getUsers()
  return resp.json(users)
})

router.get("/:id", async function (req, resp) {
  let id = req.params.id
  let user = await usersBL.getUser(id)
  return resp.json(user)
})

//Create new user
router.post("/", async function (req, resp) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { fullname: req.body.fullname, username: req.body.username, password: hashedPassword }
    await usersBL.addUser(user)
    resp.status(201).send("Created!")

  } catch (error) {
    resp.status(500).send()
  }
})

//Log in
router.post("/login", async (req, resp) => {
  const { username, password } = req.body
  const user = await db.Users.findOne({ username }).lean()
  if (!user) {
    return resp.json({ status: "error", error: "Invalid username/password" })
  }
  try {
    //Compare hashed password with user password to see if they are valid
    if (await bcrypt.compare(password, user.password)) {
      //Send JWT
      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" })

      resp.json({
        accessToken,
        username
      })

    } else {
      return resp.send("Not Allowed")
    }
  } catch (error) {
    resp.status(500).send("ERROR")
  }
})

router.put("/:id", async function (req, resp) {
  let id = req.params.id
  let obj = req.body
  await usersBL.updateUser(id, obj)
  return resp.json("Updated!")
})

router.delete("/:id", async function (req, resp) {
  let id = req.params.id
  await usersBL.deleteUser(id)
  return resp.json("Deleted Successfully!")
})


module.exports = router
