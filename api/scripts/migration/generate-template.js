"use strict";

module.exports.up = async db => {
  await db.schema.alterTable("", table => {
    table.string("");
  });
};

module.exports.down = async () => {
  throw Error("Not implemented");
};

module.exports.config = { transaction: true };
