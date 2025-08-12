import * as cors from "cors";
import * as express from "express";
import { cartRouter } from "./routers/cart.router";
import { orderRouter } from "./routers/order.router";
import { HandleErrorWithLogger } from "./utils/error";
import { httpLogger } from "./utils/logger";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use(express.json());
app.use(cors());
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.use(HandleErrorWithLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
