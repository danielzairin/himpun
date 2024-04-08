import { count } from "drizzle-orm";
import { users } from "@/db/schema";
import { publicProcedure, router } from "./init";

export const appRouter = router({
  ping: publicProcedure.query(() => "pong" as const),
  users: router({
    count: publicProcedure.query(async ({ ctx }) => {
      const [result] = await ctx.db.select({ count: count() }).from(users);
      return result.count;
    }),
  }),
});

export type AppRouter = typeof appRouter;
