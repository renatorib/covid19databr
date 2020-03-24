"use strict";

module.exports.up = async (db) => {
  await db.raw(`CREATE EXTENSION unaccent;`);
};

module.exports.down = async (db) => {
  await db.raw(`DROP EXTENSION unaccent;`);
};

module.exports.config = { transaction: true };
