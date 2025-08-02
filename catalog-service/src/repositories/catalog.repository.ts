import type { ICatalogRepository } from "../interfaces/catalog-repository.interface";
import type { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  findOne(id: number): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  create(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(id: number, product: Product): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
