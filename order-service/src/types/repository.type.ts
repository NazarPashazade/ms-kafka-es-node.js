export type CreateCartRequest = any;
export type UpdateCartRequest = any;
export type Cart = any;

export type CartRepositoryType = {
  find: () => Promise<Cart>;
  create: (cart: CreateCartRequest) => Promise<Cart>;
  update: (id: number, cart: UpdateCartRequest) => Promise<Cart | null>;
  delete: (id: number) => Promise<number>;
};
