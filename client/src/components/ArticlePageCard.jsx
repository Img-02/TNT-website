import { useParams } from "react-router-dom";
import { articles } from "../mock-data/articles.js";
import { Container} from "react-bootstrap";


export function ArticlePageCard({ article }) {

    return (
        <div>            
            <Container style={{fontFamily: "orbitron", background:"#f3f3f3", marginTop: "2em"}}>
            <div>
            <p>
            </p>
            <h2 className="text-center" style={{fontFamily: "orbitron", marginBottom: "1em"}}>{article.title}</h2>
                <div>
                <img src={article.image} className="img-thumbnail mx-auto d-block " style={{height: "400px", objectFit: "contain", marginBottom: "2em"}} />
                </div>
            <h4 style={{fontFamily: "anta"}}>{article.summary}</h4>
            <p style={{fontFamily: "anta"}}>{article.text}</p>
            </div>
            </Container>
        </div>

    )

}
