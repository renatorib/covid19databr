"use strict";

module.exports.up = async (db) => {
  await db.schema.alterTable("", (table) => {
    table.string("");
  });
};

module.exports.down = async (db) => {
  throw Error("Not implemented");
};

module.exports.config = { transaction: true };
