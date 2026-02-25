import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Container ,Button } from "react-bootstrap"
import { ArticlePageCard } from "../components/ArticlePageCard.jsx"
import { useEffect, useState } from "react"



export function ArticlePage() {

    const [article, setArticle] = useState([])
    
    const { id } = useParams()
      
    useEffect(() => {
        async function articleFunction () {
        try {

          const response = await fetch(`/api/article?articleId=${id}`)
          console.log(response.body)

          if (!response.ok){
            throw new Error("API error")
          }
          
          const data = await response.json()
          
          setArticle(data.article)


        } catch {
            console.log("Brooooo error in article page ")
        }
    }
      
    articleFunction()
    },[id])

    
    
    const navigate = useNavigate()

    
    return (
        <div>
            <Button className="orbitron" variant="outline-light" onClick={() => navigate(-1)}>Go Back</Button>
            <ArticlePageCard article={article}/>
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

