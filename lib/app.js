import express from "express";
import cors from 'cors'
import { Routes } from "./routes/routes";
import helmet from "helmet";

class App {
  constructor(app, routePrv) {
    this.app = express();
    this.config();
    this.routePrv = new Routes().routes(this.app);
  }

  config() {
    this.app.use(cors())
    this.app.use(helmet());
  }
}

export default new App().app;
