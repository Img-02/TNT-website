import { ArticleCard } from "../components/ArticleCard.jsx"
import { BreakingNewsCard } from "../components/BreakingNewsCard.jsx"
import { useState, useEffect } from "react"
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap"
import { backgroundColour } from "../colours.js"

export function HomePage({ articles }) {
    const [breakingArticles, setBreakingArticles] = useState([])
    const [nonBreakingArticles, setNonBreakingArticles] = useState([])

    useEffect(() => {
        const breaking = articles.filter(article => article.isBreaking)
        const nonBreaking = articles.filter(article => !article.isBreaking)

        setBreakingArticles(breaking)
        setNonBreakingArticles(nonBreaking)

    }, [articles])

    return (
        <div>
        <Navbar className="justify-content-center" style={{backgroundColor:backgroundColour}}>
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
        </Navbar>

        

        <Container className="orbitron">
        {/* hold the breaking news articles */}
        <div>
            <Row xs={1} md={2} className="g-4 mb-5">
            {breakingArticles.map(article => (
            <Col key={article.id}><BreakingNewsCard article={article}/></Col>
            ))}
            </Row>
        </div>
        <div>
        <Row xs={2} md={4} className="gx-4">
            {nonBreakingArticles.map((article) => (
            <Col key={article.id}><ArticleCard article={article}/></Col>
        ))}
        </Row>
        </div>
        </Container>

        </div>
    )



}
