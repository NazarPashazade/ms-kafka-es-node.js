import * as express from "express";
import { catalogRouter } from "./apis/catalog.router";

const app = express();

app.use(express.json());

app.use("/api/catalog", catalogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
