require("dotenv").config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.localhost",
});

module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    tableName: "migrations",
  },
  acquireConnectionTimeout: 120000,
  pool: {
    afterCreate(conn, done) {
      conn.on("notice", (msg) => {
        // eslint-disable-next-line
        console.info("sql notice:", msg.message);
      });
      done(null, conn);
    },
  },
};
