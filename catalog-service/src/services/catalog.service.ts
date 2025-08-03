import type { Product } from "../models/product.model";
import type { CatalogRepository } from "../repositories/catalog.repository";

export class CatalogService {
  private _catalogRepository: CatalogRepository;

  constructor(catalogRepository: CatalogRepository) {
    this._catalogRepository = catalogRepository;
  }

  async createProduct(data: any): Promise<Product> {
    const product = await this._catalogRepository.create(data);
    if (!product.id) throw new Error("unable to create product");
    return product;
  }

  async updateProduct(id: number, product: any): Promise<any> {
    return this._catalogRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<number> {
    return this._catalogRepository.delete(id);
  }

  async getProducts(limit: number, offset: number): Promise<Product[]> {
    return this._catalogRepository.find(limit, offset);
  }

  async getProduct(id: number): Promise<Product | null> {
    return this._catalogRepository.findOne(id);
  }
}
