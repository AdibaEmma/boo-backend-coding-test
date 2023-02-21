import mongoose from 'mongoose';
import express from 'express';
import App from './server.js'
import { config } from './src/config/config.js';
import Logging from './src/utils/logging.js'

mongoose.set("strictQuery", true);
mongoose.connect(config.mongo.uri, config.mongo.options, {
  retryWrites: true,
  w: "majority",
  autoIndex: false,
})
.then(() => {
  Logging.info("Database connected");
  App.createServer()
})
.catch((error) => {
    Logging.error(error.message)
});

