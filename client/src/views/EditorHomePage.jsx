import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { articles } from "../mock-data/articles.js"
import  Table  from "react-bootstrap/Table"
import { Button } from "react-bootstrap";

export function EditorHomePage() {
    const articlesToSubmit = articles // This should come from database and only get articles that are waiting for review
                                    // which we get from their status (2 is in review)
                                    
    // handleOnClick = (articleid) => {
    //   return <EditorPage
    //   to={{
    //     pathname: "/editorpage",
    //     foo: articleid
        
    //   }}
    // />
    // }
    const navigate = useNavigate()

    const handleRowClick = (id) => {
    navigate(`/editorpage/${id}`); 
    }

    return (
        <div>
        <Table>
            <thead>
                <tr>
                    <th>Article ID</th>
                    <th>Status</th>
                    <th>Article Title</th>
                </tr>
            </thead> 
            <tbody>
                {articlesToSubmit.map(article => (
                    <tr key={article.id} onClick={() => handleRowClick(article.id)} style={{cursor:"pointer"}}>
                        <td>{article.id}</td>
                        {/* TODO: make sure to retunr the actual status and not the status id */}
                        <td>{article.status}</td>
                        <td>{article.title}</td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}

            // {breakingArticles.map(article => (
            // <Col key={article.id}><BreakingNewsCard article={article}/></Col>
            // ))}
