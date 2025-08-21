export interface InProcessOrder {
  id?: string;
  customerId: number;
  orderNumber: number;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
