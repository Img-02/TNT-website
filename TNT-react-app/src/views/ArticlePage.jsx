import { useParams } from "react-router-dom";
import { articles } from "../mock-data/articles.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export function ArticlePage() {
    
    const { id } = useParams();
    const navigate = useNavigate()

    const article = articles.find(article => article.id === Number(id))

    return (
        <div>
            <Button variant="outline-light" onClick={() => navigate(-1)}>Go Back</Button>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
        </div>

    )

}


