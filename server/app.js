'use strict';

const mongoose = require('mongoose')
const express = require('express');
const { config } = require('./config/common.config')
const app = express();


mongoose.set("strictQuery", true);
mongoose.connect(config.mongo.uri, {
  retryWrites: true,
  w: "majority",
  autoIndex: false,
})
.then(() => {
  console.log("Database connected");
  // set the view engine to ejs
  app.set("view engine", "ejs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.use("/", require("./routes/profile")());

  // start server
  const server = app.listen(config.server.port);
  console.log("Express started. Listening on %s", config.server.port);
})
.catch((error) => {
    console.log(error.message)
});

