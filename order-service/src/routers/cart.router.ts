import * as express from "express";
import * as cartService from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";
import { CartService as service } from "../services/cart.service";
import { ValidateRequest } from "../utils/validator";
import { CartRepositoryType } from "../types/repository.type";
import {
  CreateCartRequestInput,
  CreateCartRequestSchema,
} from "../dto/cart-request.dto";

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

cartRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await service.update(id, req.body, CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await service.delete(id, CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const result = await service.get(CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});
