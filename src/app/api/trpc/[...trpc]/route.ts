import { db } from "@/db";
import { appRouter } from "@/trpc/appRouter";
import { fetchRequestHandler as trpcRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

function handler(req: NextRequest): Promise<Response> {
  return trpcRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => ({ db }),
    req,
  });
}

export const GET = handler;
export const POST = handler;
