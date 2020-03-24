const { gql } = require("apollo-server-koa");
const db = require("../../db");

const typeDefs = gql`
  extend type Query {
    locations(search: String, type: LocationType): [Location]
  }

  extend type Case {
    location: Location
  }

  enum LocationType {
    STATE
    COUNTY
  }

  type Coordinates {
    latitude: String
    longitude: String
  }

  type Location {
    id: String
    name: String
    type: String
    geog: String
    centroid: Coordinates
  }
`;

const locationTypes = {
  STATE: "state",
  COUNTY: "county",
};

const fields = [
  "id",
  "name",
  "type",
  db.raw(`st_astext(geog) as geog`),
  db.raw(`st_x(centroid) as centroid_lng`),
  db.raw(`st_y(centroid) as centroid_lat`),
];

const locationsQuery = (search, { type }) => {
  const query = db("locations")
    .select(fields)
    .where(
      db.raw(`unaccent(name)`),
      "ILIKE",
      db.raw(`'%' || unaccent('${search}') || '%'`)
    );

  if (type) {
    query.where("type", type);
  }

  return query;
};

const locationByIdQuery = (id) => db("locations").first(fields).where("id", id);

const resolvers = {
  Query: {
    locations: (_, args) => {
      return locationsQuery(args.search, { type: locationTypes[args.type] });
    },
  },

  Case: {
    location: (parent) => {
      return locationByIdQuery(parent.location_id);
    },
  },

  Location: {
    centroid: (parent) => ({
      latitude: parent.centroid_lat,
      longitude: parent.centroid_lng,
    }),
  },
};

module.exports = { typeDefs, resolvers };
