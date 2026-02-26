import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Container, Navbar, Nav } from "react-bootstrap";

import { HomePage } from "./views/HomePage.jsx";
import { ArticlePage } from "./views/ArticlePage.jsx";
import { SignUpPage } from "./views/SignUpPage.jsx";
import { ProfilePage } from "./views/ProfilePage.jsx";
import { LogInPage } from "./views/LogInPage.jsx";
import { JournalistPage } from "./views/JournalistPage.jsx";
import { EditorPage } from "./views/EditorPage.jsx";
import { EditorHomePage } from "./views/EditorHomePage.jsx";
import { JournalistHomePage } from "./views/JournalistHomePage.jsx";

import { backgroundColour } from "./colours.js";
import { getMainPageArticles } from "./api.js";

import { TntNavbar } from "./components/TntNavbar.jsx";

import { useEffect, useState } from "react";

export default function App() {
  const [awsWorking, setAwsWorking] = useState(false);
  const [mainPageArticles, setMainPageArticles] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const healthCheck = async () => {
      try {
        const response = await fetch("/api/healthcheck");

        if (response.ok) {
          setAwsWorking(true);
        } else {
          throw new Error("AWS backend not working");
        }
      } catch (error) {
        console.log(error);
        setAwsWorking(false);
      }
    };

    async function mainPageFunction() {
      try {
        const articles = await getMainPageArticles();
        setMainPageArticles(articles);
        setStatus("loaded");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    }

    const body = document.querySelector("body");
    if (body) {
      body.style.backgroundColor = backgroundColour;
    }

    healthCheck();
    mainPageFunction();
  }, []);

  return (
    <div className="App flex-column d-flex min-vh-100">

      {/* Header Navbar */}
      <TntNavbar awsWorking={awsWorking} />

      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage articles={mainPageArticles} />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/editorpage/:id" element={<EditorPage />} />
          <Route path="/journalistpage/:id" element={<JournalistPage />} />
          <Route path="/journalistpage" element={<JournalistPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/journalisthomepage" element={<JournalistHomePage />} />
          <Route path="/editorhomepage" element={<EditorHomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          data-bs-theme="dark"
        >
          <Container className="orbitron">
            <Nav className="me-auto d-flex gap-3">
              <Navbar.Brand>T.N.T</Navbar.Brand>
              <Nav.Link as={NavLink} to="/">
                Contact
              </Nav.Link>
              <Navbar.Text>Terms of Use</Navbar.Text>
              <Navbar.Text>About T.N.T</Navbar.Text>
              <Navbar.Text>Privacy Policy</Navbar.Text>
              <Navbar.Text>Cookies</Navbar.Text>
              <Navbar.Text>Accessibility Help</Navbar.Text>
            </Nav>
          </Container>
        </Navbar>
      </footer>

    </div>
  );
}
