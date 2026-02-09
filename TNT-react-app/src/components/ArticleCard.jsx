import {Card} from "react-bootstrap"


export function ArticleCard({ article }) {
    
    return (
    // <Row xs={3} md={5} className="g-1">
    // <Col key={props.article.id}
        <Card className="g-4 h-100"  style={{borderColor:'#D2B79A', borderWidth: '2px'}}>
            <Card.Body>
                <div>
                    <div className="text-center">
                    <Card.Img alt="..." className="img-thumbnail" style={{height: "300px", width: "400px", objectFit: "cover"}} variant="top" src={article.image}/>
                    </div>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text >{article.summary}</Card.Text>
                </div>
                
            </Card.Body>
        </Card>
    )
}
    



//class = "img-fluid"
//.img-fluid. max-width: 100%

//`${article.image}/171x180`
