import { Container ,Button,Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function SignUpPage() {
    const navigate = useNavigate()
    return(
    
    <Container className="orbitron">
        <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>BACK</Button>
            <h1>Create Account</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontFamily: "orbitron"}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" style={{ fontFamily: "anta"}} />
                <Form.Text className="text-muted" style={{ fontFamily: "anta"}}>
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label style={{ fontFamily: "orbitron"}}>First Name</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter First Name" style={{ fontFamily: "anta"}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label style={{ fontFamily: "orbitron"}}>Last Name</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter Last Name" style={{ fontFamily: "anta"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label style={{ fontFamily: "orbitron"}}>Username</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter a Username" style={{ fontFamily: "anta"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ fontFamily: "orbitron"}} >Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{ fontFamily: "anta"}} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ fontFamily: "orbitron"}} >Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{ fontFamily: "anta"}} />
            </Form.Group>

            <Link to="/login">Already have an account? Sign in instead</Link>
            <p></p>
  
            <Button variant="primary" type="submit">
            Submit
            </Button>
            

        </Form>
    </Container>
    )
}
