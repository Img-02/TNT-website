import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
//import { articles } from "../mock-data/articles.js"
import  Table  from "react-bootstrap/Table"
import { Button } from "react-bootstrap";

import { useEffect, useState } from "react"
import { getEditorArticles } from "../api.js";

export function EditorHomePage() {
    const [editorArticles, setEditorArticles]=useState([])
    
    

    //const articlesToSubmit = articles // This should come from database and only get articles that are waiting for review
                                    // which we get from their status (2 is in review)
    // handleOnClick = (articleid) => {
    //   return <EditorPage
    //   to={{
    //     pathname: "/editorpage",
    //     foo: articleid
        
    //   }}
    // />
    // }
    
    useEffect(() => {
        const getArticles = async () => {
            try {
                const articles = await getEditorArticles();
                console.log(articles)

                if(articles){
                    setEditorArticles(articles)
                }

            }catch(error) {
                console.log(error)
            }
        }

        getArticles()

    }, [])
    
    const navigate = useNavigate()

    const handleRowClick = (id) => {
    navigate(`/editorpage/${id}`); 
    }

    function getStatus(statID) {
        if (statID === 1){
            return "Writing"
        }else if(statID=== 2){
            return "Submitted for review"
        }else if(statID===3){
            return "Rejected"
        }else if(statID===4){
            return "Published"
        }else {
            return "No status found"
        }
    }

    return (
        <div>
        <Table>
            <thead>
                <tr>
                    <th>Article ID</th>
                    <th>Status</th>
                    <th>Article Title</th>
                    <th>Submitted at</th>
                    <th>Published at Title</th>
                </tr>
            </thead> 
            <tbody>
                {editorArticles.map(article => (
                    <tr key={article.article_id} onClick={() => handleRowClick(article.article_id)} style={{cursor:"pointer"}}>
                        <td>{article.article_id}</td>
                        {/* TODO: make sure to retunr the actual status and not the status id */}
                        <td>{getStatus(article.article_status_id)}</td>
                        <td>{article.article_title}</td>
                        <td>{article.article_submitted_at}</td>
                        <td>{article.article_published_at}</td>
                    </tr>
                ))}

            </tbody>
        </Table>
        </div>
    )
}

            // {breakingArticles.map(article => (
            // <Col key={article.id}><BreakingNewsCard article={article}/></Col>
            // ))}
