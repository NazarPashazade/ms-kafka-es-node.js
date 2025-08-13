import {
  CreateCartRequestInput,
  EditCartRequestInput,
} from "../dto/cart-request.dto";
import { CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";
import { getProductDetails } from "../utils/broker/api";

export const CartService = {
  create: async (
    { qty, customerId, productId }: CreateCartRequestInput,
    repo: CartRepositoryType
  ) => {
    const { id, price, name, variant, stock } = await getProductDetails(
      productId
    );

    if (stock < qty) {
      throw new NotFoundError("Product is out of stock");
    }

    return await repo.create(customerId, {
      productId: id,
      price: price.toString(),
      itemName: name,
      variant,
      qty,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      cartId: 0,
    });
  },

  update: async (input: EditCartRequestInput, repo: CartRepositoryType) => {
    return await repo.update(input.id, input.qty);
  },

  delete: async (id: number, repo: CartRepositoryType) => {
    return await repo.delete(id);
  },

  get: async (customerId: number, repo: CartRepositoryType) => {
    const cart = await repo.find(customerId);

    if (!cart) {
      throw new NotFoundError("Cart not found!");
    }

    return cart;
  },
};
