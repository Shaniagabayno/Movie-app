const express = require("express");
const router = express.Router();
const subsBL = require("../models/subscriptionsBL")
const authToken = require("../middlewear/authToken")

router.get("/", authToken, async function (req, resp) {
  let subscriptions = await subsBL.getFullData()
  resp.json(subscriptions)
})

router.get("/:id", authToken, async function (req, resp) {
  let id = req.params.id
  let subscription = await subsBL.getSubscriptionById(id)
  resp.json(subscription)
})

router.post("/", async function (req, resp) {
  let obj = req.body
  await subsBL.addSubscription(obj)
  resp.json("Created!")
})
router.put("/:id", async function (req, resp) {
  let id = req.params.id
  let obj = req.body.obj
  await subsBL.updateSubscription(id, obj)
  resp.json("Updated!")
})
router.delete("/:id", async function (req, resp) {
  let id = req.params.id
  await subsBL.deleteSubscription(id)
  resp.json("Deleted!")
})

module.exports = router