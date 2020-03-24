require("dotenv").config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.localhost",
});

module.exports = {
  client: "pg",
  connection: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || "5432",
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
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
