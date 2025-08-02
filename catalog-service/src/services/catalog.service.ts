import type { Product } from "../models/product.model";
import type { CatalogRepository } from "../repositories/catalog.repository";

export class CatalogService {
  private _catalogRepository: CatalogRepository;

  constructor(private catalogRepository: CatalogRepository) {
    this._catalogRepository = catalogRepository;
  }

  createProduct(data: any): Promise<any> {
    return this._catalogRepository.create(data);
  }

  updateProduct(id: number, product: any): Promise<any> {
    return this._catalogRepository.update(id, product);
  }

  deleteProduct(id: number): Promise<any> {
    return this._catalogRepository.delete(id);
  }

  getProducts(limit: number, offset: number): Promise<Product[]> {
    return this._catalogRepository.find();
  }

  getProduct(id: number): Promise<Product[]> {
    return this._catalogRepository.find();
  }
}
