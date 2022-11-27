const express = require('express');
const moviesRouter = require('./router/moviesRouter')
const usersRouter = require('./router/usersRouter')
const membersRouter = require('./router/memberRouter')
const subsRouter = require('./router/subscriptionsRouter')
const cors = require('cors')

require("./configs/database")
const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/movies", moviesRouter)
app.use("/api/users", usersRouter)
app.use("/api/members", membersRouter)
app.use("/api/subs", subsRouter)

app.listen(2000);

console.log(("Onload..."));