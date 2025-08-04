import * as express from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repositories/catalog.repository";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { RequestValidator } from "../utils/request-validator";

export const catalogRouter = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

catalogRouter.post("/products", async (req, res) => {
  try {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );

    if (errors) return res.status(400).json(errors);

    const result = await catalogService.createProduct(input);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

catalogRouter.patch("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await catalogService.updateProduct(id, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

catalogRouter.get("/products", async (req, res) => {
  try {
    const limit = Number(req.query["limit"] || "10");
    const offset = Number(req.query["offset"] || "0");

    const result = await catalogService.getProducts(limit, offset);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

catalogRouter.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await catalogService.getProduct(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});

catalogRouter.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id || "0");

    const result = await catalogService.deleteProduct(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json((error as Error).message || "Internal Server Error");
  }
});
