CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username text
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  title text,
  user_id integer REFERENCES "user"(id)
);

CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  title text,
  project_id integer REFERENCES project(id)
);



-- CREATE TABLE artist (
--   id SERIAL PRIMARY KEY,
--   name text,
--   google_id text
-- );

-- CREATE TABLE album (
--   id SERIAL PRIMARY KEY,
--   title text,
--   artist_id integer REFERENCES artist(id)
-- );

-- CREATE TABLE track (
--   id SERIAL PRIMARY KEY,
--   title text,
--   album_id integer REFERENCES album(id)
-- );


