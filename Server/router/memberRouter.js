const express = require("express");
const router = express.Router();
const memberBL = require("../models/membersBL")
const authToken = require("../middlewear/authToken")

router.get("/", authToken, async function (req, resp) {
  try {
    let members = await memberBL.getMembersData()
    resp.json(members)
  } catch (error) {
    console.error("ERROR!!");
  }

})

router.get("/:id", authToken, async function (req, resp) {
  let id = req.params.id
  let member = await memberBL.getMember(id)
  resp.json(member)
})

router.post("/", async function (req, resp) {
  let obj = req.body
  await memberBL.addMemberData(obj)
  return resp.json("Created!")
})

router.put("/:id", async function (req, resp) {
  let id = req.params.id
  let obj = req.body
  await memberBL.updateMemberData(id, obj)
  return resp.json("Updated!")
})

router.delete("/:id", async function (req, resp) {
  let id = req.params.id
  await memberBL.deleteMemberData(id)
  return resp.json("Deleted Successfully!")
})


module.exports = router