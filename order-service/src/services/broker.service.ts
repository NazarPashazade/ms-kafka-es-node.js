import { Consumer, Producer } from "kafkajs";
import { messageBroker } from "../utils/broker/message-broker";
import { OrderService } from "./order.service";
import { OrderEvent } from "../types";

const initializeBroker = async () => {
  const producer = await messageBroker.connectConsumer<Producer>();

  producer.on("producer.connect", () => {
    console.log("Order Service: Producer connected successfully");
  });

  const consumer = await messageBroker.connectConsumer<Consumer>();

  consumer.on("consumer.connect", () => {
    console.log("Order Service: Consumer connected successfully");
  });

  await messageBroker.subscribe(OrderService.handleSubscription, "OrderEvents");
};

const sendCreateOrderMessage = async (message: any) => {
  await messageBroker.publish({
    message,
    headers: {},
    topic: "CatalogEvents",
    event: OrderEvent.CREATE_ORDER,
  });
};

const sendOrderCancelledMessage = async (message: any) => {
  await messageBroker.publish({
    message,
    headers: {},
    topic: "CatalogEvents",
    event: OrderEvent.CANCEL_ORDER,
  });
};

export const brokerService = {
  initializeBroker,
  sendCreateOrderMessage,
  sendOrderCancelledMessage,
};
