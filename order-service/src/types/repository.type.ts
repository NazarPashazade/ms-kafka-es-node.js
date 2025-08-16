import { CartItem } from "../db/schema";
import { CartWithItems } from "../dto/cart-request.dto";

export type CartRepositoryType = {
  findCart: (customerId: number) => Promise<CartWithItems>;
  findCartItemByProductId: (
    customerId: number,
    productId: number
  ) => Promise<CartItem | null>;
  addCartItem: (customerId: number, cartItem: CartItem) => Promise<number>;
  updateCartItem: (id: number, qty: number) => Promise<CartItem>;
  deleteCartItem: (id: number) => Promise<Boolean>;
  clearCartItems: (id: number) => Promise<Boolean>;
};
