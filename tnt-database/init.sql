-- Drop tables if they exist so we can re run this file
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS articleGenres;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userGenres;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS comments;


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


CREATE TABLE roles(
  role_id INTEGER GENERATED ALWAYS AS IDENTITY,
  role_name VARCHAR(64),
  PRIMARY KEY (role_id)
);


CREATE TABLE users(
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  user_first_name VARCHAR(64) NOT NULL,
  user_surname VARCHAR(64) NOT NULL,
  user_username VARCHAR(64) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_profile_pic_path VARCHAR(500),
  user_role_id INTEGER NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_role
    FOREIGN KEY (user_role_id)
    REFERENCES roles(role_id)
);

CREATE TABLE articles(
  article_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_title VARCHAR(255),
  article_summary VARCHAR(1000),
  article_text VARCHAR(10000),
  article_submitted_at VARCHAR(64),
  article_published_at VARCHAR(64),
  article_historical_date VARCHAR(64),
  article_status_id INTEGER NOT NULL,
  article_rating INTEGER NOT NULL,
  article_image_path VARCHAR(500),
  article_journalist_id INTEGER NOT NULL,
  article_editor_id INTEGER,
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

CREATE TABLE articleGenres(
  articleGenre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  article_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (articleGenre_id),
  CONSTRAINT fk_article
    FOREIGN KEY (article_id)
    REFERENCES articles(article_id),
  CONSTRAINT fk_genre
    FOREIGN KEY (genre_id)
    REFERENCES genres(genre_id)
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

CREATE TABLE comments(
  comment_id INTEGER GENERATED ALWAYS AS IDENTITY,
  comment_user_id INTEGER NOT NULL,
  comment_article_id INTEGER NOT NULL,
  comment_text VARCHAR(1000) NOT NULL,
  comment_date_posted VARCHAR(64) NOT NULL,
  PRIMARY KEY (comment_id),
  CONSTRAINT fk_comment_user
    FOREIGN KEY (comment_user_id)
    REFERENCES users(user_id),
  CONSTRAINT fk_comment_article
    FOREIGN KEY (comment_article_id)
    REFERENCES articles(article_id)
);

INSERT INTO roles (role_name) VALUES
  ('General User'),
  ('Journalist'),
  ('Editor');

INSERT INTO statuses (status_name) VALUES
  ('Writing'),
  ('In Review'),
  ('Rejected'),
  ('Published');


INSERT INTO users (
  user_first_name,
  user_surname,
  user_username,
  user_password,
  user_email,
  user_role_id)
VALUES
  ('Gabriel',
    'Barrett',
    'G_Barrett',
    'password',
    'Gabriel@gmail.com',
    2),
  ('Imogen',
    'Greig',
    'I_Greig',
    'password',
    'Imogen@gmail.com',
    3);
 
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
  ('World');

-- INSERT INTO articles ( 
--   article_title, 
--   article_summary,
--   article_text,
--   article_submitted_at,
--   article_published_at,
--   article_historical_date,
--   article_status_id,
--   article_rating,
--   article_image_path,
--   article_journalist_id,
--   article_editor_id)
-- VALUES
--     ('Instructor astonished as students perfomr beyond expectations',
--     'Tech instructor ventures into uncharted territory with excelling pupils',
--     'More text about our very interesting first article',
--     '2026-02-02T14:35:12.345Z',
--     '2026-02-04T14:35:12.345Z',
--     1800,
--     4,
--     0,
--     'image link',
--     1,
--     2);

INSERT INTO articles (
    article_title, 
    article_summary, 
    article_text, 
    article_submitted_at, 
    article_published_at, 
    article_historical_date,
    article_status_id, 
    article_rating, 
    article_image_path, 
    article_journalist_id,
    article_editor_id
) VALUES 
  (
    'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
    'A Middle Ages cannon was discovered in the Derbyshire Dales District', 
    'More text about our very interesting first article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    1500, 
    4, 
    0, 
    '/article1.jpg', 
    1,
    2
  ),

  (
    'Planking: is your child at risk?', 'Explore the risks of todays latest youth trends', 'A man has died in Australia after taking part in the internet phenomenon of planking. But what is it and where did the craze come from?The victim, a man in his 20s, fell from a balcony railing in Brisbane while a friend photographed him, according to police. The phenomenon of planking involves lying face down in a public place - the stranger the better - and posting photos on social networking sites such as Facebook. Aficionados lie expressionless with a straight body, hands by their sides and toes pointing into the ground. Two groups claim to have invented the prank - either in Somerset in 2000 as the lying down game or eight years later in South Australia as planking. Both groups have rival Facebook sites boasting more than 100,000 fans.', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    2010,
    4, 
    10, 
    '/plank.jpg', 
    1,
    2
  ),

  (
    'LISAs: Not just a simpson character', 
    'How a LISA can help you buy your first home with government D''oh!', 
    'More text about our very interesting third article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    2020,
    4, 
    2, 
    '/stonks_will.jpg', 
    1,
    2
  ),

  (
    'Why your 67th birthday will make your grandkids love you', 
    '67 is the new it number, we speak to sponsor Darshan McCarLover to find out more', 
    'More text about our very interesting fourth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    2026,
    4, 
    4,
    '/oldman.jpg', 
    1,
    2
  ),

  (
    'Can''t hit your protein? Doctor Will weighs in', 
    '6000 BOMBOCLAT CHICKEN NUGGETS', 
    'More text about our very interesting fifth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    2025,
    4, 
    100, 
    '/doctor_will.png', 
    1,
    2
  ),

  (
    'Harry Styles new album inspires Russian Revolution-esque revolt in all-girls Grammar School', 
    'Mr Style''s new album ''Aperture'' has sent this London school into total anarchy as teachers are chased out with molotovs', 
    'More text about our very interesting sixth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    2026,
    4, 
    0, 
    '/harry.png', 
    1,
    2
  ),

  (
    'TikTok to be renamed Hickory Dickory Tikory Tokory in the UK', 
    'TikTok, reels, shorts and an appeal to british values', 
    'More text about our very interesting seventh article',
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    1700, 
    4, 
    0, 
    '/stressed_goon.png', 
    1,
    2
  ),

  (
    'Wall St Crash more like Wall St Bash!', 
    'Buy into Trading 212 today!', 
    'More text about our very interesting eighth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    1920, 
    4,
    0, 
    '/wallstcrash.jpg', 
    1,
    2
  ),

  (
    'Prime Minister of New Zealand celebrates 21st birthday', 
    'Colin McNewZealand celebrates his 21st birthday surrounded by friends and family', 
    'More text about our very interesting ninth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    2076,
    4, 
    6, 
    '/colin.png', 
    1,
    2
  ),

    (
    'Try this weird victorian trick to get your baby to sleep',
    'Move over Pampers, time to try arsenic!', 
    'More text about our very interesting tenth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    1800,
    4, 
    5,
    '/babyarsenic.jpg',
    1,
    2
  ),

  (
    'Watermelon sugar is a euphemism but what for?', 
    'Tastes like strawberries? Not so much', 
    'More text about our very interesting sixth article',
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    2020,
    4,
    5,
    '/kirby.jpg',
    1,
    2
  );
