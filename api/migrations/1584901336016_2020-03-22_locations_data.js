"use strict";

const fs = require("fs");

const countries = (db) =>
  db.raw(
    `INSERT INTO locations (name, type, code, geom, geog, centroid)
    SELECT
      json.value->'properties'->>'name' as name,
      json.value->'properties'->>'type' as type,
      json.value->'properties'->>'code' as code,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geom,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geog,
      st_centroid(st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326)) as centroid
    FROM jsonb_array_elements((?::jsonb)->'features') json`,
    fs.readFileSync("geojson/ibge/countries.json", "utf8")
  );

const states = (db) =>
  db.raw(
    `INSERT INTO locations (name, type, code, geom, geog, centroid, parent_id)
    SELECT
      json.value->'properties'->>'name' as name,
      json.value->'properties'->>'type' as type,
      json.value->'properties'->>'code' as code,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geom,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geog,
      st_centroid(st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326)) as centroid,
      (SELECT id FROM locations l WHERE l.type = 'country' AND ST_Within(st_centroid(st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326)), l.geom))
    FROM jsonb_array_elements((?::jsonb)->'features') json`,
    fs.readFileSync("geojson/ibge/states.json", "utf8")
  );

const counties = (db) =>
  db.raw(
    `INSERT INTO locations (name, type, code, geom, geog, centroid, parent_id)
    SELECT
      json.value->'properties'->>'name' as name,
      json.value->'properties'->>'type' as type,
      json.value->'properties'->>'code' as code,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geom,
      st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326) as geog,
      st_centroid(st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326)) as centroid,
      (SELECT id FROM locations l WHERE l.type = 'state' AND ST_Within(st_centroid(st_setSRID(st_geomFromGeoJSON(json.value->'geometry'), 4326)), l.geom))
    FROM jsonb_array_elements((?::jsonb)->'features') json`,
    fs.readFileSync("geojson/ibge/counties.json", "utf8")
  );

module.exports.up = async (db) => {
  await countries(db);
  await states(db);
  await counties(db);
};

module.exports.down = async (db) => {
  await db.raw(`
    DELETE FROM locations WHERE true
  `);
};

module.exports.config = { transaction: true };
