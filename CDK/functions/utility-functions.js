export const getArticleHandler = async (event, context) => {
    console.log('getArticleHandler invoked')  
    console.log(event)
    console.log(context)

    const articleId = event.articleId || event.queryStringParameters?.articleId || event.pathParameters?.articleId || 'NOT_SET'
    console.log(`PARAMS: articleId = ${articleId}`)

  if(articleId === "NOT_SET") {
    return {
        statusCode: 404,
        body: JSON.stringify({
            status: "error",
            message: "Missing article ID",
        })
    }
  } else {
    return{
        statusCode: 200,
        body: JSON.stringify({
        status: 'ok',
        article: {
            article_id: articleId,
            article_title: 'Cannon discovered in Derbyshire Field. Peasants deny all knowledge', 
            article_summary: 'A Middle Ages cannon was discovered in the Derbyshire Dales District', 
            article_text: 'More text about our very interesting first article', 
            article_submitted_at:'2026-02-02T14:35:12.345Z', 
            aricle_publishead_at: '2026-02-02T14:35:12.345Z',
            article_historical_date: 1500,
            article_status_id: 4,
            article_rating: 0,
            article_image_path: "article-images/article1.jpg",
            article_journalist_id: 1,
            article_editor_id: 2
            }
        })

    }
  }
  
}


