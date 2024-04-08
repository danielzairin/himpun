import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw Error("missing environment variable 'DB_URL'");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
} satisfies Config;
