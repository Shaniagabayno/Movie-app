const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String
}, { versionKey: false })

const movieSchema = new mongoose.Schema({
  name: String,
  premiered: String,
  genres: [String],
  image: String,
}, { versionKey: false })

const membersSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  dateBirth: String
}, { versionKey: false })


const subscriptionSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "members",
    required: true,
  },
  date: {
    type: String
  }
}, { versionKey: false })

const Users = mongoose.model("users", usersSchema)
const Subscriptions = mongoose.model("subscriptions", subscriptionSchema);
const Movie = mongoose.model("movies", movieSchema)
const Member = mongoose.model("members", membersSchema)
module.exports = { Users, Movie, Member, Subscriptions }



