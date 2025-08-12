import { Static, Type } from "@sinclair/typebox";

export const CreateCartRequestSchema = Type.Object({
  productId: Type.Integer(),
  customerId: Type.Integer(),
  qty: Type.Integer(),
});

export const EditCartRequestSchema = Type.Object({
  id: Type.Integer(),
  qty: Type.Integer(),
});

export type CreateCartRequestInput = Static<typeof CreateCartRequestSchema>;
export type EditCartRequestInput = Static<typeof EditCartRequestSchema>;
