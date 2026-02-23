// functions/db-bootstrap-sqls.js

// 0. Drop tables in dependency order (child to parent)
export const sql00_dropAllTables = `
  DROP TABLE IF EXISTS
    comments,
    userGenres,
    articleGenres,
    articles,
    users,
    roles,
    statuses,
    genres
  CASCADE;
`;

// 1. Create tables

export const sql01_createGenresTable = `
  CREATE TABLE IF NOT EXISTS genres (
    genre_id  INTEGER GENERATED ALWAYS AS IDENTITY,
    genre     VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (genre_id)
  );
`;

export const sql02_createStatusesTable = `
  CREATE TABLE IF NOT EXISTS statuses (
    status_id   INTEGER GENERATED ALWAYS AS IDENTITY,
    status_name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (status_id)
  );
`;

export const sql03_createRolesTable = `
  CREATE TABLE IF NOT EXISTS roles (
    role_id   INTEGER GENERATED ALWAYS AS IDENTITY,
    role_name VARCHAR(64) UNIQUE,
    PRIMARY KEY (role_id)
  );
`;

export const sql04_createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id          INTEGER GENERATED ALWAYS AS IDENTITY,
    user_first_name  VARCHAR(64) NOT NULL,
    user_surname     VARCHAR(64) NOT NULL,
    user_username    VARCHAR(64) UNIQUE NOT NULL,
    user_password    VARCHAR(255) NOT NULL,
    user_age         INTEGER,
    user_email       VARCHAR(100) UNIQUE NOT NULL,
    user_profile_pic VARCHAR(500),
    user_role_id     INTEGER NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_role
      FOREIGN KEY (user_role_id)
      REFERENCES roles(role_id)
  );
`;

export const sql05_createArticlesTable = `
  CREATE TABLE IF NOT EXISTS articles (
    article_id           INTEGER GENERATED ALWAYS AS IDENTITY,
    article_title        VARCHAR(255)   NOT NULL,
    article_summary      VARCHAR(1000)  NOT NULL,
    article_text         VARCHAR(10000) NOT NULL,
    article_created_at   VARCHAR(64)    NOT NULL,
    article_published_at VARCHAR(64),
    article_time_period  INTEGER        NOT NULL,
    article_is_breaking  BOOLEAN,
    article_status_id    INTEGER        NOT NULL,
    article_rating       INTEGER        NOT NULL,
    article_image_path   VARCHAR(500)   NOT NULL,
    article_journalist_id INTEGER       NOT NULL,
    article_editor_id     INTEGER       NOT NULL,
    PRIMARY KEY (article_id),
    CONSTRAINT fk_status
      FOREIGN KEY (article_status_id)
      REFERENCES statuses(status_id),
    CONSTRAINT fk_journalist
      FOREIGN KEY (article_journalist_id)
      REFERENCES users(user_id),
    CONSTRAINT fk_editor
      FOREIGN KEY (article_editor_id)
      REFERENCES users(user_id)
  );
`;

export const sql06_createArticleGenresTable = `
  CREATE TABLE IF NOT EXISTS articleGenres (
    articleGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
    article_id      INTEGER NOT NULL,
    genre_id        INTEGER NOT NULL,
    PRIMARY KEY (articleGenre_id),
    CONSTRAINT fk_article
      FOREIGN KEY (article_id)
      REFERENCES articles(article_id),
    CONSTRAINT fk_genre
      FOREIGN KEY (genre_id)
      REFERENCES genres(genre_id)
  );
`;

export const sql07_createUserGenresTable = `
  CREATE TABLE IF NOT EXISTS userGenres (
    userGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id      INTEGER NOT NULL,
    genre_id     INTEGER NOT NULL,
    PRIMARY KEY (userGenre_id),
    CONSTRAINT fk_user
      FOREIGN KEY (user_id)
      REFERENCES users(user_id),
    CONSTRAINT fk_genre_user
      FOREIGN KEY (genre_id)
      REFERENCES genres(genre_id)
  );
`;

export const sql08_createCommentsTable = `
  CREATE TABLE IF NOT EXISTS comments (
    comment_id          INTEGER GENERATED ALWAYS AS IDENTITY,
    comment_user_id     INTEGER NOT NULL,
    comment_article_id  INTEGER NOT NULL,
    comment_text        VARCHAR(1000) NOT NULL,
    comment_date_posted VARCHAR(64)   NOT NULL,
    PRIMARY KEY (comment_id),
    CONSTRAINT fk_comment_user
      FOREIGN KEY (comment_user_id)
      REFERENCES users(user_id),
    CONSTRAINT fk_comment_article
      FOREIGN KEY (comment_article_id)
      REFERENCES articles(article_id)
  );
`;

// 2. Seed data

export const sql09_seedStatuses = `
  INSERT INTO statuses (status_name) VALUES
    ('Writing'),
    ('In Review'),
    ('Rejected'),
    ('Published')
  ON CONFLICT (status_name) DO NOTHING;
`;

export const sql10_seedGenres = `
  INSERT INTO genres (genre) VALUES
    ('Politics'),
    ('Music'),
    ('Fashion'),
    ('Food'),
    ('Entertainment'),
    ('Sport'),
    ('Business'),
    ('Culture'),
    ('Technology'),
    ('World')
  ON CONFLICT (genre) DO NOTHING;
`;

export const sql11_seedRoles = `
  INSERT INTO roles (role_name) VALUES
    ('Journalist'),
    ('Editor'),
    ('Reader')
  ON CONFLICT (role_name) DO NOTHING;
`;

export const sql12_seedUsers = `
  INSERT INTO users (
    user_first_name,
    user_surname,
    user_username,
    user_password,
    user_age,
    user_email,
    user_profile_pic,
    user_role_id
  ) VALUES
    (
      'Jane',
      'Reporter',
      'jane.reporter',
      'password123',
      32,
      'jane.reporter@example.com',
      'THIS IS AN IMAGE LINK',
      1
    ),
    (
      'Ed',
      'Editor',
      'ed.editor',
      'password123',
      40,
      'ed.editor@example.com',
      'THIS IS AN IMAGE LINK',
       2
    )
  ON CONFLICT (user_username) DO NOTHING;
`;

export const sql13_seedArticles = `
  INSERT INTO articles (
    article_title,
    article_summary,
    article_text,
    article_created_at,
    article_published_at,
    article_time_period,
    article_is_breaking,
    article_status_id,
    article_rating,
    article_image_path,
    article_journalist_id,
    article_editor_id
  ) VALUES (
    'Instructor astonished as students perform beyond expectations',
    'Tech instructor ventures into uncharted territory with excelling pupils',
    'More text about our very interesting first article',
    '2026-02-02T14:35:12.345Z',
    '2026-02-04T14:35:12.345Z',
    1800,
    TRUE,
    4,
    23,
    'THIS IS AN IMAGE LINK',
    1,
    2
  )
  ON CONFLICT DO NOTHING;
`;
