import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const states = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Malacca",
  "Negeri Sembilan",
  "Pahang",
  "Penang",
  "Perak",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
] as const;

export const stateEnum = pgEnum("state", states);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 32 }).notNull().unique(),
  profileId: integer("profile_id")
    .references(() => profiles.id)
    .notNull(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  state: stateEnum("state").notNull(),
});

export * as s from "./schema";
