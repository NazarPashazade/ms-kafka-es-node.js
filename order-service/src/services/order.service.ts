import { OrderItemType, OrderWithItems } from "../dto/order-request.dto";
import {
  CartRepositoryType,
  MessageType,
  OrderRepositoryType,
  OrderStatus,
} from "../types";
import { brokerService } from "./broker.service";

const createOrder = async (
  customerId: number,
  orderRepo: OrderRepositoryType,
  cartRepo: CartRepositoryType
) => {
  const cart = await cartRepo.findCart(customerId);

  if (!cart) {
    throw new Error("Cart not found for the customer");
  }

  let cartTotal = 0;
  let orderItems: OrderItemType[] = [];
  const orderNumber = Math.floor(Math.random() * 1000000);

  cart.items.forEach((item) => {
    cartTotal += Number(item.price);

    orderItems.push({
      itemName: item.itemName,
      qty: item.qty,
      amount: item.price,
      productId: item.productId,
    } as OrderItemType);
  });

  const orderInput: OrderWithItems = {
    customerId,
    amount: cartTotal.toString(),
    status: OrderStatus.PENDING,
    txnId: `txn-${Date.now()}`,
    orderNumber,
    items: orderItems,
  };

  const orderId = await orderRepo.createOrder(orderInput);

  const result = await cartRepo.clearCartItems(customerId);

  console.log({ orderId, ClearResult: result });

  await brokerService.sendCreateOrderMessage({
    order: orderInput,
  });

  return { message: "Order created successfully", orderNumber };
};

const updateOrderStatus = async (
  orderId: number,
  status: OrderStatus,
  orderRepo: OrderRepositoryType
) => {
  await orderRepo.updateOrderStatus(orderId, status);

  if (OrderStatus.CANCELLED === status) {
    // publish event
  }
  return { message: "Order status updated successfully", orderId, status };
};

const getOrder = async (
  orderId: number,
  orderRepo: OrderRepositoryType
): Promise<OrderWithItems> => {
  const order = await orderRepo.findOrder(orderId);

  if (!order) throw new Error("Order not found");

  return order;
};

const getOrders = async (
  customerId: number,
  orderRepo: OrderRepositoryType
) => {
  const orders = await orderRepo.findOrders(customerId);

  if (!orders || orders.length === 0) {
    throw new Error("No orders found for the customer");
  }

  return orders;
};

const deleteOrder = async (orderId: number, orderRepo: OrderRepositoryType) => {
  const order = await getOrder(orderId, orderRepo);
  const result = await orderRepo.cancelOrder(order.id!);
  return !!result;
};

const handleSubscription = async (message: MessageType) => {
  // Handle the subscription message
  console.log("handleSubscription called with message: ", message);
};

export const OrderService = {
  createOrder,
  updateOrderStatus,
  getOrder,
  getOrders,
  deleteOrder,
  handleSubscription,
};
