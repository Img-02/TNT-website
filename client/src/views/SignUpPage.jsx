import { Container ,Button,Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function SignUpPage() {
    const navigate = useNavigate()

    const [showValidationText, setShowValidationText] = useState(false)
    const [form_Data, set_Form_Data] = useState({
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: ""
	});

    const submitForm = (event) => {
        event.preventDefault()
        //event.stopPropagation()

        console.log(form_Data)

        console.log("form submitted")
        const form = event.currentTarget

        if(form.checkValidity() === true) {
            console.log("form is valid")
        }
        else {
            console.log("form is invalid")
        }

        setShowValidationText(true)
    }

    const onFormChange = (event) => {
        console.log(event.target)
		const { name, value } = event.target;

        console.log(name, value)

		set_Form_Data({
			...form_Data,
			[name]: value,
		});
	};

    const validPassword = (pwd) => {

        // these evaluate to true or falce
        const length = pwd.length >= 8;

        // checks that password has uppercase
        const upper = /[A-Z]/.test(pwd);

        // checks that password has lowercase
        const lower = /[a-z]/.test(pwd);

        // checks that password has number
        const number = /[0-9]/.test(pwd);

        // checks that password has a special character
        const special = /[!@#$%^&*]/.test(pwd);

        // only leaves true values in the array and returns the length
        const passed = [length, upper, lower, number, special].filter(Boolean).length;

        // returns true if all password requirements are met
        return passed === 5
    }

    return(
    
    <Container className="orbitron">
        <Button className="orbitron" variant="primary" onClick={() => navigate(-1)}>BACK</Button>
            <h1>Create Account</h1>
        <Form noValidate validated={showValidationText} onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label style={{ fontFamily: "orbitron"}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={form_Data.email} onChange={onFormChange} style={{ fontFamily: "anta"}} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                </Form.Control.Feedback>
                <Form.Text className="text-muted" style={{ fontFamily: "anta"}}>
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="first_name">
                <Form.Label style={{ fontFamily: "orbitron"}}>First Name</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter First Name" style={{ fontFamily: "anta"}} name="first_name" value={form_Data.first_name} onChange={onFormChange} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter your first name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
                <Form.Label style={{ fontFamily: "orbitron"}}>Last Name</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter Last Name" style={{ fontFamily: "anta"}} name="last_name" value={form_Data.last_name}  onChange={onFormChange} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter your last name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label style={{ fontFamily: "orbitron"}}>Username</Form.Label>
                <Form.Control type="text-muted" placeholder="Enter a Username" style={{ fontFamily: "anta"}} name="username" value={form_Data.username}  onChange={onFormChange} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label style={{ fontFamily: "orbitron"}} >Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" style={{ fontFamily: "anta"}} required minLength={8} value={form_Data.password} onChange={onFormChange} isInvalid={
                    showValidationText && 
                     !validPassword(form_Data.password)}/>
                <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirm_password">
                <Form.Label style={{ fontFamily: "orbitron"}} >Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="confirm_password" style={{ fontFamily: "anta"}} required value={form_Data.confirm_password} onChange={onFormChange} pattern={form_Data.password}  isInvalid={showValidationText && form_Data.confirm_password !== form_Data.password}/>
                <Form.Control.Feedback type="invalid">
                    Please enter a matching password.
                </Form.Control.Feedback>
            </Form.Group>

        
            <Link to="/login">Already have an account? Log in instead.</Link>
            <p></p>
  
            <Button variant="primary" type="submit">
            Submit
            </Button>
            
        </Form>
    </Container>
    )
}

                    // !/^(?=.{5,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/.test(form_Data.password) } />
