import cors from "cors";
import express, { json } from "express";
import morgan from "morgan";

import { setupRoutes } from "./setup-routes";
export const setupApp = async () => {
  const app = express();
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
  await setupRoutes(app);
  return app;
};
