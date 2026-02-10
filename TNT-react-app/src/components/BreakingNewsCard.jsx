import { Card } from "react-bootstrap"

export function BreakingNewsCard({ article }) {
        return(
        <Card  className="border-5 h-100" style={{borderColor:'#ED5013', borderWidth: '2px'}}>
            <h1>BREAKING</h1>
            <Card.Body>
                <Card.Img alt="..." className="img-thumbnail" style={{width: "100%", height: "350px", objectFit: "cover"}} variant="top" src={article.image}/>
                <Card.Title className="fw-bold" style={{color:'#ED5013'}}>{article.title}</Card.Title>
                <Card.Text className="text-secondary small">{article.summary}</Card.Text>
                {/* <Card.Text className="text-muted">{article.publishedAt}</Card.Text> */}
            </Card.Body>
        </Card>
)}
