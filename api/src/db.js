const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || "5432",
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  migrations: {
    tableName: "migrations"
  },
  acquireConnectionTimeout: 120000
});

module.exports = db;
