import * as express from "express";

export const orderRouter = express.Router();

const orderService: any = {};

orderRouter.post("/", async (req, res) => {
  try {
    const result = await orderService.create(req.body);

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
