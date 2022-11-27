const db = require("./allModels")

const getMembersData = async () => {
  let data = await db.Member.find({})
  return data;
}

const getMember = async (id) => {
  let member = await db.Member.findById(id)
  return member;
}

const addMemberData = async (obj) => {
  let data = new db.Member(obj)
  await data.save();
}

const updateMemberData = async (id, obj) => {
  await db.Member.findByIdAndUpdate(id, obj)
}

const deleteMemberData = async (id) => {
  await db.Member.findByIdAndDelete(id)
}

module.exports = { getMembersData, getMember, addMemberData, updateMemberData, deleteMemberData }


