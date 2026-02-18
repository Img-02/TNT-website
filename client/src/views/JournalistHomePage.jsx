import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { articles } from "../mock-data/articles.js"
import  Table  from "react-bootstrap/Table"
import { Button } from "react-bootstrap";

export function JournalistHomePage() {
    const articlesToSubmit = articles // This should come from database and only get articles that are written by the journalist
                                    
    const navigate = useNavigate()

    // const handleRowClick = (id) => {
    // navigate(`/journalistpage/${id}`); 
    // };

    return (
        <div>
        <p></p>
        <Button className="orbitron" variant="secondary" onClick={() => navigate('/journalistpage')}>CREATE NEW ARTICLE</Button>
        <p></p>
        <Table>
            <thead>
                <tr>
                    <th>Article ID</th>
                    <th>Status</th>
                    <th>Article Title</th>
                    <th>Date submitted</th>
                </tr>
            </thead> 
            <tbody>
                {articlesToSubmit.map(article => (
                    <tr key={article.id} onClick={() => navigate(`/journalistpage/${article.id}`)} style={{cursor:"pointer"}}>
                        <td>{article.id}</td>
                        {/* TODO: make sure to retunr the actual status and not the status id */}
                        <td>{article.status}</td>
                        <td>{article.title}</td>
                        <td>{article.submittedAt}</td>
                    </tr>
                ))}
                {/* <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> */}
            </tbody>
        </Table>
        </div>
    )
}
