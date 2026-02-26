// sign up, login and update user api requests

async function loginUser(username, password) {
    const response = await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    })

    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    
    // this is an object that contains .user_username and .user_role

    return data.user
}

async function signUpUser(userData){
    const response = await fetch(`apui/user`, {
        method: "POST",
        body: JSON.stringify({
            user_mail: userData.email,
            user_password: userData.password,
            user_first_name: userData.first_name,
            user_surname: userData.user_username,
            user_username: userData.username

    //             const user_email = body.user_mail?.trim()?.toLowerCase();
    // const password = body.user_password;
    // const user_first_name = body.user_first_name?.trim();
    // const user_surname = body.user_surname?.trim();
    // const user_username = body.user_username?.trim().toLowerCase();

        })
    })


    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    // this is an object that contains .user_email (idk why we need this lol)
    return data.user
}

export async function updateUser(userData){
    const response = await fetch(`/api/user`, {
        method: "PUT",
        body: JSON.stringify({
            userId: userData.user_id,
            user_mail: userData.user_email,
            user_password: userData.user_password,
            user_first_name: userData.user_first_name,
            user_surname: userData.user_surname,
            user_username: userData.user_username,
            user_role_id: userData.user_role_id
        })
    })

    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    // returns the user id
    return data.user_id
}

export async function getUserProfile(userId){
    const response = await fetch(`/api/user?userId=${userId}`)

    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    // returns an object containing all the user details
    return data.user
}

// article api requests

export async function getMainPageArticles() {
    const response = await fetch(`/api/mainpage`)
    
    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    console.log(data)

    // returns a list of articles
    return data.articles

}

export async function getArticle(articleId) {
    const response = await fetch(`/api/article?articleId=${articleId}`)

    if(!response.ok){
        const { message } = await response.json()
        throw new Error(message)
    }

    const data = await response.json()

    console.log("from get article", data)

    // returns a article
    return data.article
}

export async function uploadArticle(article) {
    const response = await fetch(`/api/article`, {
        method: "POST",
        body: JSON.stringify({
            article_title: article.article_title,
            article_summary: article.article_summary,
            article_text: article.article_text,
            article_submitted_at: article.article_submitted_at,
            article_published_at: article.article_published_at,
            article_historical_date: article.article_historical_date,
            article_rating: Number(article.article_rating),
            article_image_path: article.article_image_path,
            article_status_id: Number(article.article_status_id),
            article_journalist_id: Number(article.article_journalist_id),
            article_editor_id: Number(article.article_editor_id),
            article_draft_number: Number(article.article_draft_number)
        })
    })

    if(!response.ok){
        const { message } = await response.json()
        throw new Error(message)
    }

    const data = await response.json()

    return data.article_id
}

export async function updateArticle(article) {

    const response = await fetch(`/api/article`, {
        method: "PUT",
        body: JSON.stringify({
            articleId: article.article_id,
            article_title: article.article_title,
            article_summary: article.article_summary,
            article_text: article.article_text,
            article_submitted_at: article.article_submitted_at,
            article_published_at: article.article_published_at,
            article_historical_date: article.article_historical_date,
            article_rating: Number(article.article_rating),
            article_image_path: article.article_image_path,
            article_status_id: Number(article.article_status_id),
            article_journalist_id: Number(article.article_journalist_id),
            article_editor_id: Number(article.article_editor_id),
            article_draft_number: Number(article.article_draft_number)
        })
    })

    if(!response.ok){
        const { message } = await response.json()
        throw new Error(message)
    }

    const data = await response.json()

    return data.article_id

}

export async function getJournalistArticles(journalistId) {

    const response = await fetch(`/api/journalist-articles?article_journalist_id=${journalistId}`)

    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    // returns a list of articles
    return data.articles
}

export async function getEditorArticles() {

    const response = await fetch(`/api/editor-articles`)

    if(!response.ok){
        const { message } = response.json()
        throw new Error(message)
    }

    const data = await response.json()

    // returns a list of articles
    return data.articles
}

// gabriel and chids
// uploads image to s3 bucket using presigned url then returns the filename
export async function imageUpload(imageBlob) {
    console.log("runnning image upload")
    const apiResponse = await fetch(`/api/image-upload`);

    console.log(apiResponse)
    const { uploadUrl } = await apiResponse.json(); 

    console.log(uploadUrl)

    const finalImageUrl = uploadUrl.split('?')[0];

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: imageBlob,
      headers: {
        "Content-Type": "image/jpeg" 
      }
    });

    if (uploadRes.ok) {
      console.log(" Image uploaded to S3.");
      console.log("Your file is located at:", finalImageUrl);

      // get the filename from the url to use for storing in db
      // then we can add the filename to the end of the s3 url in our env to load images
      const url = new URL(finalImageUrl)

      // the file name is after that last '/' in the url, 
      // .split('/') creates a list after seperating the string at every '/'
      // .pop() returns the last item in an array, giving the filename

      const fileName = url.pathname.split("/").pop()

      return fileName

    } else {
      console.log(`upload failed with status: ${uploadRes.status}`);
      throw new Error("Failed to upload image to S3")

    }
}






