// Displays individual articles for editor to approve
//display current article to be approved 


import { useParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard.jsx"
import { BreakingNewsCard } from "../components/BreakingNewsCard.jsx";
import { useNavigate } from "react-router-dom";
//import { articles } from "../mock-data/articles.js"
import { ArticlePageCard } from "../components/ArticlePageCard.jsx";
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { getArticle } from "../api.js"

export function EditorPage() {

    const { id }  = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState()


    useEffect(() => {
        const loadArticle = async(id) => {
            try {
            const article = await getArticle(id)

            console.log("loaded article", article)

            if (article) {
                setArticle(article)
            }

            }catch(error) {
                console.log(error)
            }
        }

        if (Number(id)) {
            loadArticle(id)
        }

    }, [id])

    return (
        // Source - https://stackoverflow.com/a/66395583
// Posted by codemonkey
// Retrieved 2026-02-17, License - CC BY-SA 4.0

    <div className="orbitron">
    <h1> Welcome, INSERT NAME to editor page</h1>
        <p></p>
        
        {
            article &&  (
                <>
                    <h3>Preview Article:</h3>
                    <ArticlePageCard article={article}/>
                    
                    <p></p>
                    
                    <h3>Preview Article Thumbnail:</h3>
                    <ArticleCard article = {article}/>
                    

                    <h3>Preview Breaking News Article Thumbnail:</h3>
                    <BreakingNewsCard article = {article}/>

                    <p></p>

                    <Form>
                        <Form.Group>
                            <Form.Label style={{ fontFamily: "orbitron" }}>Comments:</Form.Label>
                            <textarea className="form-control" type="text-muted" placeholder="Enter feedback to journalist" rows={4} style={{ fontFamily: "anta" }} />
                        </Form.Group>
                    </Form>

                    <p></p>
                    
                    <div className="d-flex gap-2">
                        <Button className="orbitron" variant="secondary" onClick={() => navigate(`/editor-writing?id=${article.article_id}`)}>MANUALLY EDIT</Button>
                        <Button className="orbitron" variant="primary">SUBMIT FOR RE-WRITE</Button>
                        <Button className="orbitron" variant="danger">REJECT</Button>
                        <Button className="orbitron" variant="warning">PUBLISH TO SITE</Button>
                    </div>

                </>

            )
        }
        <p></p>
                
    </div>
    )
}
