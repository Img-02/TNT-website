import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useState } from "react"
import { hoverColour, breakingColour } from "../colours.js"

const imgBasePath = import.meta.env.VITE_ARTICLE_IMAGES_DOMAIN

export function BreakingNewsCard({article}) {

    const navigate = useNavigate()
    //background: `${hover ? hoverColour : ''}`}
    
    return (
        <Card className={`border-5 tnt-card`} style={{ borderColor: breakingColour, width:"500px", borderWidth: '2px', cursor: "pointer", fontFamily: "anta"}}
        onClick={() => navigate(`/article/${article.article_id}`)}

        // onMouseEnter={(hover) => {setHover(true)}}
        // onMouseLeave={(hover) => {setHover(false)}}

        // onMouseEnter={(hover) => {setHover(hoverColour)}}
        // onMouseLeave={(hover) => {setHover("")}}
        
        
        //setHover(hoverColour)} onMouseLeave={() => setHover("")}
        >
            <h1></h1>
            <Card.Body className="anta">
                <Card.Img src={`${imgBasePath}/${article.article_image_path}`} alt="..." className="img-thumbnail" style={{ width: "100%", height: "350px", objectFit: "cover", fontFamily: "anta"}} variant="top"  />
                <Card.Title className="fw-bold" style={{ color: breakingColour, fontFamily: "orbitron" }}>{article.article_title}</Card.Title>
                <Card.Text className="text-secondary small">{article.article_summary}</Card.Text>
                {/* <Card.Text className="text-muted">{article.publishedAt}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}
