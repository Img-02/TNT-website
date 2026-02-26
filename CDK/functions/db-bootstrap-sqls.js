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
    user_password    VARCHAR(644) NOT NULL,
    user_email       VARCHAR(100) UNIQUE NOT NULL,
    user_profile_pic_path VARCHAR(500),
    user_role_id     INTEGER NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_role
      FOREIGN KEY (user_role_id)
      REFERENCES roles(role_id)
  );
`;

export const sql05_createArticlesTable = `
  CREATE TABLE IF NOT EXISTS articles (
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
    article_draft_number INTEGER NOT NULL,
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
    ('Reader'),
    ('Journalist'),
    ('Editor')
  ON CONFLICT (role_name) DO NOTHING;
`;

export const sql12_seedUsers = `
  INSERT INTO users (
    user_first_name,
    user_surname,
    user_username,
    user_password,
    user_email,
    user_profile_pic_path,
    user_role_id
  ) VALUES
    (
      'Jane',
      'Reporter',
      'jane.reporter',
      'password123',
      'jane.reporter@example.com',
      'THIS IS AN IMAGE LINK',
      2
    ),
    (
      'Ed',
      'Editor',
      'ed.editor',
      'password123',
      'ed.editor@example.com',
      'THIS IS AN IMAGE LINK',
       3
    ),
    ( 'Gabriel',
      'Barrett',
      'G_Barrett',
      'password',
      'Gabriel@gmail.com',
      'imageLInk',
      1 
    ),
    ( 'Imogen',
      'Greig',
      'I_Greig',
      'password',
      'Imogen@gmail.com',
      'THIS IS A IMAGE STINKY LINKY BINKY',
      2
    )
  ON CONFLICT (user_username) DO NOTHING;
`;

export const sql13_seedArticles = `
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
    article_editor_id,
    article_draft_number
  ) VALUES 
  (
    'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
    'A Middle Ages cannon was discovered in the Derbyshire Dales District', 
    'More text about our very interesting first article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    '1500', 
    4, 
    0, 
    'article1.jpg', 
    1,
    2,
    1
  ),
  (
    'Planking: is your child at risk?', 
    'Explore the risks of todays latest youth trends', 
    'A man has died in Australia after taking part in the internet phenomenon of planking. But what is it and where did the craze come from?The victim, a man in his 20s, fell from a balcony railing in Brisbane while a friend photographed him, according to police. The phenomenon of planking involves lying face down in a public place - the stranger the better - and posting photos on social networking sites such as Facebook. Aficionados lie expressionless with a straight body, hands by their sides and toes pointing into the ground. Two groups claim to have invented the prank - either in Somerset in 2000 as the lying down game or eight years later in South Australia as planking. Both groups have rival Facebook sites boasting more than 100,000 fans.', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    '2010',
    4, 
    10, 
    'plank.jpg', 
    4,
    2,
    2
  ),
  (
    'LISAs: Not just a simpson character', 
    'How a LISA can help you buy your first home with government D''oh!', 
    '', 
    '', 
    '',
    '2020',
    1, 
    2, 
    'stonks_will.jpg', 
    4,
    2,
    1
  ),
  (
    'Why your 67th birthday will make your grandkids love you', 
    '67 is the new it number, we speak to Darshan Dave to find out more', 
    'Read on to find out more.', 
    '', 
    '', 
    '2026',
    1, 
    4,
    'oldman.jpg', 
    1,
    2,
    1
  ),
  (
    'Can''t hit your protein? Doctor Will weighs in', 
    'Try this Roman hack', 
    'They used to eat flamingos!',
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    '2025',
    4, 
    100, 
    'doctor_will.png', 
    1,
    2,
    4
  ),
  (
    'TikTok to be renamed Hickory Dickory Tikory Tokory in the UK', 
    'TikTok, reels, shorts and an appeal to british values', 
    'More text about our very interesting seventh article',
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    '1700', 
    4, 
    0, 
    'stressed_lady.png', 
    1,
    2,
    1
  ),
  (
    'Wall St Crash more like Wall St Bash!', 
    'Buy into Trading 212 today!', 
    'More text about our very interesting eighth article', 
    '2026-02-02T14:35:12.345Z', 
    '',
    '1920', 
    3,
    0, 
    'wallstcrash.jpg', 
    1,
    2,
    1
  ),
  (
    'How did the the Han dynasty bury their royals we interviewed their guards and found out more!', 
    'These exquisite jade burial suits were just a rumor—until the discovery of an ancient Chinese tomb', 
    'Rising over the Mancheng district, 120 miles south of Beijing, is Lingshan. More than 2,000 years ago, thousands of tons of rock were removed from its eastern slope to create complex tombs housing the remains of an elite couple: Liu Sheng, prince of Zhongshan, and his wife, Dou Wan. Miraculously unlooted for the next two millennia, the tombs 1960s discovery stunned archaeologists, not only for their engineering but also for the dazzling grave goods they contained. The couples remains were wrapped in jade burial suits now regarded as some of Chinas greatest national treasures.', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    '2026',
    4, 
    6, 
    'han.png', 
    4,
    2,
    3
  ),
  (
    'The Prime Minister of New Zealand Celebrates Birthday!',
    'Give him a cheer!', 
    'More text about our very interesting tenth article', 
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z', 
    '1800',
    4, 
    5,
    'colin.jpg',
    1,
    2,
    4
  ),
  (
    'Will Watermelon''s Become the New Currency, Talk about Watermelon sugar!',
    'Learn about the new push to bring back bartering.', 
    'Who needs money when you can trade produce with your neighbours?',
    '2026-02-02T14:35:12.345Z', 
    '2026-02-02T14:35:12.345Z',
    '1000',
    4,
    5,
    'harry.jpg',
    1,
    2,
    5
  ),
  (
    'First Human Colony Established on Mars',
    'An international crew founded a permanent Martian settlement.',
    'In 2037, astronauts established the first sustainable human settlement on Mars.',
    '2026-02-08T11:00:00.000Z',
    '',
    '2037',
    2,
    5,
    'mars.jpg',
    1,
    2,
    1
  ),
  (
    'Global Fusion Reactor Activated',
    'Clean fusion energy became commercially viable.',
    'In 2042, engineers activated the first commercially viable fusion power plant.',
    '2026-02-07T10:00:00.000Z',
    '',
    '2042',
    3,
    5,
    'fusion.jpg',
    2,
    2,
    1
  ),
  (
    'AI Granted Legal Personhood',
    'Advanced AI systems gained limited legal status.',
    'In 2045, an international court recognized certain advanced artificial intelligence systems as legal entities.',
    '',
    '',
    '2045',
    1,
    4,
    'lawyer.jpg',
    3,
    2,
    1
  ),
  (
    'Global Climate Accord of 2030',
    'Nations signed binding emissions reductions targets.',
    'In 2030, world leaders agreed to strict environmental targets to combat climate change.',
    '',
    '',
    '2030',
    1,
    4,
    'climate.jpg',
    4,
    2,
    1
  ),
  (
    'Quantum Internet Goes Live',
    'Secure quantum communications network launches globally.',
    'In 2035, the first global quantum internet infrastructure became operational.',
    '2026-02-04T09:00:00.000Z',
    '',
    '2065',
    2,
    5,
    'internet.jpg',
    1,
    2,
    1
  ),
  (
    'Pacific Trade Alliance Formed',
    'Nations created a sweeping economic pact.',
    'In 2032, Pacific nations signed a comprehensive economic cooperation agreement.',
    '2026-02-03T08:30:00.000Z',
    '2026-02-04T07:30:00.000Z',
    '2032',
    4,
    4,
    'pacific_map.jpg',
    2,
    2,
    1
  ),
  (
    'Global Digital Currency Adopted',
    'Central banks unified under a shared digital reserve.',
    'In 2038, major economies adopted a shared digital settlement currency.',
    '',
    '',
    '2038',
    1,
    4,
    'currency.jpg',
    3,
    2,
    1
  ),
  (
    'First Asteroid Mining Operation Begins',
    'Commercial extraction of asteroid minerals starts.',
    'In 2050, a private consortium began extracting rare minerals from a near-Earth asteroid.',
    '2026-02-01T08:30:00.000Z',
    '',
    '2050',
    2,
    5,
    'asteroid.jpg',
    4,
    2,
    1
  );
`;
