import * as dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = parseInt(process.env.PORT!, 10);

export const CLIENT_ID = process.env.CLIENT_ID!;
export const GROUP_ID = process.env.GROUP_ID!;
export const BROKERS = [process.env.BROKERS!];
