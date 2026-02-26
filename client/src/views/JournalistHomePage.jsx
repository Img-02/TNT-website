import { useParams } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom"
//import { articles } from "../mock-data/articles.js"
import  Table  from "react-bootstrap/Table"
import { Button } from "react-bootstrap"
import { useState, useEffect} from "react"
import { getJournalistArticles } from "../api.js"

export function JournalistHomePage() {
    //const articlesToSubmit = articles // This should come from database and only get articles that are written by the journalist
                                    
    const navigate = useNavigate()

    // const handleRowClick = (id) => {
    // navigate(`/journalistpage/${id}`); 
    // };

    const [journalistArticles, setJournalistArticles] = useState([])

    if(journalistArticles){

        console.log("from journalistArticles", journalistArticles)
    }


    const  id  = 1 ///this needs to be changed to use params
        useEffect(() => {
            async function journalistArticlesFunction () {
                try {
                    const articles = await getJournalistArticles(id)
                    console.log("loaded articles", articles)
                    setJournalistArticles(articles)
                    // console.log(id)

                    // const response = await fetch(`/api/journalist-articles?article_journalist_id=${id}`)
                    
                    // console.log(response)
                        
                    // if (!response.ok){
                    // throw new Error("API error")
                    // }
                    
                    // const data = await response.json()

                    // console.log("from api response", data)
                    
                    // setJournalistArticles(data.articles)

                } catch (error) {
                    console.log("AGAHHAHHAHAHA error in journalist page")
                    console.log(error)
                }
        }
          
        journalistArticlesFunction()

        },[])

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
        <p></p>
        <Button className="orbitron" variant="secondary" onClick={() => navigate('/journalistpage')}>CREATE NEW ARTICLE</Button>
        <p></p>
        <Table>
            <thead>
                <tr>
                    <th> Article ID </th>
                    <th> Status </th>
                    <th> Article Title </th>
                    <th> Historical Date </th>
                    <th> Date Submitted</th>
                </tr>
            </thead> 
            <tbody>
                    {journalistArticles && journalistArticles.map(article => (
                        <tr key={article.article_id} onClick={() => article.article_status_id===1 && navigate(`/journalistpage/${article.article_id}`)} style={{cursor:"pointer"}}>
                            <td>{article.article_id}</td>
                            {/* TODO: make sure to retunr the actual status and not the status id */}
                            <td>{getStatus(article.article_status_id)}</td>
                            <td>{article.article_title}</td>
                            <td>{article.article_historical_date}</td> 
                            <td>{article.article_submitted_at}</td>
                        </tr>
                    ))}
                    
                
                {/* <tr>s
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> */}
            </tbody>
        </Table>
        </div>
    )}


