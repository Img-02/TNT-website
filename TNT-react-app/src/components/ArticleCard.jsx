import {Card} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { hoverColour } from "../colours"


export function ArticleCard({ article }) {
    const navigate = useNavigate()
    

    return (
    // <Row xs={3} md={5} className="g-1">
    // <Col key={props.article.id}
        <Card className="g-4"  
        style={{borderColor:'#D2B79A', borderWidth: '2px',cursor: "pointer", height: "600px"}}
        onClick={() => navigate(`/article/${article.id}`)}
        //onMouseEnter={() => setHover(hoverColour)} onMouseLeave={() => setHover("")}
        >
            <Card.Body>
                <div>
                    <div className="text-center">
                    <Card.Img alt="..." className="img-thumbnail" style={{height: "300px", width: "400px", objectFit: "cover"}} variant="top" src={article.image}/>
                    </div>
                    <Card.Title>{article.title}</Card.Title>
                    <div className="">
                    <Card.Text className="text-wrap">{article.summary}</Card.Text>
                    </div>
                </div>
                
            </Card.Body>
        </Card>
    )
}
    



//class = "img-fluid"
//.img-fluid. max-width: 100%

//`${article.image}/171x180`
