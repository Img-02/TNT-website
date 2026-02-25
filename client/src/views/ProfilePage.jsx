import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"

    // user_first_name: "Colin",
    // user_surname: "Idk",
    // user_username: "Colin300",
    // user_password: "Colin",
    // user_email: "Colin",
    // user_profile_pic: "/article-images/colin.png",
    // user_journalists: ["Imogen", "Gabriel", "Chids", "Natalia"]


export function ProfilePage() {

    
    const [user, setUser] = useState([])
    const { id }  = useParams()
      
    useEffect(() => {
        async function userFunction () {
        try {

          const response = await fetch(`/api/user?userId=${id}`)
          console.log(response.body)

          if (!response.ok){
            throw new Error("API error")
          }
          
          const data = await response.json()
          
          setUser(data.user)


        } catch {
            console.log("Bombaclaat error in profile page (no user passed) ")
        }
    }
      
    userFunction()
    },[id])

    return (
        <Container className="d-flex-column g-4 justify-content-center mb-3">
        {/* profile component */}
            <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="d-flex justify-content-center mb-3">
            <Col className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={user.user_profile_pic_path} />
                <Card.Body>
                    <Card.Title>{user.user_first_name} {user.user_surname}</Card.Title>
                    <Card.Text>{user.user_username}</Card.Text>
                    <Card.Text>{user.user_email}</Card.Text>
                </Card.Body>
                <Button variant="primary">Edit Profile</Button>
                <Button variant="primary">Change Password</Button>
            </Card>
            </Col>
            </Row>

        {/* followed journalists componenent */}
        <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="d-flex justify-content-center g-4">
            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Followed Journalists</Card.Title>
                        <Card.Text>Journalist would go here</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Followed Genres</Card.Title>
                    <Card.Text>Genres would go here</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Saved Articles</Card.Title>
                        <Card.Text>Saved articles would go here</Card.Text>
                    </Card.Body>
                </Card>
            </Col>               
        </Row>

        {/* followed genres component */}
        <Row>
        </Row>
        <Row>
        </Row>
        </Container>
        
        
    )
    
}
