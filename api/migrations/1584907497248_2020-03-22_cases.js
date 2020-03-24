"use strict";

module.exports.up = async (db) => {
  await db.raw(`
    CREATE TABLE cases
    (
        id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        cases        INT NOT NULL DEFAULT 0,
        deaths       INT NOT NULL DEFAULT 0,
        recovered    INT NOT NULL DEFAULT 0,
        date         DATE NOT NULL,
        location_id  UUID,
        source       TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        CONSTRAINT cases_location_id_fk FOREIGN KEY (location_id)
          REFERENCES locations (id) 
          ON DELETE SET NULL ON UPDATE CASCADE
    );
  `);
};

module.exports.down = async (db) => {
  await db.raw(`
    DROP TABLE cases
  `);
};

module.exports.config = { transaction: true };
