export function ArticleCard({ article }) {

    return (
    <div className="article-card">
        <img src={article.image}/>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
    </div>)


}
