import { eq } from "drizzle-orm";
import { DB } from "../db/db-connection";
import { CartItem, cartItems, carts } from "../db/schema";
import { Cart, CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";

export const CartRepository: CartRepositoryType = {
  create: async function (
    customerId: number,
    cartItem: CartItem
  ): Promise<number> {
    const { price, itemName, qty, variant, productId } = cartItem;

    const result = await DB.insert(carts).values({ customerId }).returning();
    // .onConflictDoUpdate({
    //   target: carts.customerId,
    //   set: { updatedAt: new Date() },
    // });

    const cartId = result[0]?.id!;

    if (cartId > 0) {
      await DB.insert(cartItems).values({
        cartId,
        productId,
        itemName,
        price,
        qty,
        variant,
      });
    }

    return cartId;
  },

  find: async function (customerId: number): Promise<Cart> {
    const cart = await DB.query.carts.findFirst({
      where: eq(carts.customerId, customerId),
      with: { lineItems: true },
    });

    if (!cart) throw new NotFoundError("Cart not found!");

    return cart;
  },

  update: async function (id: number, qty: number): Promise<CartItem> {
    const [cartItem] = await DB.update(cartItems)
      .set({ qty })
      .where(eq(cartItems.id, id))
      .returning();

    return cartItem!;
  },

  delete: async function (id: number): Promise<Boolean> {
    await DB.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return true;
  },

  clear: async function (id: number): Promise<Boolean> {
    await DB.delete(carts).where(eq(carts.id, id)).returning();
    return true;
  },
};
