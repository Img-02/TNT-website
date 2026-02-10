import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useState } from "react"
import { hoverColour,breakingColour } from "../colours.js"


export function BreakingNewsCard({ article }) {

    const navigate = useNavigate();

    const [hover, setHover] = useState("")

    return (
        <Card className="border-5 h-100" style={{ borderColor: breakingColour, borderWidth: '2px', cursor: "pointer", background:hover, font: "orbitron" }} 
        onClick={() => navigate(`/article/${article.id}`)}
        onMouseEnter={() => setHover(hoverColour)} onMouseLeave={() => setHover("")}>
        


            <h1>BREAKING</h1>
            <Card.Body className="orbitron">
                <Card.Img alt="..." className="img-thumbnail" style={{ width: "100%", height: "350px", objectFit: "cover" }} variant="top" src={article.image} />
                <Card.Title className="fw-bold" style={{ color: breakingColour }}>{article.title}</Card.Title>
                <Card.Text className="text-secondary small">{article.summary}</Card.Text>
                {/* <Card.Text className="text-muted">{article.publishedAt}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}
