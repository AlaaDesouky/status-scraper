import express from "express";
import { Routes } from "./routes/routes";

class App {
  // const routePrv = new Routes();
  constructor(app, routePrv) {
    this.app = express();
    this.routePrv = new Routes().routes(this.app);
  }
}

export default new App().app;
