import { Consumer, Producer } from "kafkajs";
import { messageBroker } from "../utils/broker/message-broker";
import { CatalogEvent } from "../types";
import { CatalogService } from "./catalog.service";
import { catalogService } from "../routers/catalog.router";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private _catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this._catalogService = catalogService;
  }

  async initializeBroker() {
    this.producer = await messageBroker.connectProducer<Producer>();

    this.producer.on("producer.connect", () => {
      console.log("Catalog Service: Producer connected successfully");
    });

    this.consumer = await messageBroker.connectConsumer<Consumer>();

    this.consumer.on("consumer.connect", () => {
      console.log("Catalog Service: Consumer connected successfully");
    });

    // Subscribe
    await messageBroker.subscribe(
      catalogService.handleBrokerMessage,
      "CatalogEvents"
    );
  }

  async sendCreateOrderMessage(message: any) {
    await messageBroker.publish({
      message,
      headers: {},
      topic: "CatalogEvents",
      event: CatalogEvent.CREATE_ORDER,
    });
  }

  async sendDeleteProductMessage(message: any) {
    await messageBroker.publish({
      message,
      headers: {},
      topic: "CatalogEvents",
      event: CatalogEvent.CANCEL_ORDER,
    });
  }
}
