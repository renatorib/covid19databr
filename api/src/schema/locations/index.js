const { gql } = require("apollo-server-koa");
const db = require("../../db");

const typeDefs = gql`
  extend type Query {
    locations(search: String): [Location]
  }

  extend type Case {
    location: Location
  }

  type Location {
    id: String
    name: String
    type: String
    geog: String
  }
`;

const fields = ["id", "name", "type", db.raw(`st_astext(geog) as geog`)];

const getLocationById = id =>
  db("locations")
    .first(fields)
    .where("id", id);

const getLocationsBySearch = search =>
  db("locations")
    .select(fields)
    .where(
      db.raw(`unaccent(name)`),
      "ILIKE",
      db.raw(`'%' || unaccent('${search}') || '%'`)
    );

const resolvers = {
  Query: {
    locations: (_, args) => getLocationsBySearch(args.search)
  },

  Case: {
    location: parent => getLocationById(parent.location_id)
  }
};

module.exports = { typeDefs, resolvers };
