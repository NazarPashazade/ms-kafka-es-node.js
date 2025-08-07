import { UpdateProductRequest } from "../dto/product.dto";
import { PrismaClient } from "../generated/prisma";
import type { ICatalogRepository } from "../interfaces/catalog-repository.interface";
import type { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this._prisma.product.findFirst({ where: { id } });
    if (!product) throw new Error(`Product with id ${id} not found`);
    return product;
  }

  async find(limit: number, offset: number): Promise<Product[]> {
    return await this._prisma.product.findMany({ take: limit, skip: offset });
  }

  async create(product: Product): Promise<Product> {
    return await this._prisma.product.create({ data: product as any });
  }

  async update(
    id: number,
    product: UpdateProductRequest
  ): Promise<Product | null> {
    return await this._prisma.product.update({ where: { id }, data: product });
  }

  async delete(id: number): Promise<number> {
    return (await this._prisma.product.delete({ where: { id } })).id;
  }
}
