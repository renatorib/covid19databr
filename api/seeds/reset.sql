DO $$ DECLARE
  r RECORD;
BEGIN
  DROP schema IF EXISTS tiger cascade;
  DROP schema IF EXISTS tiger_data cascade;
  DROP schema IF EXISTS topology cascade;
  DROP schema IF EXISTS public cascade;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  GRANT ALL ON SCHEMA public TO public;
  GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;
  GRANT ALL PRIVILEGES ON SCHEMA public TO public;
END $$;
