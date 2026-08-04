import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express";

const app: Express = express();

app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from Products service!");
});

// Use `getAuth()` to protect this route
app.get("/protected", async (req, res) => {
  // Use `getAuth()` to get the user's `userId` and authentication status
  const { isAuthenticated, userId } = getAuth(req);

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  res.json({ user });
});

app.listen(3000);
