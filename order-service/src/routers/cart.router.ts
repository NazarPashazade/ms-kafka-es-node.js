import * as express from "express";
import {
  CreateCartRequestInput,
  CreateCartRequestSchema,
} from "../dto/cart-request.dto";
import { CartRepository } from "../repositories/cart.repository";
import { CartService as service } from "../services/cart.service";
import { ValidateRequest } from "../utils/validator";
import { RequestAuthorizer } from "../middleware/auth.middleware";

export const cartRouter = express.Router();

cartRouter.post("/", RequestAuthorizer, async (req, res, next) => {
  try {
    const user = (req as any).user;

    if (!user) {
      next(new Error("User not found"));
      return;
    }

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

cartRouter.get("/", RequestAuthorizer, async (req, res, next) => {
  try {
    const user = (req as any).user;

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const result = await service.get(user.customerId, CartRepository);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});
