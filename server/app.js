'use strict';

const mongoose = require('mongoose')
const express = require('express');
const http = require('http')
const { config } = require('./config/common.config')
const Logging = require('./utils/logging')
const app = express();


mongoose.set("strictQuery", true);
mongoose.connect(config.mongo.uri, {
  retryWrites: true,
  w: "majority",
  autoIndex: false,
})
.then(() => {
  Logging.info("Database connected");
  // set the view engine to ejs
  app.set("view engine", "ejs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.use("/profiles", require("./routes/profile")());

  // start server
   http.createServer(app).listen(config.server.port, () => {
     Logging.info(`Server running on port ${config.server.port}`);
     Logging.info(`Open app on http://localhost:${config.server.port}/`);
   });
})
.catch((error) => {
    console.log(error.message)
});

