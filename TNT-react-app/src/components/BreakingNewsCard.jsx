import { Card } from "react-bootstrap"

export function BreakingNewsCard({ article }) {
        return(
        <Card>
            <h1>BREAKING</h1>
            <Card.Body>
                <Card.Img variant="top" src={article.image}/>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text >{article.summary}</Card.Text>
            </Card.Body>
        </Card>
)}
