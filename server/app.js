import mongoose from 'mongoose';
import express from 'express';
import http from 'http'
import { config } from './config/config.js';
import Logging from './utils/logging.js'
import { profileRoutes } from './routes/profile.js'

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
  app.use("/profiles", profileRoutes());

  // start server
   http.createServer(app).listen(config.server.port, () => {
     Logging.info(`Server running on port ${config.server.port}`);
     Logging.info(`Open app on http://localhost:${config.server.port}/`);
   });
})
.catch((error) => {
    console.log(error.message)
});

