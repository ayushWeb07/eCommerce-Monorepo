import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@clerk/hono";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/", (c) => {
  return c.text("Hello World from Payments service!");
});

app.get("/protected", (c) => {
  const { userId } = getAuth(c);

  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ message: "Hello authenticated user!", userId });
});

serve(
  {
    fetch: app.fetch,
    port: 3002,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
