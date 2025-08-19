import * as express from "express";
import { catalogRouter } from "./routers/catalog.router";
import { HandleErrorWithLogger } from "./utils/error";
import { httpLogger } from "./utils/logger";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use("/api/catalog", catalogRouter);

app.use(HandleErrorWithLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
