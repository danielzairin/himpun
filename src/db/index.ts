import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DB_URL) {
  throw Error("missing environment variable 'DB_URL'");
}

export const client = postgres(process.env.DB_URL);

export const db = drizzle(client);
