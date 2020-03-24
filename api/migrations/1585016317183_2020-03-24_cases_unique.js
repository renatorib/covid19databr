"use strict";

module.exports.up = async (db) => {
  await db.raw(`
    ALTER TABLE cases
    ADD CONSTRAINT unique_location_date UNIQUE (location_id, date);
  `);
};

module.exports.down = async (db) => {
  await db.raw(`
    ALTER TABLE cases
    DROP CONSTRAINT unique_location_date;
  `);
};

module.exports.config = { transaction: true };
