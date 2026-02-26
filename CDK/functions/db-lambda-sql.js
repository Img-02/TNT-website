///////// SQL statements for Lambdas ////////////////////
// -----------  /ᐠ - ˕ -マ --------------- //

export const sql_getMainPageHandler_1 = `
SELECT article_id, article_title, article_image_path, article_summary, article_published_at FROM articles
WHERE article_status_id = 4
ORDER BY article_published_at
LIMIT 20;
`

export const sql_getJournalistArticleHandler_2 = `
SELECT article_id, article_title, article_submitted_at, article_status_id, article_historical_date 
FROM articles
WHERE article_journalist_id = :article_journalist_id
ORDER BY article_status_id;
`

export const sql_postLoginHandler_3 = `
SELECT user_username, user_id, user_password, user_role_id
FROM users
WHERE user_username = :username;
`

export const sql_getUserHandler_4 = `
SELECT * FROM users
WHERE user_id = :userId;
`

export const sql_postUserHandler_5 =`
INSERT INTO users (user_username, user_first_name, user_surname, user_email, user_password, user_role_id)
VALUES (:user_username, :user_first_name, :user_surname,:user_email,:user_password,:user_role_id)
RETURNING user_id;
`

export const sql_putUserHandler_6 =`
UPDATE users 
SET user_username = :user_username, user_first_name = :user_first_name, user_surname = :user_surname, user_email = :user_email, user_password = :user_password, user_role_id = :user_role_id
WHERE user_id = :userId
RETURNING user_id;
`
export const sql_getArticleHandler_7 = `
SELECT * FROM articles WHERE article_id = :articleId;
`

export const sql_postArticleHandler_8 = `
INSERT INTO articles (article_title, article_summary, article_text, article_submitted_at, article_published_at, article_historical_date,article_status_id, article_rating, article_image_path, article_journalist_id, article_editor_id,article_draft_number)
VALUES (:article_title,:article_summary,:article_text,:article_submitted_at,:article_published_at,:article_historical_date,:article_status_id,:article_rating,:article_image_path,:article_journalist_id, :article_editor_id, :article_draft_number)
RETURNING article_id;
` 
export const sql_putArticleHandler_9 = `
UPDATE articles SET article_title= :article_title , article_summary= :article_summary , article_text= :article_text , article_submitted_at= :article_submitted_at , article_published_at= :article_published_at , article_historical_date= :article_historical_date , article_status_id= :article_status_id, article_rating= :article_rating, article_image_path= article_journalist_id= :article_journalist_id, article_editor_id= :article_editor_id, article_draft_number = :article_draft_number 
WHERE article_id = :articleId 
RETURNING article_id;
`

