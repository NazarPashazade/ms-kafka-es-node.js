import { Cart, CartItem } from "../db/schema";
import { CartWithItems } from "../dto/cart-request.dto";

export type CartRepositoryType = {
  findCart: (customerId: number) => Promise<CartWithItems | undefined>;
  findCartItemByProductId: (
    customerId: number,
    productId: number
  ) => Promise<CartItem | null>;
  createCart: (customerId: number) => Promise<Cart>;
  addCartItem: (
    customerId: number,
    cartId: number,
    cartItem: CartItem
  ) => Promise<number>;
  updateCartItem: (id: number, qty: number) => Promise<CartItem>;
  deleteCartItem: (id: number) => Promise<Boolean>;
  clearCartItems: (id: number) => Promise<Boolean>;
};
