import { db } from "@/db";
import { appRouter } from "./appRouter";
import { createCallerFactory } from "./init";

const createCaller = createCallerFactory(appRouter);

export const trpc = createCaller({ db: db });
