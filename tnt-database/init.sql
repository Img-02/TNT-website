-- Drop tables if they exist so we can re run this file
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS genres;

CREATE TABLE genres(
  genre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(100),
  PRIMARY KEY (genre_id)
);

CREATE TABLE articles(
  article_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_title VARCHAR(255) NOT NULL,
  article_summary VARCHAR(1000) NOT NULL,
  article_text VARCHAR(10000) NOT NULL,
  article_published_at INTEGER NOT NULL,
  article_genre VARCHAR(100),
  PRIMARY KEY (article_id)
);

TABLE articleGenres(
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

CREATE TABLE course (
  course_id     SERIAL PRIMARY KEY,
  teacher_id    INTEGER REFERENCES teacher(teacher_id),
  course_name   VARCHAR(255) NOT NULL,
  course_length VARCHAR(50)
);

INSERT INTO teacher (first_name, surname) VALUES
  ('Alice', 'Williams'),
  ('Mark', 'Thompson'),
  ('Sara', 'Gatsby');

INSERT INTO course (teacher_id, course_name, course_length) VALUES
  (1, 'Maths',   '1 term'),
  (2, 'Music',   '1 term'),
  (1, 'Physics', '2 terms'),
  (3, 'History', '1 term');
