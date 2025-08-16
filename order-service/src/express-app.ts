import * as cors from "cors";
import * as express from "express";
import { cartRouter } from "./routers/cart.router";
import { orderRouter } from "./routers/order.router";
import { HandleErrorWithLogger } from "./utils/error";
import { httpLogger, logger } from "./utils/logger";
import { messageBroker } from "./utils/broker/message-broker";
import { Consumer, Producer } from "kafkajs";

export const expressApp = async () => {
  const app = express();

  app.use(httpLogger);
  app.use(express.json());
  app.use(cors());

  // 1. Connect to Producer and Consumer

  // const producer = await messageBroker.connectProducer<Producer>();
  // producer.on("producer.connect", () => logger.info("Producer Connected"));

  // const consumer = await messageBroker.connectConsumer<Consumer>();
  // consumer.on("consumer.connect", () => logger.info("Consumer Connected"));

  // // 2. Subscribe to topic or Publish the message

  // await messageBroker.subscribe((message) => {
  //   console.log(`Message received: ${message}`);
  // }, "OrderEvents");

  app.use("/api/orders", orderRouter);
  app.use("/api/cart", cartRouter);

  app.use(HandleErrorWithLogger);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
};
