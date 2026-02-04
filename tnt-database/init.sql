-- Drop tables if they exist so we can re run this file
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS articleGenres;
DROP TABLE IF EXISTS statuses;
DROP TABLES IF EXISTS users;

CREATE TABLE genres(
  genre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(100) NOT NULL,
  PRIMARY KEY (genre_id)
);

CREATE TABLE statuses(
  status_id INTEGER GENERATED ALWAYS AS IDENTITY,
  status_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (status_id)
);

CREATE TABLE articles(
  article_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_title VARCHAR(255) NOT NULL,
  article_summary VARCHAR(1000) NOT NULL,
  article_text VARCHAR(10000) NOT NULL,
  artcile_created_at VARCHAR(64) NOT NULL,
  article_published_at VARCHAR(64),
  artcile_time_period INTEGER NOT NULL,
  article_is_breaking BOOLEAN,
  article_status_id INTEGER NOT NULL,
  article_rating INTEGER NOT NULL,
  article_image_path VARCHAR(500) NOT NULL,
  PRIMARY KEY (article_id),
  CONSTRAINT fk_status
    FOREIGN KEY (article_status_id)
    REFERENCES statuses(status_id)
);

CREATE TABLE articleGenres(
  articleGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (articleGenre_id),
  CONSTRAINT fk_article
    FOREIGN KEY (article_id)
    REFERENCES article(article_id),
  CONSTRAINT fk_genre
    FOREIGN KEY (genre_id)
    REFERENCES genres(genre_id)
);

CREATE TABLE users(
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  user_first_name VARCHAR(64) NOT NULL,
  user_surname VARCHAR(64) NOT NULL,
  user_username VARCHAR(64) NOT NULL,
  user_password VARCHAR(64) NOT NULL,
  user_age INTEGER,
  user_email VARCHAR(100) NOT NULL,
  user_profile_pic VARCHAR(500),
  PRIMARY KEY (user_id)
);

CREATE TABLE userGenres(
  userGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (userGenre_id),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),
  CONSTRAINT fk_genre_user
    FOREIGN KEY (genre_id)
    REFERENCES genres(genre_id)
);

INSERT INTO statuses (status_name) VALUES
  ("Writing"),
  ("In Review"),
  ("Rejected"),
  ("Published");

INSERT INTO genres (genre) VALUES
  ("Politics"),
  ("Music"),
  ("Fashion"),
  ("Food"),
  ("Entertainment"),
  ("Sport"),
  ("Business"),
  ("Culture"),
  ("Technology"),
  ("World");

INSERT INTO ARTICLE ( 
  article_title, 
  article_summary,
  article_text,
  artcile_created_at,
  article_published_at,
  artcile_time_period,
  article_is_breaking,
  article_status_id,
  article_rating,
  article_image_path)
VALUES
    (
    "Instructor astonished as students perfomr beyond expectations",
    "Tech instructor ventures into uncharted territory with excelling pupils",
    "More text about our very interesting first article",
    "2026-02-02T14:35:12.345Z",
    "2026-02-04T14:35:12.345Z",
    1800,
    TRUE,
    4,
    23,
    "THIS IS AN IMAGE LINK"
    )
