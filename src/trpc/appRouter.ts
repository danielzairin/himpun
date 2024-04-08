import { count } from "drizzle-orm";
import { s } from "@/db/schema";
import { publicProcedure, router } from "./init";
import { z } from "zod";

const profiles = router({
  list: publicProcedure
    .input(
      z
        .object({
          max: z.number().int().min(0).max(100).default(100),
        })
        .optional()
        .default({
          max: 100,
        })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.select().from(s.profiles).limit(input.max);
    }),
});

export const appRouter = router({
  ping: publicProcedure.query(() => "pong" as const),
  users: router({
    count: publicProcedure.query(async ({ ctx }) => {
      const [result] = await ctx.db.select({ count: count() }).from(s.users);
      return result.count;
    }),
  }),
  profiles,
});

export type AppRouter = typeof appRouter;
