import { ArticleCard } from "../components/ArticleCard.jsx"
import { BreakingNewsCard } from "../components/BreakingNewsCard.jsx"
import { useState, useEffect } from "react"
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap"
import { backgroundColour, breakingColour } from "../colours.js"
import { Marquee } from "react-fast-marquee";

import { getMainPageArticles } from "../api.js"


export function HomePage({ articles }) {
    const [breakingArticles, setBreakingArticles] = useState([])
    const [nonBreakingArticles, setNonBreakingArticles] = useState([])
    const [hover, setHover] = useState(false)

    useEffect(() => {
        // first order the articles by their date
        if(articles){
            const sortedArticles = articles.sort((article1, article2) => {
                return new Date(article2.article_published_at) - new Date(article1.article_published_at)
            })

            const breaking = sortedArticles.slice(0, 2)
            //const breaking = articles.filter(article => article.isBreaking)
            const nonBreaking = sortedArticles.slice(2, sortedArticles.length)
            setBreakingArticles(breaking)
            setNonBreakingArticles(nonBreaking)
        }

    }, [articles])

    return (
        <div>
        {/* <Navbar className="justify-content-center" style={{backgroundColor:backgroundColour}}>
            <Container className="orbitron">
                <Navbar.Collapse>
                <Nav className="mx-auto">
                <Nav.Link href="##">History</Nav.Link>
                <Nav.Link href="##">Geography</Nav.Link>
                <Nav.Link href="##">Music</Nav.Link>
                <Nav.Link href="##">Polictical Events</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>   
        </Navbar> */}

        <marquee>
            <div className="d-flex gap-4" style={{fontFamily: "orbitron"}}>
            <h1 className="me-3 fw-bold">Breaking News:</h1>
            {breakingArticles.map(article => (
                <div key={article.article_id} className="d-flex align-items-center">
                    <h2 className="mb-0">{article.article_title}</h2>
                    </div>
            ))}
            </div>
        </marquee>

        <p></p>

        <Container className="orbitron">
        {/* hold the breaking news articles */}
        <div>
            <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="g-4 mb-5 justify-content-center">
                {breakingArticles.map(article => (
                <Col key={article.article_id}><BreakingNewsCard article={article}/></Col>
                ))}
            </Row>
        </div>
        
        <div>
            <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="mx-auto gx-4 justify-content-center">
                {nonBreakingArticles.map((article) => (
                <Col key={article.artile_id}><ArticleCard article={article}/></Col>
                ))}
            </Row>
        </div>
        </Container>
        </div>
    )
}
