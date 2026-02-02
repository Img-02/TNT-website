import { ArticleCard } from "../components/ArticleCard.jsx"
import { BreakingNewsCard } from "../components/BreakingNewsCard.jsx"

import { useState, useEffect } from "react"

export function HomePage({ articles }) {
    const [breakingArticles, setBreakingArticles] = useState([])
    const [topTenArticles, setTopTenArticles] = useState([])
    const [nonBreakingArticles, setNonBreakingArticles] = useState([])

    let breakingNewsArticles = []
    breakingNewsArticles = articles.filter(article => article.isBreaking === true)




    useEffect(() => {
        // get breaking 
        // get top 10
        // get non breaking
        const breaking = articles.filter(article => article.isBreaking)
        const nonBreaking = articles.filter(article => !article.isBreaking)

        setBreakingArticles(breaking)
        setNonBreakingArticles(nonBreaking)

    }, [articles])

    return (
        // <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>
            <BreakingNewsCard articles={breakingArticles}></BreakingNewsCard>
            
            <div id="article-container">
                {nonBreakingArticles.map(article => (
                    <ArticleCard
                    key={article.id}
                    article={article}
                    ></ArticleCard>
                ))}

            </div>
        </div>
    )



}
