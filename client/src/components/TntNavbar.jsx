// TntNavbar.jsx
import { useEffect, useState, useCallback } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";

export function TntNavbar({ awsWorking }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUserFromSession = useCallback(() => {
    const raw = sessionStorage.getItem("tntUser");

    if (!raw) {
      setUser(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setUser(parsed);
    } catch (err) {
      console.error("Failed to parse tntUser from sessionStorage:", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    loadUserFromSession();

    const handler = () => {
      loadUserFromSession();
    };

    window.addEventListener("authChanged", handler);
    return () => {
      window.removeEventListener("authChanged", handler);
    };
  }, [loadUserFromSession]);

  const handleLogout = () => {
    sessionStorage.removeItem("tntUser");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const roleNumber = user?.role != null ? Number(user.role) : null;

  // role mapping:
  // 1 = Reader -> Home, Profile
  // 2 = Journalist -> Home, Journalist Home, Profile
  // 3 = Editor -> Home, Editor Home, Profile

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
      data-bs-theme="dark"
    >
      <Container className="orbitron">
        {/* {awsWorking && <div id="healthcheck" />} */}

        <Navbar.Brand className="fw-bolc text-center" as={Link} to="/">
          <img
            className="img-fluid rounded"
            decoding="async"
            src="/image.png"
            alt="Site logo"
            width={100}
            height={100}
            align="start"
          />
        </Navbar.Brand>

        <Navbar.Brand>Tomorrow's News Today</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          {roleNumber === 2 && (
            <Nav.Link as={NavLink} to="/journalisthomepage">
              Journalist Home Page
            </Nav.Link>
          )}

          {roleNumber === 3 && (
            <Nav.Link as={NavLink} to="/editorhomepage">
              Editor Home Page
            </Nav.Link>
          )}

          {user && (
            <Nav.Link as={NavLink} to="/profile">
              Profile Page
            </Nav.Link>
          )}
        </Nav>

        <Nav className="ms-auto">
          {!user && (
            <>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}

          {user && (
            <Nav.Link onClick={handleLogout}>
              Log out
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
