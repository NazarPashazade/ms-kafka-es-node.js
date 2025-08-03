import type { Product } from "../models/product.model";

export interface ICatalogRepository {
  findOne(id: number): Promise<Product | null>;

  find(limit: number, offset: number): Promise<Product[]>;

  create(product: Product): Promise<Product>;

  update(id: number, product: Product): Promise<Product | null>;

  delete(id: number): Promise<number>;
}
