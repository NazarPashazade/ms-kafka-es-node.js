import { CartItem } from "../db/schema";

export type Cart = any;

export type CartRepositoryType = {
  find: (id: number) => Promise<Cart>;
  create: (customerId: number, cartItem: CartItem) => Promise<number>;
  update: (id: number, qty: number) => Promise<CartItem>;
  delete: (id: number) => Promise<Boolean>;
  clear: (id: number) => Promise<Boolean>;
};
