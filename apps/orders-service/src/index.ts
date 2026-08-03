import fastify from "fastify";

const server = fastify();

server.get("/", async (request, reply) => {
  return "Hello World from Orders service!";
});

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
