import { faker } from "@faker-js/faker";
import * as express from "express";
import * as request from "supertest";
import { Product } from "../../models/product.model";
import { ProductFactory } from "../../utils/fixtures";
import { catalogRouter, catalogService } from "../catalog.router";

const app = express();

app.use(express.json());

app.use("/api/catalog", catalogRouter);

const mockRequest = (rest?: any): Product => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 1, max: 100 }),
    ...rest,
  };
};

describe("Catalog Router", () => {
  describe("POST / products", () => {
    test("should create new product successfully", async () => {
      const requestBody = mockRequest();
      const responseBody = ProductFactory.build();

      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(responseBody));

      const result = await request(app)
        .post("/api/catalog/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(result.status).toBe(201);
      expect(result.body).toEqual(responseBody);
    });

    test("should respond with validation error 400", async () => {
      const requestBody = mockRequest({ name: "" });

      const result = await request(app)
        .post("/api/catalog/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(result.status).toBe(400);
      expect(result.body).toEqual(["name should not be empty"]);
    });

    test("should respond with Internal error 500", async () => {
      const requestBody = mockRequest();
      const mockError = "Error occurred while creating product!";

      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.reject(new Error(mockError)));

      const result = await request(app)
        .post("/api/catalog/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(result.status).toBe(500);
      expect(result.body).toEqual(mockError);
    });
  });

  describe("PATCH / products", () => {
    test("should update product successfully", async () => {
      const existingProduct = ProductFactory.build();

      const requestBody = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      };

      const responseBody = {
        ...existingProduct,
        ...requestBody,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(responseBody));

      const result = await request(app)
        .patch(`/api/catalog/products/${existingProduct.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(result.status).toBe(200);
      expect(result.body).toEqual(responseBody);
    });
  });

  describe("GET / products?limit=0&offset=0", () => {
    test("should return range of products based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 1, max: 10 });
      const mockProducts = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(mockProducts));

      const result = await request(app)
        .get(`/api/catalog/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockProducts);
    });
  });

  describe("GET / products/:id", () => {
    test("should return product by Id", async () => {
      const mockProduct = ProductFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(mockProduct));

      const result = await request(app)
        .get(`/api/catalog/products/${mockProduct.id}`)
        .set("Accept", "application/json");

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockProduct);
    });
  });

  describe("DELETE / products/:id", () => {
    test("should delete product by Id", async () => {
      const mockId = faker.number.int({ min: 1, max: 1000 });
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve(mockId));

      const result = await request(app)
        .delete(`/api/catalog/products/${mockId}`)
        .set("Accept", "application/json");

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockId);
    });
  });
});
