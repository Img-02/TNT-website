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
import { getArticle, updateArticle } from "../api.js"

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

    const publishToSite = async () => {
        if(article) {
            try {
                const newArticle = {
                    ...article,
                    article_status_id: 4,
                    article_published_at: new Date(Date.now()).toISOString()
                }

                const article_id = updateArticle(newArticle)
                alert(`Article has been published to site.`)


            }catch(error) {
                console.error(String(error))
                alert(`Failed to publish article. `)
            }
        }
    }

    const rejectArticle = async () => {
        if(article) {
            try {
                const newArticle = {
                    ...article,
                    article_status_id: 3,
                }

                const article_id = updateArticle(newArticle)
                alert(`Article has been rejected`)


            }catch(error) {
                console.error(String(error))
                alert(`Failed to reject article. `)
            }
        }
    }

    const rewriteArticle = async () => {
        if(article) {
            try {
                const newArticle = {
                    ...article,
                    article_status_id: 1,
                }

                const article_id = updateArticle(newArticle)
                alert(`Article has been sent for rewrite`)


            }catch(error) {
                console.error(String(error))
                alert(`Failed to send article to rewrite. `)
            }
        }
    }

    return (
        // Source - https://stackoverflow.com/a/66395583
// Posted by codemonkey
// Retrieved 2026-02-17, License - CC BY-SA 4.0

    <div className="orbitron">
    <h1> Welcome, to the editor page</h1>
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

                    {/* <Form>
                        <Form.Group>
                            <Form.Label style={{ fontFamily: "orbitron" }}>Comments:</Form.Label>
                            <textarea className="form-control" type="text-muted" placeholder="Enter feedback to journalist" rows={4} style={{ fontFamily: "anta" }} />
                        </Form.Group>
                    </Form> */}

                    <p></p>

                    
                    <div className="d-flex gap-2">
                        <Button className="orbitron" variant="secondary" onClick={() => navigate(`/editor-writing/${article.article_id}`)}>MANUALLY EDIT</Button>
                        <Button className="orbitron" variant="primary" onClick={rewriteArticle}>SUBMIT FOR RE-WRITE</Button>
                        <Button className="orbitron" variant="danger" onClick={rejectArticle}>REJECT</Button>
                        <Button className="orbitron" variant="warning" onClick={publishToSite}>PUBLISH TO SITE</Button>
                    </div>

                </>

            )
        }
        <p></p>
                
    </div>
    )
}
