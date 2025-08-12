import { DB } from "../db/db-connection";
import { carts } from "../db/schema";
import {
  CreateCartRequestInput,
  EditCartRequestInput,
} from "../dto/cart-request.dto";
import { Cart, CartRepositoryType } from "../types/repository.type";

export const CartRepository: CartRepositoryType = {
  find: async (): Promise<Cart[]> => {
    // Implementation for finding carts with pagination
    return [];
  },

  create: async (cart: CreateCartRequestInput): Promise<Cart> => {
    const result = await DB.insert(carts)
      .values({ customerId: 123 })
      .returning({ cartId: carts.id });

    return result;
  },

  update: async (
    id: number,
    input: EditCartRequestInput
  ): Promise<Cart | null> => {
    return input;
  },

  delete: async (id: number): Promise<number> => {
    // Implementation for deleting a cart
    return id; // Example return value
  },
};
