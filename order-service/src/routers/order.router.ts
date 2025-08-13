import * as express from "express";
import { messageBroker } from "../utils/broker/message-broker";
import { OrderEvent } from "../types";

export const orderRouter = express.Router();

const orderService: any = {};

orderRouter.post("/", async (req, res) => {
  try {
    const result = await orderService.create(req.body);

    await messageBroker.publish({
      topic: "OrderEvents",
      headers: { token: req.headers.authorization },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 2,
          },
        ],
      },
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

orderRouter.get("/", async (req, res) => {
  try {
    const result = await orderService.get();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await orderService.get(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

orderRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await orderService.delete(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});
