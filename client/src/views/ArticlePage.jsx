import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Container, Button } from "react-bootstrap"
import { ArticlePageCard } from "../components/ArticlePageCard.jsx"
import { useEffect, useState } from "react"
import { getArticle } from "../api.js"



export function ArticlePage() {

    const [article, setArticle] = useState()

    const { id } = useParams()

    useEffect(() => {
        async function loadArticle(id) {
            try {
                const article = await getArticle(id)

                console.log("from article page", article)
                setArticle(article)

            } catch {
                console.log("Brooooo error in article page ")
            }
        }

        if (id) {
            loadArticle(id)
        }
    }, [id])



    const navigate = useNavigate()


    return (
        <div>
            <Button className="orbitron" variant="outline-light" onClick={() => navigate(-1)}>Go Back</Button>
            {article && (<ArticlePageCard article={article} />)}
        </div>

    )

}

{/* 
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
                
            // </Card.Body> */}

