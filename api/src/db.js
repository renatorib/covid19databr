const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    tableName: "migrations",
  },
  acquireConnectionTimeout: 120000,
});

module.exports = db;
