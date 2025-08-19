import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import type { Product } from "../models/product.model";
import type { CatalogRepository } from "../repositories/catalog.repository";
import { NotFoundError } from "../utils/error";

export class CatalogService {
  private _catalogRepository: CatalogRepository;

  constructor(catalogRepository: CatalogRepository) {
    this._catalogRepository = catalogRepository;
  }

  async createProduct(data: CreateProductRequest): Promise<Product> {
    const product = await this._catalogRepository.create(data);
    if (!product.id) throw new Error("unable to create product");
    return product;
  }

  async updateProduct(id: number, product: UpdateProductRequest): Promise<any> {
    return this._catalogRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<number> {
    return this._catalogRepository.delete(id);
  }

  async getProducts(limit: number, offset: number): Promise<Product[]> {
    return this._catalogRepository.find(limit, offset);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this._catalogRepository.findOne(id);

    if (!product) throw new NotFoundError(`Product with id ${id} not found`);

    return product;
  }

  async getStockDetails(ids: number[]): Promise<Product[]> {
    const products = await this._catalogRepository.findStock(ids);

    if (!products) throw new Error("Unable to find product stock details");

    return products;
  }

  async handleBrokerMessage(message: any): Promise<void> {
    console.log("Received message from broker:", message);
  }
}
