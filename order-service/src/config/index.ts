import * as dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = parseInt(process.env.PORT!, 10);

export const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL;

export const CLIENT_ID = process.env.process || "order-service";
export const GROUP_ID = process.env.GROUP_ID || "order-service-group";
export const BROKERS = [process.env.BROKERS || "localhost:9092"];
