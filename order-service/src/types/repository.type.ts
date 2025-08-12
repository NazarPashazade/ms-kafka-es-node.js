import {
  CreateCartRequestInput,
  EditCartRequestInput,
} from "../dto/cart-request.dto";

export type Cart = any;

export type CartRepositoryType = {
  find: () => Promise<Cart>;
  create: (cart: CreateCartRequestInput) => Promise<Cart>;
  update: (id: number, cart: EditCartRequestInput) => Promise<Cart | null>;
  delete: (id: number) => Promise<number>;
};
