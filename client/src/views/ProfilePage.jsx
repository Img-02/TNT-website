import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api.js";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("tntUser");

    // No session → send them to login
    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored || "{}");
    const userId = parsed?.id;

    if (!userId) {
      console.warn("tntUser missing id, sending to login");
      navigate("/login");
      return;
    }

    async function loadUser() {
      try {
        const profile = await getUserProfile(userId);
        console.log("loaded user", profile);
        setUser(profile);
      } catch (err) {
        console.error("Error loading profile", err);
      }
    }

    loadUser();
  }, [navigate]);

  if (!user) {
    return (
      <Container className="d-flex justify-content-centre mb-3">
        <p style={{ fontFamily: "orbitron", marginTop: "2rem" }}>
          Loading profile...
        </p>
      </Container>
    );
  }

  return (
    <Container className="d-flex-column g-4 justify-content-centre mb-3">
      {/* profile component */}
      <Row
        xs={"auto"}
        sm={"auto"}
        md={"auto"}
        lg={"auto"}
        xl={"auto"}
        className="d-flex justify-content-centre mb-3"
      >
        <Col className="d-flex justify-content-centre">
          <Card style={{ width: "18rem" }}>
            {/* If you later add profile images, uncomment this: */}
            {/* <Card.Img variant="top" src={user.user_profile_pic_path} /> */}
            <Card.Body>
              <Card.Title>
                Firstname: {user.user_first_name} Surname: {user.user_surname}
              </Card.Title>
              <Card.Text>Username: {user.user_username}</Card.Text>
              <Card.Text>Email Address: {user.user_email}</Card.Text>
            </Card.Body>
            <Button
              key={user.user_id}
              onClick={() => navigate(`/profileEdit/${user.user_id}`)}
              style={{ cursor: "pointer" }}
              variant="primary"
            >
              Edit Profile
            </Button>
          </Card>
        </Col>
      </Row>

      {/* followed journalists component – ready for later use */}
      <Row
        xs={"auto"}
        sm={"auto"}
        md={"auto"}
        lg={"auto"}
        xl={"auto"}
        className="d-flex justify-content-centre g-4"
      >
        <Col>{/* future widgets here */}</Col>
      </Row>
    </Container>
  );
}
