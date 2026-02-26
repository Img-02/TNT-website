import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../api.js"


    // user_first_name: "Colin",
    // user_surname: "Idk",
    // user_username: "Colin300",
    // user_password: "Colin",
    // user_email: "Colin",
    // user_profile_pic: "/article-images/colin.png",
    // user_journalists: ["Imogen", "Gabriel", "Chids", "Natalia"]


export function ProfilePage() {

   // const userRef = useRef(null)
    const [ user, setUser ] = useState([])
    const navigate = useNavigate()
   // const [ updateUser, setUpdateUser ] = useState([])
    const id = 1
    
    useEffect(() => {
        async function userFunction (id) {

        try {
          const user = await getUserProfile(id)
          console.log(id)
          console.log("loaded user", user)

            // if (userRef.current) {
            //     userRef.current.setContent(user.user_username)
            // }


          setUser(user)

        } catch {
            console.log("Bombaclaat error in profile page (no user passed) ")
        }
    }
    if (id) {
        userFunction(id)
    }


    },[id])

    return (
        <Container className="d-flex-column g-4 justify-content-center mb-3">
        {/* profile component */}
            <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="d-flex justify-content-center mb-3">
            <Col className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Firstname: {user.user_first_name} Surname: {user.user_surname}</Card.Title>
                    <Card.Text>Username: {user.user_username}</Card.Text>
                    <Card.Text>Email Address: {user.user_email}</Card.Text>
                </Card.Body>
                <Button key={user.user_id} onClick={() => navigate(`/profileEdit/${id}`)} style={{cursor:"pointer"}} variant="primary">Edit Profile</Button>
            </Card>
            </Col>
            </Row>

        {/* followed journalists componenent */}
        <Row xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'} className="d-flex justify-content-center g-4">
            <Col>
            {/* <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Followed Journalists</Card.Title>
                        <Card.Text>Journalist would go here</Card.Text>
                </Card.Body>
            </Card> */}
            </Col>

            {/* <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Followed Genres</Card.Title>
                    <Card.Text>Genres would go here</Card.Text>
                </Card.Body>
            </Card>
            </Col> */}

            {/* <Col>
            <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Saved Articles</Card.Title>
                        <Card.Text>Saved articles would go here</Card.Text>
                    </Card.Body>
                </Card>
            </Col>                */}
        </Row>

        {/* followed genres component */}
        {/* <Row>
        </Row>
        <Row>
        </Row> */}
        </Container>
        
        
    )
    
}

//  <Card.Img variant="top" src={user.user_profile_pic_path} />
