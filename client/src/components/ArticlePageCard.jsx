import { useParams } from "react-router-dom";
// import { articles } from "../mock-data/articles.js";
import { Container} from "react-bootstrap";
import { useRef, useEffect } from "react"

const imgBasePath = import.meta.env.VITE_ARTICLE_IMAGES_DOMAIN

export function ArticlePageCard({ article }) {
    const contentRef = useRef(null)

    useEffect(() => {
        if(contentRef.current){
            contentRef.current.innerHTML = article.article_text
        }
            
        
    }, [contentRef])
    
    return (
        <div>            
            <Container style={{fontFamily: "orbitron", background:"#f3f3f3", marginTop: "2em"}}>
            <div>
            <p>
            </p>
            <h2 className="text-center" style={{fontFamily: "orbitron", marginBottom: "1em"}}>{article.article_title}</h2>
                <div>
                <img src={`${imgBasePath}/${article.article_image_path}`} className="img-thumbnail mx-auto d-block " style={{height: "400px", objectFit: "contain", marginBottom: "2em"}} />
                </div>
            <h4 style={{fontFamily: "anta"}}> Historical Date: {article.article_historical_date}</h4>    
            <h4 style={{fontFamily: "anta"}}>{article.article_summary}</h4>

            <div ref={contentRef}>
            </div>

            {/* <p style={{fontFamily: "anta"}}>{article.article_text}</p> */}
            </div>
            </Container>
        </div>

    )

}
