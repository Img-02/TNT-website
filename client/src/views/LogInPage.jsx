import { Container ,Button,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export function LogInPage() {

    const navigate = useNavigate()

    return(
        
    <Container className="orbitron">
        <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>BACK</Button>
            <h1>Log In To Your Account</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label style={{ fontFamily: "orbitron"}}>Username</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter a Username" style={{ fontFamily: "anta"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ fontFamily: "orbitron"}} >Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{ fontFamily: "anta"}} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
            Submit
            </Button>
            

        </Form>
    </Container>
    )
}
