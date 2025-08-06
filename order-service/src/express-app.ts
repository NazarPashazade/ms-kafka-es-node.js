import * as express from "express";
import * as cors from "cors";
import { orderRouter } from "./routers/order.router";
import { cartRouter } from "./routers/cart.router";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.use("/health", (req, res) => {
  res.status(200).send("I am healthy!");
});

export default app;
