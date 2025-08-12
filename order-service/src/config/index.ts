import * as dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = parseInt(process.env.PORT!, 10);
