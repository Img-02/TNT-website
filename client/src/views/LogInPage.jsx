import { Container ,Button,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { Link } from "react-router-dom";


// exports.handler = (event, context, callback) => {
//     var returnobj = {
//         "statusCode": 200,
//         "headers": {
//             "Content-Type": "application/json", "access-control-allow-origin": "*", 
//             "Set-Cookie": "testcook=testval; path=/; domain=xxxxxxxxxx.execute-api.us-east-1.amazonaws.com; secure; HttpOnly"
//         }, 
//         "body": JSON.stringify({})
//     };
//     console.log("headers", event.headers.Cookie);
//     callback(null, returnobj);
// };





export function LogInPage() {

    const navigate = useNavigate()

    const [showValidationText, setShowValidationText] = useState(false)

    const loginSubmit = (event) => {
        event.preventDefault();
        //event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            // form fields valid here

        }

        setShowValidationText(true);
  };

    return(
        
    <Container className="orbitron">
        <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>BACK</Button>
            <h1>Log In To Your Account</h1>
        <Form noValidate validated={showValidationText} onSubmit={loginSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label style={{ fontFamily: "orbitron"}}>Username</Form.Label>
                <Form.Control required type="text-muted" placeholder="Enter a Username" style={{ fontFamily: "anta"}} />
                <Form.Control.Feedback type="invalid">Please enter your username.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label style={{ fontFamily: "orbitron"}} >Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" style={{ fontFamily: "anta"}}/>
                <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
            </Form.Group>

            <Link to="/signup">Don't have an account? Sign up instead.</Link>

            <p></p>
            
            <Button variant="primary" type="submit">
            Submit
            </Button>
            

        </Form>
    </Container>
    )
}
