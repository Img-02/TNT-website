import { useParams } from "react-router-dom";
import { articles } from "../mock-data/articles.js";
import { useNavigate } from "react-router-dom";
import { Container ,Button } from "react-bootstrap";

export function ArticlePage() {
    
    const { id } = useParams();
    const navigate = useNavigate()

    const article = articles.find(article => article.id === Number(id))
    

    return (
        <div>
            <Button className="orbitron" variant="outline-light" onClick={() => navigate(-1)}>Go Back</Button>
            
            <Container style={{fontFamily: "orbitron", background:"#f3f3f3", marginTop: "2em"}}>
            <div>
            <p></p>
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

// style={{height: "300px", width: "400px", objectFit: "cover"}}

            // <Card.Body>
            //     <div>
            //         <div className="text-center">
            //         <Card.Img alt="..." className="img-thumbnail" style={{height: "300px", width: "400px", objectFit: "cover", font: "ubuntu"}} variant="top" src={article.image}/>
            //         </div>
            //         <Card.Title>{article.title}</Card.Title>
            //         <div className="">
            //         <Card.Text className="text-wrap " style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden",}}>{article.summary}</Card.Text>

            //         </div>
            //     </div>
                
            // </Card.Body>

