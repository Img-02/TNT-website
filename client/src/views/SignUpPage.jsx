import { Container, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export function SignUpPage() {
  const navigate = useNavigate();

  const [showValidationText, setShowValidationText] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const [form_Data, set_Form_Data] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: ""
  });

  const onFormChange = (event) => {
    const { name, value } = event.target;

    set_Form_Data((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validPassword = (pwd) => {
    const length = pwd.length >= 8;
    const upper = /[A-Z]/.test(pwd);
    const lower = /[a-z]/.test(pwd);
    const number = /[0-9]/.test(pwd);
    const special = /[!@#$%^&*]/.test(pwd);

    const passed = [length, upper, lower, number, special].filter(Boolean)
      .length;

    return passed === 5;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    setShowValidationText(true);
    setServerMessage("");

    const passwordsMatch =
      form_Data.password && form_Data.password === form_Data.confirm_password;
    const passwordStrong = validPassword(form_Data.password);

    if (
      form.checkValidity() === false ||
      !passwordStrong ||
      !passwordsMatch
    ) {
      return;
    }

    // Normalise so DB and login always agree
    const normalisedEmail = form_Data.email.trim().toLowerCase();
    const normalisedUsername = form_Data.username.trim().toLowerCase();
    const firstName = form_Data.first_name.trim();
    const lastName = form_Data.last_name.trim();

    const payload = {
      user_mail: normalisedEmail,
      user_password: form_Data.password,
      user_first_name: firstName,
      user_surname: lastName,
      user_username: normalisedUsername
    };

    // Temporary debug: proves exactly what we send to Lambda
    console.log("Signup payload being sent to /api/user:", payload);

    try {
      setSubmitting(true);

      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not create account");
      }

      const userSession = {
        email: data.user?.user_email || normalisedEmail,
        username: normalisedUsername,
        id: data.user?.user_id
      };

      sessionStorage.setItem("tntUser", JSON.stringify(userSession));
      window.dispatchEvent(new Event("authChanged"));

      setServerMessage("Account created successfully.");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setServerMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="orbitron">
      <Button
        className="orbitron"
        variant="primary"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>

      <h1>Create Account</h1>

      <Form noValidate validated={showValidationText} onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={form_Data.email}
            onChange={onFormChange}
            style={{ fontFamily: "anta" }}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
          <Form.Text className="text-muted" style={{ fontFamily: "anta" }}>
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            First Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            style={{ fontFamily: "anta" }}
            name="first_name"
            value={form_Data.first_name}
            onChange={onFormChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            style={{ fontFamily: "anta" }}
            name="last_name"
            value={form_Data.last_name}
            onChange={onFormChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your last name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label style={{ fontFamily: "orbitron" }}>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a Username"
            style={{ fontFamily: "anta" }}
            name="username"
            value={form_Data.username}
            onChange={onFormChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label style={{ fontFamily: "orbitron" }}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            style={{ fontFamily: "anta" }}
            required
            minLength={8}
            value={form_Data.password}
            onChange={onFormChange}
            isInvalid={
              showValidationText && !validPassword(form_Data.password)
            }
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters long and contain at least
            one uppercase letter, one lowercase letter, one number, and one
            special character.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm_password">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="confirm_password"
            style={{ fontFamily: "anta" }}
            required
            value={form_Data.confirm_password}
            onChange={onFormChange}
            pattern={form_Data.password}
            isInvalid={
              showValidationText &&
              form_Data.confirm_password !== form_Data.password
            }
          />
          <Form.Control.Feedback type="invalid">
            Please enter a matching password.
          </Form.Control.Feedback>
        </Form.Group>

        <Link to="/login">Already have an account? Log in instead.</Link>
        <p />

        {serverMessage && <p>{serverMessage}</p>}

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}
