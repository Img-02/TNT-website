import {Card} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { hoverColour } from "../colours"

const imgBasePath = import.meta.env.VITE_ARTICLE_IMAGES_DOMAIN

export function ArticleCard({ article }) {
    const navigate = useNavigate()

    return (
        <Card className="mb-4 tnt-card"  
        style={{borderColor:'#D2B79A', borderWidth: '2px',cursor: "pointer", height: "450px", width: "300px",  fontFamily: "anta"}}
        onClick={() => navigate(`/article/${article.article_id}`)}
        >
        
            <Card.Body>
                <div>
                    <div className="text-center">
                    <Card.Img alt="..." src={`${imgBasePath}/${article.article_image_path}`} className="img-thumbnail" style={{height: "300px", width: "400px", objectFit: "cover",  fontFamily: "anta"}} variant="top" />
                    </div>
                    <Card.Title style={{ fontFamily: "anta"}}>{article.article_title}</Card.Title>
                    <div className="">
                    </div>
                </div>
                
            </Card.Body>
        </Card>
    )
}
    

