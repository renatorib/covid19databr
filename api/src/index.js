const Koa = require("koa");
const { ApolloServer, gql, graphiqlKoa } = require("apollo-server-koa");
const db = require("./db");

// The GraphQL schema
const typeDefs = gql`
  type Location {
    id: String
    name: String
    type: String
    geog: String
    cases: [Case]
  }

  type Case {
    id: String
    cases: Int
    deaths: Int
    recovered: Int
    date: String
    source: String
    location: Location
  }

  type Query {
    locations(search: String): [Location]
    cases(location_id: String!): [Case]
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    locations: async (_, args) => {
      const data = await db("locations")
        .select(["id", "name", "type", db.raw(`st_astext(geog) as geog`)])
        .where("name", "ilike", `%${args.search}%`);

      return data;
    },
    cases: async (_, args) => {
      const data = await db("cases")
        .select(["id", "cases", "deaths", "recovered", "source", "location_id"])
        .select(db.raw(`to_char(date, 'YYYY-MM-DD') as date`))
        .orderBy("date", "desc")
        .where("location_id", args.location_id);

      return data;
    }
  },

  Location: {
    cases: async parent => {
      const data = await db("cases")
        .select(["id", "cases", "deaths", "recovered", "source", "location_id"])
        .select(db.raw(`to_char(date, 'YYYY-MM-DD') as date`))
        .orderBy("date", "desc")
        .where("location_id", parent.id);

      return data;
    }
  },

  Case: {
    location: async parent => {
      console.log(parent.location_id);
      const data = await db("locations")
        .first(["id", "name", "type", db.raw(`st_astext(geog) as geog`)])
        .where("id", parent.location_id);
      console.log(data);

      return data;
    }
  }
};

const server = new ApolloServer({
  modules: [
    require("./schema/cases/index.js"),
    require("./schema/locations/index.js")
  ]
});

const app = new Koa();
app.use(server.getMiddleware());
// app.use(graphiqlKoa({ endpointURL: "/graphiql" }));

console.log(graphiqlKoa);

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
