export function BreakingNewsCard({ articles }) {

    return (
        <div id="breaking-news">
            <ul>
            {
            articles.map(article => (
                <li>Breaking: {article.title}</li>
            ))
            }
            </ul>
        </div>
    )


}
