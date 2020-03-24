const Koa = require("koa");
const { ApolloServer } = require("apollo-server-koa");

const server = new ApolloServer({
  modules: [
    require("./modules/cases/index.js"),
    require("./modules/locations/index.js"),
  ],
});

const app = new Koa();
app.use(server.getMiddleware());

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
