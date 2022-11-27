const jwt = require("jsonwebtoken")
require("dotenv").config()


const authenticateToken = async (req, resp, next) => {
  //Option 1
  // const token = req.header("x-auth-token")
  //Option 2
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return resp.sendStatus(401)
  //Authenticate token
  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = user.username
    next()
  } catch (error) {
    resp.json("Invalid Token!")
  }

}

module.exports = authenticateToken;

