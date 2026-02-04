-- Drop tables if they exist so we can re run this file
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS articleGenres;


CREATE TABLE genres(
  genre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(100),
  PRIMARY KEY (genre_id)
);

CREATE TABLE status(
  status_id INTEGER GENERATED ALWAYS AS IDENTITY,
  status_name VARCHAR(100),
  PRIMARY KEY (status_id)
);

CREATE TABLE articles(
  article_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_title VARCHAR(255) NOT NULL,
  article_summary VARCHAR(1000) NOT NULL,
  article_text VARCHAR(10000) NOT NULL,
  artcile_created_at INTEGER NOT NULL,
  article_published_at INTEGER,
  article_genre VARCHAR(100) NOT NULL,
  artcile_time_period INTEGER NOT NULL,
  article_is_breaking BOOLEAN NOT NULL,
  article_status_id INTEGER NOT NULL,
  article_rating INTEGER NOT NULL,
  article_image_path VARCHAR(500) NOT NULL,
  PRIMARY KEY (article_id),
  CONSTRAINT fk_status
    FOREIGN KEY (article_status_id)
    REFERENCES status(status_id)
);

CREATE TABLE articleGenres(
  articleGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_id INTEGER,
  genre_id INTEGER,
  PRIMARY KEY (articleGenre_id),
  CONSTRAINT fk_article
    FOREIGN KEY (article_id)
    REFERENCES article(article_id),
  CONSTRAINT fk_genre
    FOREIGN KEY (genre_id)
    REFERENCES genres(genre_id)
);

INSERT INTO teacher (first_name, surname) VALUES
  ('Alice', 'Williams'),
  ('Mark', 'Thompson'),
  ('Sara', 'Gatsby');
