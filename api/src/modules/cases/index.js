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

const fields = ["id", "cases", "deaths", "recovered", "source", "location_id"];

const casesByLocationIdQuery = (location_id) => {
  return db("cases")
    .select(fields)
    .select(db.raw(`to_char(date, 'YYYY-MM-DD') as date`))
    .orderBy("date", "desc")
    .where("location_id", location_id);
};

const resolvers = {
  Query: {
    cases: async (_, args) => {
      return casesByLocationIdQuery(args.location_id);
    },
  },

  Location: {
    cases: async (parent) => {
      return casesByLocationIdQuery(parent.id);
    },
  },
};

module.exports = { typeDefs, resolvers };
