const db = require("./allModels")


const getFullData = async () => {
  const doc = await db.Subscriptions.find().populate('memberId movieId')
  return doc
}

const getSubscriptionById = async (Id) => {
  let subscription = await db.Subscriptions.findById(Id)
  return subscription;
}

const addSubscription = async (obj) => {
  let subscription = new db.Subscriptions(obj)
  await subscription.save()
}

const updateSubscription = async (id, obj) => {
  await db.Subscriptions.findByIdAndUpdate(id, obj)
}

const deleteSubscription = async (id) => {
  await db.Subscriptions.findByIdAndDelete(id)
}


module.exports = { getFullData, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }