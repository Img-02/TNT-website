import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useState } from "react"
import { hoverColour, breakingColour } from "../colours.js"


export function BreakingNewsCard({article}) {

    const navigate = useNavigate();
    //background: `${hover ? hoverColour : ''}`}
    
    return (
        <Card className={`border-5 h-100 tnt-card`} style={{ borderColor: breakingColour, borderWidth: '2px', cursor: "pointer", fontFamily: "anta"}}
        onClick={() => navigate(`/article/${article.id}`)}

        // onMouseEnter={(hover) => {setHover(true)}}
        // onMouseLeave={(hover) => {setHover(false)}}

        // onMouseEnter={(hover) => {setHover(hoverColour)}}
        // onMouseLeave={(hover) => {setHover("")}}
        
        
        //setHover(hoverColour)} onMouseLeave={() => setHover("")}
        >
            <h1></h1>
            <Card.Body className="anta">
                <Card.Img alt="..." className="img-thumbnail" style={{ width: "100%", height: "350px", objectFit: "cover", fontFamily: "anta"}} variant="top" src={article.image} />
                <Card.Title className="fw-bold" style={{ color: breakingColour, fontFamily: "orbitron" }}>{article.title}</Card.Title>
                <Card.Text className="text-secondary small">{article.summary}</Card.Text>
                {/* <Card.Text className="text-muted">{article.publishedAt}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}
