import { Container, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export function LogInPage() {
  const navigate = useNavigate();

  const [showValidationText, setShowValidationText] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const loginSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    setShowValidationText(true);
    setServerMessage("");

    if (form.checkValidity() === false) {
      return;
    }

    // keep username normalisation in step with signup
    const normalisedUsername = username.trim().toLowerCase();

    try {
      setSubmitting(true);

      const response = await fetch("/api/login", {
        // if not using same domain in dev, swap to full TNT URL
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: normalisedUsername,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // TNT login response:
      // { status: "logged_in", user: { user_username, user_role } }

      console.log(data)

      const userSession = {
        username: data.user?.user_username,
        role: data.user?.user_role,
        id: data.user?.user_id
      };

      sessionStorage.setItem("tntUser", JSON.stringify(userSession));

      // notify app that auth state changed
      window.dispatchEvent(new Event("authChanged"));

      navigate("/"); // news homepage
    } catch (error) {
      console.error("Login error:", error);
      setServerMessage(error.message);
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

      <h1>Log In To Your Account</h1>

      <Form noValidate validated={showValidationText} onSubmit={loginSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            Username
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter a Username"
            style={{ fontFamily: "anta" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label style={{ fontFamily: "orbitron" }}>
            Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            style={{ fontFamily: "anta" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        <Link to="/signup">
          Do not have an account? Sign up instead.
        </Link>

        <p />

        {serverMessage && <p>{serverMessage}</p>}

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}
