import { eq } from "drizzle-orm";
import { DB } from "../db/db-connection";
import { CartItem, cartItems, carts } from "../db/schema";
import { CartWithItems } from "../dto/cart-request.dto";
import { CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";

export const CartRepository: CartRepositoryType = {
  addCartItem: async function (
    customerId: number,
    cartItem: CartItem
  ): Promise<number> {
    const { price, itemName, qty, variant, productId } = cartItem;

    const result = await DB.insert(carts).values({ customerId }).returning();
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

  findCart: async function (customerId: number): Promise<CartWithItems> {
    const cart = await DB.query.carts.findFirst({
      where: eq(carts.customerId, customerId),
      with: { items: true },
    });

    if (!cart) throw new NotFoundError("Cart not found!");

    if (!cart.items.length) throw new NotFoundError("Cart is empty!");

    return cart;
  },

  updateCartItem: async function (id: number, qty: number): Promise<CartItem> {
    const [cartItem] = await DB.update(cartItems)
      .set({ qty })
      .where(eq(cartItems.id, id))
      .returning();

    return cartItem!;
  },

  deleteCartItem: async function (id: number): Promise<Boolean> {
    await DB.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return true;
  },

  clearCartItems: async function (id: number): Promise<Boolean> {
    await DB.delete(carts).where(eq(carts.id, id)).returning();
    return true;
  },

  findCartItemByProductId: async function (
    customerId: number,
    productId: number
  ): Promise<CartItem | null> {
    const cart = await DB.query.carts.findFirst({
      where: eq(carts.customerId, customerId),
      with: {
        items: {
          where: eq(cartItems.productId, productId),
        },
      },
    });

    console.log({ cart });

    if (!cart) return null;

    return cart.items[0]!;
  },
};
