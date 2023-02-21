import express from "express";
import http from "http";
import { config } from "./src/config/config.js";
import Logging from "./src/utils/logging.js";
import { profileRoutes } from "./src/routes/profile.js";
import { commentRoutes } from "./src/routes/comment.js";
import { userRoutes } from "./src/routes/user.js";


class App {
  constructor(app) {
    this.app = express();
  }

  createServer = () => {
    // set the view engine to ejs
    this.app.set("view engine", "ejs");

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // routes
    this.app.use("/profiles", profileRoutes());
    this.app.use("/comments", commentRoutes());
    this.app.use("/users", userRoutes());

    // start server
    http.createServer(this.app).listen(config.server.port, () => {
      Logging.info(`Server running on port ${config.server.port}`);
      Logging.info(`Open app on http://localhost:${config.server.port}/`);
    });

    return this.app;
  };
}

const app = express();

export default new App(app);
