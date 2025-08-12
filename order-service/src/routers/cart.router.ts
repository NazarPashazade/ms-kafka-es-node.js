import * as express from "express";
import {
  CreateCartRequestInput,
  CreateCartRequestSchema,
} from "../dto/cart-request.dto";
import { CartRepository } from "../repositories/cart.repository";
import { CartService as service } from "../services/cart.service";
import { ValidateRequest } from "../utils/validator";

export const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    const err = ValidateRequest<CreateCartRequestInput>(
      req.body,
      CreateCartRequestSchema
    );

    const result = await service.create(req.body, CartRepository);

    if (err) return res.status(404).json({ err });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

cartRouter.patch("/:itemId", async (req, res) => {
  try {
    const itemId = Number(req.params.itemId || "0");

    const result = await service.update(
      {
        id: itemId,
        qty: req.body.qty,
      },
      CartRepository
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

cartRouter.delete("/:itemId", async (req, res) => {
  try {
    const itemId = Number(req.params.itemId || "0");

    const result = await service.delete(itemId, CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    // customerId coming from JWT
    const result = await service.get(req.body.customerId, CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});
