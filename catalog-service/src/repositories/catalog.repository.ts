import type { ICatalogRepository } from "../interfaces/catalog-repository.interface";
import type { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  findOne(id: number): Promise<Product | null> {
    return Promise.resolve({} as Product);
  }

  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([{} as Product]);
  }

  create(product: Product): Promise<Product> {
    return Promise.resolve({
      id: Math.floor(Math.random() * 1000),
      ...product,
    });
  }

  update(id: number, product: Product): Promise<Product | null> {
    return Promise.resolve({
      id,
      ...product,
    });
  }

  delete(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
