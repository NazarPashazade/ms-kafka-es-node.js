import { CreateCartRequestInput } from "../dto/cart-request.dto";
import { CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";
import { getProductDetails } from "../utils/broker/api";

export const CartService = {
  create: async (input: CreateCartRequestInput, repo: CartRepositoryType) => {
    const product = await getProductDetails(input.productId);

    if (product.stock < input.qty) {
      throw new NotFoundError("Product is out of stock");
    }

    return await repo.create(input);
  },
  update: async (id: number, data: any, repo: CartRepositoryType) => {
    return await repo.update(id, data);
  },
  delete: async (id: number, repo: CartRepositoryType) => {
    return await repo.delete(id);
  },
  get: async (repo: CartRepositoryType) => {
    return await repo.find();
  },
};
