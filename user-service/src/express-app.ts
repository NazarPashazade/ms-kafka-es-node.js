import * as express from "express";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json());

app.use("/api/user", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
