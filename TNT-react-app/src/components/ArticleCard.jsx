import {Card} from "react-bootstrap"
import { BreakingNewsCard } from "./BreakingNewsCard"


export function ArticleCard({ article }) {
    console.log(article.title)
    console.log("Hello from article card")
    return (
    // <Row xs={3} md={5} className="g-1">
    // <Col key={props.article.id}
        <Card>
            <Card.Body>
                {article.isBreaking ? (
                    <BreakingNewsCard article={article}/>
                ) : (
                    <div>
                    <Card.Img variant="top" src={article.image}/>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text >{article.summary}</Card.Text>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}
    
