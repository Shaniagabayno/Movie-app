const db = require("./allModels")

const getUsers = async () => {
  let users = await db.Users.find({})
  return users;
}

const getUser = async (id) => {
  let user = await db.Users.findById(id)
  return user;
}

const addUser = async (obj) => {
  let users = new db.Users(obj)
  await users.save()
}

const updateUser = async (id, obj) => {
  await db.Users.findByIdAndUpdate(id, obj)
}

const deleteUser = async (id) => {
  await db.Users.findByIdAndDelete(id)
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser }