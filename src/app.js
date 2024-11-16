const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const assignmentRouter = require("./routes/assignment");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use("", userRouter);
app.use("/assignments", assignmentRouter);

module.exports = app;