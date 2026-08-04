import "dotenv/config"
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { clerkClient, getAuth, clerkPlugin } from "@clerk/fastify";

const server = fastify();

server.register(clerkPlugin);

server.get("/", async (request, reply) => {
  return "Hello World from Orders service!";
});

server.get("/getUser", async (req: FastifyRequest, res: FastifyReply) => {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, userId } = getAuth(req);

  // Protect the route by checking if the user is authenticated
  if (!isAuthenticated) {
    res.status(401).send({ error: "User not authenticated" });
  }

  // Initialize clerkClient
  // Use the `getUser()` method to get the Backend User object
  const user = await clerkClient.users.getUser(userId!);

  // Return the Backend User object
  res.status(200).send(user);
});

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
