const { gql } = require("apollo-server-koa");
const db = require("../../db");

const typeDefs = gql`
  extend type Query {
    cases(location_id: String!): [Case]
  }

  type Case {
    id: String
    cases: Int
    deaths: Int
    recovered: Int
    date: String
    source: String
  }

  extend type Location {
    cases: [Case]
  }
`;

const resolvers = {
  Query: {
    cases: async (_, args) => {
      const data = await db("cases")
        .select(["id", "cases", "deaths", "recovered", "source", "location_id"])
        .select(db.raw(`to_char(date, 'YYYY-MM-DD') as date`))
        .orderBy("date", "desc")
        .where("location_id", args.location_id);

      return data;
    },
  },

  Location: {
    cases: async (parent) => {
      const data = await db("cases")
        .select(["id", "cases", "deaths", "recovered", "source", "location_id"])
        .select(db.raw(`to_char(date, 'YYYY-MM-DD') as date`))
        .orderBy("date", "desc")
        .where("location_id", parent.id);

      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
