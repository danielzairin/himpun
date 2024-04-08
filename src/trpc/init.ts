import { db } from "@/db";
import { initTRPC } from "@trpc/server";

type Context = {
  db: typeof db;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
