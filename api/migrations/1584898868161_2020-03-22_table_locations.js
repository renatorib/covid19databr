"use strict";

module.exports.up = async (db) => {
  await db.raw(`
    CREATE EXTENSION "uuid-ossp";
    CREATE TABLE locations
    (
        id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name        VARCHAR NOT NULL,
        type        VARCHAR NOT NULL,
        code        VARCHAR,
        geog        GEOGRAPHY NOT NULL,
        geom        GEOMETRY  NOT NULL,
        centroid    GEOMETRY  NOT NULL,
        parent_id   UUID,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        CONSTRAINT locations_parent_id_fk FOREIGN KEY (parent_id)
          REFERENCES locations (id) 
          ON DELETE SET NULL ON UPDATE CASCADE
    );
  `);
};

module.exports.down = async (db) => {
  await db.raw(`
    DROP TABLE locations
  `);
};

module.exports.config = { transaction: true };
