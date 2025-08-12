import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  varchar,
  numeric,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  customerId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>;
export type NewCart = InferInsertModel<typeof carts>;

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(), // for db record
  productId: integer("product_id").notNull(),
  cartId: integer("cart_id")
    .references(() => carts.id, { onDelete: "cascade" })
    .notNull(),
  itemName: varchar("item_name").notNull(), // human readable
  variant: varchar("variant"), // Small // medium // big
  qty: integer("qty").notNull(),
  price: numeric("amount").notNull(), // amount in cents
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CartItem = InferSelectModel<typeof cartItems>;

export const cartRelations = relations(carts, ({ many }) => ({
  lineItems: many(cartItems),
}));

export const CartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
}));
