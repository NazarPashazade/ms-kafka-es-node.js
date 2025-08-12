import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./src/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  driver: "pglite",
  dbCredentials: { url: DB_URL! },
  migrations: {
    table: "migrations",
    schema: "./src/db/migrations",
    prefix: "timestamp",
  },
});
